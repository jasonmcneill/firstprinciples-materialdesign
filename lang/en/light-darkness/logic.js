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

    <style type="text/css">
    .light-darkness_fourcorners {
      width: auto;
      font-size: .8rem;
      border: 0;
      margin: 2rem 0;
    }
    .light-darkness_fourcorners tr {
      border: 0;
    }
    .light-darkness_fourcorners tr:nth-child(1) td:nth-child(1) {
      width: 50%;
      text-align: left;
      vertical-align: top;
      border: 0;
      border-right: 5px solid black;
      border-bottom: 5px solid black;
      padding-right: 3rem;
    }
    .light-darkness_fourcorners tr:nth-child(1) td:nth-child(2) {
      width: 50%;
      text-align: right;
      vertical-align: top;
      border: 0;
      border-left: 5px solid black;
      border-bottom: 5px solid black;
      padding-left: 3rem;
    }
    .light-darkness_fourcorners tr:nth-child(2) td:nth-child(1) {
      text-align: left;
      vertical-align: bottom;
      border: 0;
      border-right: 5px solid black;
      border-top: 5px solid black;
    }
    .light-darkness_fourcorners tr:nth-child(2) td:nth-child(2) {
      text-align: right;
      vertical-align: bottom;
      border: 0;
      border-left: 5px solid black;
      border-top: 5px solid black;
    }

    .wall-of-sin {
      margin: 2rem 0;
    }
    .wall-of-sin tr {
      border: 0;
    }
    .wall-of-sin th {
      font-weight: bold;
      text-align: center;
    }
    .wall-of-sin td {
      width: 50%;
      font-weight: bold;
      border: 1px solid black;
    }
    .wall-of-sin td:nth-child(1) {
      border-right: 25px solid black;
      text-align: left;
    }
    .wall-of-sin td:nth-child(2) {
      border-left: 25px solid black;
      text-align: right;
    }

    </style>

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
          ${phrase(3)}
        </p>

        <table class="light-darkness_fourcorners">
          <tbody>
            <tr>
              <td>
                ${phrase(4)}<br>
                ${phrase(5)}<br>
                ${phrase(6)}<br>
              </td>
              <td>
                ${phrase(7)}<br>
                ${phrase(8)}<br>
                ${phrase(9)}<br>
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(10)}<br>
                ${phrase(11)}<br>
                ${phrase(12)}<br>
              </td>
              <td>
                ${phrase(13)}<br>
                ${phrase(14)}<br>
                ${phrase(15)}<br>
              </td>
            </tr>
          </tbody>
        </table>

        <ol>
          <li>${phrase(16)}</li>
          <li>${phrase(17)}</li>
        </ol>

        <br>

        <ol>
          <li>${phrase(18)}
            <ol>
              <li>${phrase(19)}
                <ol>
                  <li>
                    ${phrase(20)}

                      <table class="wall-of-sin">
                        <thead>
                          <tr>
                            <th colspan="3">
                              ${phrase(21)}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              ${phrase(22)}<br>
                              <br>
                              ${phrase(23)}<br>
                            </td>
                            <td>
                              ${phrase(24)}<br>
                              <br>
                              ${phrase(25)}<br>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="3">
                              ${phrase(26)}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                  </li>
                </ol>
              </li>
            </ol>
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