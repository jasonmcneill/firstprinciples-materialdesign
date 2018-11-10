fp.language = {

  default: 'en',

  available: [
    {
      iso: 'en',
      name: {
        native: 'English',
        en: 'English'
      }
    },
    {
      iso: 'es',
      name: {
        native: 'Español',
        en: 'Spanish'
      }
    }
  ],

  isAvailable: function(iso) {
    let isAvailable = false;
    if(! iso) return isAvailable;
    if(typeof iso !== 'string') return isAvailable;
    if(iso.length !== 2) return isAvailable;
    fp.language.available.map(function(lang) {
      if(lang.iso === iso) {
        isAvailable = true;
        return;
      }
    });
    return isAvailable;
  },

  detect: function() {
    let lang = navigator.language || navigator.browserLanguage;
    lang = lang.substring(0,2);
    lang = lang.toLowerCase();
    if(! isAvailable(lang)) lang = fp.language.default;
    return lang;
  },

  get: function() {
    return new Promise(function(resolve, reject) {
      localforage.getItem('lang').then(function(iso) {
        let lang = iso;
        if(typeof iso === 'undefined') lang = fp.language.detect();
        resolve(lang);
      });
    });
  },

  set: function(iso) {
    return new Promise(function(resolve, reject) {
      localforage.setItem('lang', iso).then(function(lang) {
        resolve(lang);
      });
    });
  },

  global: {
    renderTitle: function() {
      fp.language.get().then(function(iso){
        return new Promise(function(resolve, reject) {
          $.ajax({
            url: 'lang/' + iso + '/global/content.xml',
            error: function(err) {
              console.error(err);
            },
            success: function(data) {
              let $data = $(data);
              let text = {
                pageTitle: $data.find('phrase[id=1] translated')[0].textContent.trim(),
                expandButton: $data.find('phrase[id=2] translated')[0].textContent.trim()
              };
              $('html')
                .find('title').text(text.pageTitle).end()
                .find('.scripture-expand .btn').text(text.expandButton).end()
              ;
            }
          })
        });        
      })
    }
  }

};