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

fp.init = async function(key) {
  await fp.loadKeys();
  await fp.language.global.renderTitle();
  fp.showContent(key);
};