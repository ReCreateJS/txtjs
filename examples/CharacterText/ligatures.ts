import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(950, 350, 1);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  let text = new txt.CharacterText({
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
