import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(1100, 700, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.scaleX = stage.scaleY = 1;

  const i = new createjs.Bitmap("images/tracking_test.png");
  i.x = 25;
  i.y = 14;
  i.scaleX = i.scaleY = 1;
  stage.addChild(i);

  const alphabetString = "abcdefghijklmnop";

  function addText(font, tracking, xPos, yPos, size) {
    stage.addChild(
      new txt.Text({
        text: tracking + " " + alphabetString,
        font,
        width: 1900,
        height: 300,
        fillColor: "red",
        tracking,
        size,
        x: xPos,
        y: yPos
      })
    );
  }

  const LEFT_XPOS = 100;
  const LEFT_SIZE = 62;
  const RIGHT_XPOS = 1454;
  const RIGHT_SIZE = 29;
  addText("abel", 0, LEFT_XPOS, 100, LEFT_SIZE);
  addText("abel", 100, LEFT_XPOS, 170, LEFT_SIZE);
  addText("abel", 200, LEFT_XPOS, 239, LEFT_SIZE);
  addText("abel", 300, LEFT_XPOS, 309, LEFT_SIZE);
  addText("abel", 400, LEFT_XPOS, 378, LEFT_SIZE);
  addText("abel", 500, LEFT_XPOS, 448, LEFT_SIZE);
  addText("cinzel", 0, LEFT_XPOS, 517, LEFT_SIZE);
  addText("cinzel", 100, LEFT_XPOS, 586, LEFT_SIZE);
  addText("cinzel", 200, LEFT_XPOS, 656, LEFT_SIZE);
  addText("cinzel", 300, LEFT_XPOS, 725, LEFT_SIZE);
  addText("cinzel", 400, LEFT_XPOS, 794, LEFT_SIZE);
  addText("cinzel", 500, LEFT_XPOS, 864, LEFT_SIZE);
  addText("craftygirls", 0, LEFT_XPOS, 919, LEFT_SIZE);
  addText("craftygirls", 100, LEFT_XPOS, 988, LEFT_SIZE);
  addText("craftygirls", 200, LEFT_XPOS, 1058, LEFT_SIZE);
  addText("craftygirls", 300, LEFT_XPOS, 1127, LEFT_SIZE);
  addText("craftygirls", 400, LEFT_XPOS, 1197, LEFT_SIZE);
  addText("craftygirls", 500, LEFT_XPOS, 1266, LEFT_SIZE);
  addText("abel", 0, RIGHT_XPOS, 95, RIGHT_SIZE);
  addText("abel", 100, RIGHT_XPOS, 164, RIGHT_SIZE);
  addText("abel", 200, RIGHT_XPOS, 233, RIGHT_SIZE);
  addText("abel", 300, RIGHT_XPOS, 303, RIGHT_SIZE);
  addText("abel", 400, RIGHT_XPOS, 372, RIGHT_SIZE);
  addText("abel", 500, RIGHT_XPOS, 442, RIGHT_SIZE);
  addText("cinzel", 0, RIGHT_XPOS, 511, RIGHT_SIZE);
  addText("cinzel", 100, RIGHT_XPOS, 580, RIGHT_SIZE);
  addText("cinzel", 200, RIGHT_XPOS, 650, RIGHT_SIZE);
  addText("cinzel", 300, RIGHT_XPOS, 719, RIGHT_SIZE);
  addText("cinzel", 400, RIGHT_XPOS, 789, RIGHT_SIZE);
  addText("cinzel", 500, RIGHT_XPOS, 858, RIGHT_SIZE);
  addText("craftygirls", 0, RIGHT_XPOS, 920, RIGHT_SIZE);
  addText("craftygirls", 100, RIGHT_XPOS, 989, RIGHT_SIZE);
  addText("craftygirls", 200, RIGHT_XPOS, 1060, RIGHT_SIZE);
  addText("craftygirls", 300, RIGHT_XPOS, 1129, RIGHT_SIZE);
  addText("craftygirls", 400, RIGHT_XPOS, 1198, RIGHT_SIZE);
  addText("craftygirls", 500, RIGHT_XPOS, 1268, RIGHT_SIZE);

  stage.update();

  return stage;
}
