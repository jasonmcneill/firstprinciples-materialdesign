(function(){
  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  let mediaHTML = '';
  const media = function() {
    const mediaObj = $(data).find('media');
    mediaHTML = fp.media(mediaObj);
  };
  media();
  const html = `
    <link rel="stylesheet" type="text/css" href="../../../css/the-church.css">
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <ol>
          <li><strong>${phrase(2)}</strong>
            <p>${phrase(3)}</p>
            <table>
              <tbody>
                <tr>
                  <td><div>${phrase(4)}</div></td>
                  <td class="right"><div class="head"><i class="fas fa-long-arrow-alt-right fa-2x"></i></div></td>
                  <td rowspan="2"><img src="../../../img/body.png" class="responsive-img"></td>
                  <td><div class="head"><i class="fas fa-long-arrow-alt-left fa-2x"></i></div></td>
                  <td><div class="head">${phrase(5)}</div></td>
                </tr>
                <tr>
                  <td><div class="body">${phrase(6)}</div></td>
                  <td class="right"><div class="body"><i class="fas fa-long-arrow-alt-right fa-2x"></i></div></td>
                  <td><div class="body"><i class="fas fa-long-arrow-alt-left fa-2x"></i></div></td>
                  <td><div class="body">${phrase(7)}</div></td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
