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

    @media only screen and (max-width: 600px) {
      .light-darkness_fourcorners {
        font-size: .8rem;
      }
    }
    .light-darkness_fourcorners {
      width: auto;
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
      margin: 1rem 0 0 0;
      display: inline-block;
    }
    .wall-of-sin tr {
      border: 0;
    }
    .wall-of-sin th {
      font-weight: bold;
      text-align: center;
    }

    /* Max 600px: */
    @media only screen and (max-width: 600px) {
      .wall-of-sin {
        display: table;
      }
      .pile-of-sin {
        display: table;
      }
    }
    /* Above 600px: */
    @media only screen and (min-width: 601px) {
      .wall-of-sin td {
        min-width: 15rem;
      }
      .pile-of-sin {
        display: inline-block;
      }
      .pile-of-sin td {
        min-width: 10rem;
      }
    }

    .wall-of-sin td {
      width: 50%;
      font-weight: bold;
      border: 1px solid black;
    }
    .wall-of-sin td:nth-child(1) {
      border-right: 2.5rem solid black;
      text-align: left;
    }
    .wall-of-sin td:nth-child(2) {
      border-left: 2.5rem solid black;
      text-align: right;
    }

    .pile-of-sin {
      margin: 1rem 0;
    }
    .pile-of-sin tr {
      border: 0;
    }
    .pile-of-sin td {
      padding: 0;
      vertical-align: bottom;
    }
    .pile-of-sin tr:nth-child(1) td {
      border-bottom: 3px solid black;
    }
    .pile-of-sin_person-a {
      height: 3rem;
    }
    .pile-of-sin_person-b {
      height: 6rem;
    }
    .pile-of-sin_person-c {
      height: 9rem;
    }
    .pile-of-sin_pile {
      width: 4.5rem;
      max-width: 80%;
      margin: auto;
      padding-bottom: 0;
      background-color: black;
      border: 3px solid black;
      border-radius: 20px 20px 0 0;
    }

    .light-darkness_baptism-buried-earth {
        font-size: 75%;
    }
    .light-darkness_baptism-buried-earth tr {
        border: 0;
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
          <li><strong>${phrase(18)}</strong>
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
                  <li>${phrase(27)}</li>
                  <li>${phrase(28)}</li>
                </ol>
              </li>
              <li>${phrase(29)}
                <ol>
                  <li>
                    ${phrase(30)}
                    <table class="pile-of-sin">
                      <tbody>
                        <tr>
                          <td class="center">
                            ${phrase(31)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-a"></div>
                          </td>
                          <td class="center">
                            ${phrase(32)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-b"></div>
                          </td>
                          <td class="center">
                            ${phrase(33)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-c"></div>
                          </td>
                        </tr>
                        <tr>
                          <td class="center">${phrase(34)}</td>
                          <td class="center">${phrase(35)}</td>
                          <td class="center">${phrase(36)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>${phrase(37)}</li>
                  <li>${phrase(38)}</li>
                </ol>
              </li>
              <li>${phrase(39)}
                <ol>
                  <li>${phrase(40)}</li>
                  <li>${phrase(41)}</li>
                  <li>${phrase(42)}</li>
              </li>
              <li>${phrase(43)}
                <table class="light-darkness_fourcorners">
                  <tbody>
                    <tr>
                      <td>${phrase(44)}</td>
                      <td>${phrase(45)}</td>
                    </tr>
                    <tr>
                      <td>
                        ${phrase(46)}<br>
                        ${phrase(47)}<br>
                        ${phrase(48)}<br>
                      </td>
                      <td>
                        ${phrase(49)}<br>
                        ${phrase(50)}<br>
                        ${phrase(51)}<br>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(52)}</strong>
            <ol>
              <li>${phrase(53)}</li>
              <li>${phrase(54)}</li>
              <li>${phrase(55)}
                <ol>
                  <li>${phrase(56)}</li>
                  <li>${phrase(57)}</li>
                  <li>${phrase(58)}</li>
                </ol>
              </li>
              <li>${phrase(59)}
                <ol>
                  <li>${phrase(60)}</li>
                  <li>${phrase(61)}</li>
                </ol>
              </li>
              <li>${phrase(62)}
                <ol>
                  <li>${phrase(63)}</li>
                  <li>${phrase(64)}
                    <ol>
                      <li>${phrase(65)}</li>
                      <li>${phrase(66)}</li>
                    </ol>
                  </li>
                  <li>
                    ${phrase(67)}<br>
                    ${phrase(68)}
                    <br>
                    <table class="light-darkness_baptism-buried-earth responsive-table">
                      <tbody>
                        <tr>
                          <td width="1%">${phrase(69)}</td>
                          <td class="center"><i class="fas fa-cross fa-3x"></i></td>
                          <td valign="bottom">
                            ${phrase(70)}<br>
                            <i class="fas fa-share fa-rotate-90 fa-2x"></i>
                          </td>
                          <td>&nbsp;</td>
                          <td class="right" style="vertical-align: bottom">
                            <i class="fas fa-share fa-3x"></i>
                          </td>
                          <td>
                            <div style="margin-top: -15px">
                              ${phrase(72)}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">&nbsp;</td>
                          <td colspan="3" class="center brown white-text">
                            <strong>${phrase(71)}</strong>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
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
