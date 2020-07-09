import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(900, 220, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.CharacterText({
      text: "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
      font: "comfortaa",
      style: [
        { size: 50 },
        ,
        ,
        ,
        ,
        { font: "dancingscript" },
        ,
        ,
        ,
        ,
        ,
        ,
        { size: 50, font: "lobster" },
        ,
        ,
        ,
        ,
        ,
        {},
        ,
        ,
        ,
        ,
      ],
      width: 900,
      align: txt.Align.TOP_LEFT,
      size: 75,
      x: 5,
      y: 5
    })
  );

  stage.update();
  return stage;
}
