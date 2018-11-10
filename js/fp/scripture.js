fp.scripture = {
  renderScripture(key) {
    const lang = 'es';
    const scripturekey = key;
    $.ajax({
      url: 'lang/' + lang + '/scriptures/' + scripturekey + '/content.xml'
    }).error(function(err){
      console.error(err);
    }).success(function(data){
      let pageHtml = '<br>';
      const passageTitle = $(data).find('passage').attr('title');
      const verses = $(data).find('verse');
      const version = $(data).find('scripture').attr('version');
      for(let i=0; i<verses.length; i++) {
        const num = $(verses[i]).attr('number');
        const txt = $(verses[i]).html().trim();

        pageHtml += `
          <div class="row scripture">
            <div class="col s11">${txt}</div>
            <div class="col s1 right-align verseref">
              <span class="verseref">${num}</span>
            </div>
          </div>
        `;
      };
      pageHtml += `
        <div class="right-align scripture-expand">
          <a href="http://www.biblegateway.com/passage/?search=${encodeURI(passageTitle)}&version=${version}" class="btn light-blue lighten-1 waves-effect waves-light">
              Expand 
              <i class="material-icons">keyboard_arrow_right</i>
          </a>
        </div>
      `;
      $('html')
        .find('.fp_pagehead').text(passageTitle).end()
        .find('.fp_pagecontent').html(pageHtml).end()
      ;
    });
  }
}