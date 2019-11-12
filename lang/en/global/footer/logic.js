(function(){
  const data = $(fp.view.footer);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const html = `
    <div class="container">
      <div class="row fpmodule fpmodule_${key}">
        <div class="col s12">

          <p align="center" id="install-button-container">
            <button class="waves-effect waves-light btn light-blue darken-1" id="install-button">
              ${phrase(1)}
            </button>
          </p>

          <p align="center" id="share-button-container">
            <button id="share-button" class="waves-effect waves-light btn light-blue darken-1">
              <i class="fas fa-share-alt"></i>
              &nbsp;
              ${phrase(4)}
            </button>
          </p>

          <p align="center">
            &copy; ${new Date().getFullYear()} ${phrase(2)}<br>
            ${phrase(3)}
          </p>
          
        </div>
      </div>
    </div>
  `;

  const shareButton = document.querySelector('#share-button');

  function share() {
    if (! navigator.share) return alert('Cannot share using this browser.');
    navigator.share({
          url: 'https://firstprinciples.mobi',
          text: 'First Principles',
          title: 'First Principles'
      }).catch(error => console.error(error));
  }

  shareButton.addEventListener('click', share, false);

  $('footer').html(html);
})();
