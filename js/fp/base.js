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
  let url;
  let lang;
  let keys;
  let absoluteUrl;
  if (fromKey === 'dashboard') {
    url = './keys.json';
  } else {
    url = '../keys.json';
  }
  lang = await fp.language.get();
  keys = await $.ajax({url: url});
  return new Promise(async function(resolve, reject){
    if (! keys) reject("Keys not found.");
    fp.language.set(keys.lang);
    resolve(keys);
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
  $.ajax({
    url: urlLogic,
    dataType: 'script',
    cache: true,
    error: function(err) {
      console.error(err);
    }
  });
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
    let href = '';
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
    if (change.attributes.hasOwnProperty('href')) {
      href = change.attributes['href'].value;
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
    if (href.length > 0) {
      changeHTMLAfter = '<a href="' + href + '">' + changeHTMLAfter + '</a>';
    }
    phraseHTML = phraseHTML.replace(changeHTMLBefore, changeHTMLAfter);
  }
  return phraseHTML;
}

fp.media = function(mediaObj) {
  let mediaHTML = '';
  if (mediaObj.length === 0) return mediaHTML;
  const recordings = mediaObj.find('recording');
  if (recordings.length === 0) return mediaHTML;
  let recordingsLength = recordings.length;
  for(let i=0; i<recordingsLength; i++) {
    const recording = $(recordings[i]);
    const recordingID = recording.attr('uuid');
    const recordingLabel = recording.attr('label');
    const embeds = recording.find('embed');
    if (embeds.length > 0) {
      let embedHTML = '';
      const embed = embeds[0];
      const embedType = embed.attributes['type'].value;
      const sources = $(embed).find('source');
      if (sources.length > 0) {
        if (embedType === 'audio') {
          embedHTML += `
            <audio 
              controls 
              crossorigin="anonymous" 
              id="recording-${recordingID}"
            >`;
          for (let j=0; j<sources.length; j++) {
            let source = sources[j];
            embedHTML += `<source type="${source.attributes['type'].value}" src="${source.attributes['url'].value}">`;
          }
          embedHTML += `</audio>`;
        } else if (embedType === 'video') {
          const poster = $(recording).find('poster');
          const posterWidth = poster[0].attributes['width'].value.trim();
          const posterHeight = poster[0].attributes['height'].value.trim();
          const posterUrl = poster[0].attributes['url'].value.trim();
          if ( 
            (poster.length > 0) && 
            (posterUrl !== '') && 
            (posterWidth !== '') && 
            (posterHeight !== '') 
          ) {
            let videoHTML = `
              <video 
                controls 
                crossorigin="anonymous" 
                poster="${posterUrl}" 
                width="${parseInt(posterWidth)}" 
                height="${parseInt(posterHeight)}" 
                id="recording-${recordingID}" 
                style="width: 67%; max-width: ${parseInt(posterWidth)}px; height: auto"
              >
            `;
            embedHTML += videoHTML;
          } else {
            let videoHTML = `
              <video 
                controls 
                crossorigin="anonymous" 
                id="recording-${recordingID}"
              >
            `;
            embedHTML += videoHTML;
          }
          for (let j=0; j<sources.length; j++) {
            let source = sources[j];
            embedHTML += `<source type="${source.attributes['type'].value}" src="${source.attributes['url'].value}">`;
          }
          embedHTML += `</video>`;
        }
        if (recordingLabel !== '') {
          const isLastRecording = (i === (recordingsLength - 1) );
          mediaHTML += `
            <p class="center">
              <strong>
                ${recordingLabel}
              </strong>
            </p>
            <div class="center">
              ${embedHTML}
            </div>
          `;
          if (! isLastRecording) {
            mediaHTML += `<hr>`;
          }
        } else {
          mediaHTML += embedHTML;
        }
      }
    }
  }
  return mediaHTML;
};

fp.events = {
  listeners: {
    attach: function() {
      fp.scripture.onScriptureClicked();
      fp.scripture.onScriptureExpandButtonClicked();
    }
  }
};

fp.init = async function(fromKey) {
  window.fp = {};
  $.ajaxSetup({
    cache: true
  });
  if (fromKey === 'index') {
    fp.language.current = await fp.language.get();
    fp.language.indexPage.loadTitle();
    fp.language.indexPage.loadContent();
    return;
  }
  fp.keys = await fp.loadKeys(fromKey);
  fp.language.set(fp.keys.lang);
  fp.language.global.setAppTitle(fromKey, fp.language.current);
  fp.language.global.setExpandButton(fromKey, fp.language.current);
  await fp.showContent(fromKey, fp.language.current);
  await fp.scripture.loadAll();
  fp.events.listeners.attach();
};
