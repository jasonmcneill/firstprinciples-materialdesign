const fp = {};

fp.loadKeys = function() {
  fp.language.get()
  .then(function(lang){
    var url = '/lang/' + lang + '/keys.json';
    $.ajax({
      url: url,
      error: function(err) {
        console.error(err);
      },
      success: function(data) {
        fp.keys = data;
        return(data);
      }
    });
  })
};

fp.showView = function(view) {
  return new Promise(function(resolve, reject) {
    if (! view) view = '/';
    const stateObj = {
      key: view
    };
    const pushState = history.pushState(stateObj);    
    console.log(pushState);
    resolve(pushState);
  });
};

fp.showContent = async function(key, selector) {
  if (! key) return;
  if (! selector) selector = '.fp_pagecontent';
  const lang = await fp.language.get();
  const urlPrefix = '/lang/' + lang + '/' + key + '/';
  const urlContent = urlPrefix + 'content.xml';
  const urlLogic = urlPrefix + 'logic.js';
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
  if (fp.lang === 'en') {
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
    if (fp.lang === 'en') {
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

fp.init = async function(key) {
  await fp.loadKeys();
  await fp.language.global.renderTitle();
  fp.showContent(key);
};