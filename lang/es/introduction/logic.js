(function(){
  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  const html = `
    <br>
    <div class="row">
      <div class="col">
        
        <blockquote>
          <em>${phrase(2)}</em> &mdash; ${phrase(3)}
        </blockquote>

        <p>
          ${phrase(4)}
        </p>

        <p>
          ${phrase(5)}<br>
          ${phrase(6)}
        </p>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
})();