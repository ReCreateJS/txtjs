import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(500, 100, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.scaleX = 4;
  stage.scaleY = 4;

  stage.addChild(
    new txt.PathText({
      x: -100,
      y: 20,
      text: "It's supercalifragilisticexpialidocious!",
      font: "lobster",
      size: 16,
      valign: txt.VerticalAlign.Center,
      path:
        "M 226 159.333333333333 C 350.816352746667 159.333333333333 452 123.665351484444 452 79.6666666666667 C 452 35.667981848889 350.816352746667 0 226 0 C 101.183647253333 0 0 35.667981848889 0 79.6666666666667 C 0 123.665351484444 101.183647253333 159.333333333333 226 159.333333333333 Z",
      start: 620.5843673934,
      end: 394.750579307083,
      tracking: 0
    })
  );

  stage.update();
  return stage;
}
