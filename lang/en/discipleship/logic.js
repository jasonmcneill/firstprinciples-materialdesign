(function(){

  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = data.find('phrase[id=' + phraseID + ']')[0];
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  const html = `
    <br>
    <div class="row">
      <div class="col xl6 offset-xl3 l8 offset-l2 m8 offset-m2 s12">

        <p>
          ${phrase(2)}
        </p>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);

})();