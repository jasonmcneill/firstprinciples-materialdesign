(function(){

  const phrase = function(phraseID) {
    let phrase = data.find('phrase[id=' + phraseID + ']')[0];
    let phraseHTML = $(phrase).find('translated')[0].innerHTML.trim();
    let changes = $(phrase).find('change');
    let i;
    if (changes.length === 0) return phraseHTML;
    for (i = 0; i < changes.length; i++) {
      let change = changes[i];
      let changeHTMLBefore = $(change).find('translated')[0].innerHTML.trim();
      let changeHTMLAfter = changeHTMLBefore;
      let bold = $(change)[0].attributes['bold'].value;
      let italic = $(change)[0].attributes['italic'].value;
      let modal = $(change)[0].attributes['modal'].value;
      let scripturekey = $(change)[0].attributes['scripturekey'].trim();
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
          if (scripturekey.indexOf('http') > -1) {
            changeHTMLAfter = '<a href="' + scripturekey + '">' + changeHTMLAfter + '</a>';
          } else {
            changeHTMLAfter = '<a href="../' + scripturekey + '/">' + changeHTMLAfter + '</a>';
          }
        }
      }
      phraseHTML = phraseHTML.replace(changeHTMLBefore, changeHTMLAfter);
    }
    return phraseHTML;
  };

  const data = $(fp.view.content);
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  const html = `
    <br>
    <div class="row">
      <div class="col xl6 offset-xl3 l8 offset-l2 m8 offset-m2 s12">
        <div class="collection">
          <a href="introduction/" class="collection-item">${phrase(2)}</a>
          <a href="course-information/" class="collection-item">${phrase(3)}</a>
          <a href="book-of-john/" class="collection-item">${phrase(4)}</a>
          <a href="seeking-god/" class="collection-item">${phrase(5)}</a>
          <a href="the-word/" class="collection-item">${phrase(6)}</a>
          <a href="discipleship/" class="collection-item">${phrase(7)}</a>
          <a href="the-kingdom/" class="collection-item">${phrase(8)}</a>
          <a href="light-darkness/" class="collection-item">${phrase(9)}</a>
          <a href="new-testament-conversion/" class="collection-item">${phrase(10)}</a>
          <a href="the-cross/" class="collection-item">${phrase(11)}</a>
          <a href="medical-account/" class="collection-item">${phrase(12)}</a>
          <a href="baptism-holy-spirit/" class="collection-item">${phrase(13)}</a>
          <a href="miraculous-gifts-holy-spirit/" class="collection-item">${phrase(14)}</a>
          <a href="the-church/" class="collection-item">${phrase(15)}</a>
          <a href="book-of-acts/" class="collection-item">${phrase(16)}</a>
          <a href="after-baptism-now-what/" class="collection-item">${phrase(17)}</a>
          <a href="christ-is-your-life/" class="collection-item">${phrase(18)}</a>
          <a href="best-friends-all-time/" class="collection-item">${phrase(19)}</a>
          <a href="the-mission/" class="collection-item">${phrase(20)}</a>
          <a href="persecution/" class="collection-item">${phrase(21)}</a>
          <a href="memory-scriptures/" class="collection-item">${phrase(22)}</a>
        </div>
      </div>
    </div>
  `;
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);

})();