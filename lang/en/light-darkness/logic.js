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
    <br>
    <div class="row">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <p>
          <strong>${phrase(2)}</strong>
        </p>

        <p>
          <strong>${phrase(3)}</strong>
        </p>

        <style type="text/css">
        <!--

        .fp_pagecontent table.darkness-light {
          padding: 0;
        }
        .fp_pagecontent table.darkness-light tr:nth-child(1) td:nth-child(1) {
          border-right: 7px solid black;
          border-bottom: 7px solid black;
        }
        .fp_pagecontent table.darkness-light tr:nth-child(1) td:nth-child(2) {
          border-left: 7px solid black;
          border-bottom: 7px solid black;
        }
        .fp_pagecontent table.darkness-light tr:nth-child(2) td:nth-child(1) {
          border-right: 7px solid black;
          border-top: 7px solid black;
        }
        .fp_pagecontent table.darkness-light tr:nth-child(2) td:nth-child(2) {
          border-left: 7px solid black;
          border-top: 7px solid black;
        }

        -->
        </style>

        <table class="darkness-light">
          <tbody>
            <tr>
              <td width="50%">
                ${phrase(4)}<br>
                ${phrase(5)}<br>
                ${phrase(6)}
              </td>
              <td class="right-align" width="50%">
                ${phrase(7)}<br>
                ${phrase(8)}<br>
                ${phrase(9)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(10)}<br>
                ${phrase(11)}<br>
                ${phrase(12)}
              </td>
              <td class="right-align">
                ${phrase(13)}<br>
                ${phrase(14)}<br>
                ${phrase(15)}
              </td>
            </tr>
          </tbody>
        </table>

        <br>

        <ol>
          <li>${phrase(16)}</li>
          <li>${phrase(17)}</li>
        </ol>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();