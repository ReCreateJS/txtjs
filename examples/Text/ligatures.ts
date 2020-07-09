import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(950, 350, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  //NOTE - If ligatures are not exported within the font, they will not be swapped in Text
  const text = new txt.Text({
    text: "Chess Onward The big blue file brush Who be dribble flower office",
    font: "lobster",
    tracking: 0,
    lineHeight: 100,
    width: 900,
    height: 300,
    ligatures: true,
    align: txt.Align.TOP_LEFT,
    size: 100,
    x: 25,
    y: 25,
    debug: true
  });

  stage.addChild(text);

  stage.update();
  return stage;
}
