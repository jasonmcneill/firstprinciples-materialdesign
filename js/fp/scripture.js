fp.scripture = {

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
          <a href="http://www.biblegateway.com/passage/?search=${encodeURI(passageTitle)}&version=${version}" class="btn light-blue lighten-1 waves-effect waves-light">
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
          window.onhashchange = function(evt) {
            const hash = window.location.hash;
            if (hash === '') {
              $('#scriptureModal').modal('close');
            }
          };
        },
        onOpenEnd: function() {
          window.location.hash = 'scripture';
        },
        onCloseStart: function() {
          const hash = window.location.hash;
          if (hash === '#scripture') {
            history.go(-1);
          }
        }
      });
      $('#scriptureModal').modal('open');
      
    });
  }

}