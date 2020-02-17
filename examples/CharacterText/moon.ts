import speech from "../fixtures/speech";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(1000, 1000, 1);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  var text = new txt.CharacterText({
    text: speech,
    font: "poiretone",
    x: 10,
    y: 10,
    width: 900,
    height: 900,
    align: txt.Align.TOP_LEFT,
    size: 35,
    lineHeight: 35,
    debug: true
  });

  stage.addChild(text);

  stage.update();
  return stage;
}
