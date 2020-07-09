import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(850, 530, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  function addText(text, tracking, yPos) {
    stage.addChild(
      new txt.CharacterText({
        text,
        font: "librebaskerville",
        lineHeight: 150,
        width: 950,
        height: 150,
        tracking,
        size: 100,
        x: 5,
        y: yPos
      })
    );
  }

  addText("Tracking!          -100", -100, 5);
  addText("Tracking!      -50", -50, 105);
  addText("Tracking!     0", 0, 205);
  addText("Tracking!   50", 50, 305);
  addText("Tracking! 100", 100, 405);

  stage.update();

  return stage;
}
