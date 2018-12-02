const fp = {};

fp.getPath = function(fromKey, lang) {
  let path;
  if (fromKey === 'index') {
    path = 'lang/' + lang + '/';
  } else if (fromKey === 'dashboard') {
    path = './';
  } else {
    path = '../';
  }
  return path;
}

fp.loadKeys = async function(fromKey) {
  let lang = await fp.language.get();
  let path = fp.getPath(fromKey, lang);
  let url = path + 'keys.json';
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: url,
      error: function(err) {
        console.error(err);
      },
      success: function(data) {
        fp.keys = data;
        fp.language.set(fp.keys.lang);
        resolve(data);
      }
    });
  });
};

fp.showContent = async function(key, lang, selector) {
  if (! selector) selector = '.fp_pagecontent';
  let urlPrefix = fp.getPath(key, lang);
  const urlContent = urlPrefix + key + '/content.xml';
  const urlLogic = urlPrefix + key + '/logic.js';
  const content = await $.ajax({
    url: urlContent,
    error: function(err) {
      console.error(err);
    }
  });
  fp.view = {
    containers: {
      title: $('.fp_pagehead'),
      content: $('.fp_pagecontent')
    },
    content: content
  };
  $.getScript(urlLogic);
}

fp.phrase = function(phraseObj) {
  let phraseHTML;
  if (fp.language.current === 'en') {
    phraseHTML = $(phraseObj).find('original')[0].innerHTML.trim();
  } else {
    phraseHTML = $(phraseObj).find('translated')[0].innerHTML.trim();
  }
  const changes = $(phraseObj).find('change');
  const changesLength = changes.length;
  let i;
  if (changesLength === 0) return phraseHTML;
  for (i = 0; i < changesLength; i++) {
    const change = changes[i];
    let changeHTMLBefore;
    if (fp.language.current === 'en') {
      changeHTMLBefore = $(change).find('original')[0].innerHTML.trim();
    } else {
      changeHTMLBefore = $(change).find('translated')[0].innerHTML.trim();
    }
    let changeHTMLAfter = changeHTMLBefore;
    let bold = 'false';
    let italic = 'false';
    let modal = 'false';
    let scripturekey = '';
    if (change.attributes.hasOwnProperty('bold')) {
      bold = change.attributes['bold'].value;
    }
    if (change.attributes.hasOwnProperty('italic')) {
      italic = change.attributes['italic'].value;
    }
    if (change.attributes.hasOwnProperty('modal')) {
      modal = change.attributes['modal'].value;
    }
    if (change.attributes.hasOwnProperty('scripturekey')) {
      scripturekey = change.attributes['scripturekey'].value;
    }
    if (changeHTMLAfter.length === 0) continue;
    if (bold === 'true') {
      changeHTMLAfter = '<strong>' + changeHTMLAfter + '</strong>';
    }
    if (italic === 'true') {
      changeHTMLAfter = '<em>' + changeHTMLAfter + '</em>';
    }
    if (scripturekey.length > 0) {
      if (modal === 'true') {
        changeHTMLAfter = '<a href="#" data-scripturekey="' + scripturekey + '" data-modal="true">' + changeHTMLAfter + '</a>';
      } else {
        if ((scripturekey.substr(0,8) === 'https://') || (scripturekey.substr(0,7) === 'http://')) {
          changeHTMLAfter = '<a href="' + scripturekey + '">' + changeHTMLAfter + '</a>';
        } else {
          changeHTMLAfter = '<a href="#" data-scripturekey="' + scripturekey + '">' + changeHTMLAfter + '</a>';
        }
      }
    }
    phraseHTML = phraseHTML.replace(changeHTMLBefore, changeHTMLAfter);
  }
  return phraseHTML;
}

fp.events = {

  handlers: {

    showScripture: function(evt) {
      return new Promise(function(resolve, reject){
        var scripturekey = evt.currentTarget.attributes['data-scripturekey'].value;
        $.ajax({
          url: '../scriptures/' + scripturekey + '/content.xml',
          error: function(err){
            console.error(err);
            reject(err);
          },
          success: function(xml) {
            const $xml = $(xml);
            console.log($xml);
            resolve($xml);
          }
        });
      });
    }

  },

  listeners: {

    scriptureClicked: async function() {
      return new Promise(function(resolve, reject){
        $('a[data-scripturekey][data-modal]').on('click', function(evt) {
          evt.preventDefault();
          fp.events.handlers.showScripture(evt);
          resolve(evt);
        });
      });
    },

    attach: async function() {
      Promise.all([
        fp.events.listeners.scriptureClicked()
      ]).then(function(values){
        return values;
      });
    }

  }

};

fp.init = async function(fromKey) {
  await fp.loadKeys(fromKey);
  fp.language.global.setAppTitle(fromKey, fp.keys.lang);
  fp.language.global.setExpandButton(fromKey, fp.keys.lang);
  if (fromKey === 'index') {
    fp.language.indexPage.loadTitle();
    fp.language.indexPage.loadContent();
    return;
  }
  fp.showContent(fromKey, fp.keys.lang);
  // await fp.events.listeners.attach();
};