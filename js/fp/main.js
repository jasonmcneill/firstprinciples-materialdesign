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
  let phraseHTML = $(phraseObj).find('translated')[0].innerHTML.trim();
  let changes = $(phraseObj).find('change');
  let i;
  if (changes.length === 0) return phraseHTML;
  for (i = 0; i < changes.length; i++) {
    const change = changes[i];
    const changeHTMLBefore = $(change).find('translated')[0].innerHTML.trim();
    let changeHTMLAfter = changeHTMLBefore;
    const bold = $(change)[0].attributes['bold'].value;
    const italic = $(change)[0].attributes['italic'].value;
    const modal = $(change)[0].attributes['modal'].value;
    const scripturekey = $(change)[0].attributes['scripturekey'].trim();
    if (changeHTMLAfter.length === 0) continue;
    if ((typeof bold !== 'undefined') && (bold === 'true')) {
      changeHTMLAfter = '<strong>' + changeHTMLAfter + '</strong>';
    }
    if ((typeof italic !== 'undefined') && (italic === 'true')) {
      changeHTMLAfter = '<em>' + changeHTMLAfter + '</em>';
    }
    if ((typeof scripturekey !== 'undefined') && (scripturekey.length > 0)) {
      if ((typeof modal !== 'undefined') && (modal === 'true')) {
        changeHTMLAfter = '<a href="../' + scripturekey + '/" data-modal="true">' + changeHTMLAfter + '</a>'
      } else {
        if ((scripturekey.substr(0,8) === 'https://') || (scripturekey.substr(0,7) === 'http://')) {
          changeHTMLAfter = '<a href="' + scripturekey + '">' + changeHTMLAfter + '</a>';
        } else {
          changeHTMLAfter = '<a href="../' + scripturekey + '/">' + changeHTMLAfter + '</a>';
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