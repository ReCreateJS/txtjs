import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(1000, 1000, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  let i = 1;
  let h = 8;
  while (i < 30) {
    h = h + 5 * i;
    stage.addChild(
      new txt.CharacterText({
        text:
          '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
        font: "righteous",
        fillColor: null,
        strokeWidth: 2,
        strokeColor: "#d48",
        lineHeight: h * 1.4,
        height: h * 1.4,
        width: 50000,
        size: h,
        y: h * 1.4
      })
    );
    i++;
  }
  stage.update();
  return stage;
}
