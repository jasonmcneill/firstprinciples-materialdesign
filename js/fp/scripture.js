fp.scripture = {

  onScriptureClicked: function() {
    $('.fp_pagecontent').on('click', 'a[data-scripturekey][data-modal]', function(evt) {
      console.log('Scripture clicked');
      const key = $(evt.currentTarget).data('scripturekey');
      evt.preventDefault();
      fp.scripture.showScripture(evt);
    });
  },
  
  onScriptureExpandButtonClicked: function() {
    $('.scripture-expand a').on('click', function(evt) {      
      var url = evt.target.attributes['href'].value;
      console.log('Scripture expand button clicked', url);
      evt.preventDefault();
    });
  },

  showScripture: function(evt) {
    var key = evt.currentTarget.attributes['data-scripturekey'].value;
    fp.scripture.renderScripture(key);
  },
  
  renderScripture(key) {
    $.ajax({
      url: '../scriptures/' + key + '/content.xml'
    }).error(function(err){
      console.error(err);
    }).success(function(data){
      let html = '';
      const passageTitle = $(data).find('passage').attr('title');
      const book = $(data).find('passage').attr('book');
      const chapter = $(data).find('chapter')[0].attributes['number'].value;
      const verses = $(data).find('verse');
      const version = $(data).find('scripture').attr('version');
      for(let i=0; i<verses.length; i++) {
        const num = $(verses[i]).attr('number');
        const txt = $(verses[i]).html().trim();
        if (txt.length === 0) continue;

        html += `
          <div class="row scripture">
            <div class="col s11">${txt}</div>
            <div class="col s1 right-align verseref">
              <span class="verseref">${num}</span>
            </div>
          </div>
        `;
      };
      html += `
        <br>
        <div class="right-align scripture-expand">
          <a href="http://www.biblegateway.com/passage/?search=${encodeURI(book + '+' + chapter)}&version=${version}" class="btn light-blue lighten-1 waves-effect waves-light">
          </a>
        </div>
      `;
      let modalHTML = `
        <div id="scriptureModal" class="modal">
          <div class="modal-content">
            <nav class="center scripture_headline flow-text light-blue">${passageTitle}</nav>
            <br>
            ${html}
          </div>
        </div>
      `;
      $('#scriptureModal').remove();
      $('.fp_pagecontent').after(modalHTML);
      fp.language.global.setExpandButton(key, fp.language.current);
      $('#scriptureModal').modal({
        onOpenStart: function() {
          window.onhashchange = function() {
            var hashVal = window.location.hash;
            if (hashVal === '') {
              $('#scriptureModal').modal('close');
            }
          }
        },
        onOpenEnd: function() {
          window.location.hash = 'scripture=' + key;
          $('.scripture-expand > a').on('click', function(evt){
            evt.preventDefault();
            history.back();
            console.log(evt.target.attributes['href'].value);
            location.href = evt.target.attributes['href'].value;
          });
        },
        onCloseEnd: function() {
          var hashVal = window.location.hash;
          if (hashVal !== '') {
            history.back();
          }
        }
      });
      $('#scriptureModal').modal('open');
      
    });
  }

}
