import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(900, 500, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  let text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "raleway",
    tracking: -4,
    lineHeight: 120,
    width: 600,
    height: 360,
    size: 120,
    x: 10,
    y: 10,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "raleway",
    singleLine: true,
    tracking: -4,
    lineHeight: 120,
    width: 1600,
    height: 360,
    size: 120,
    x: 10,
    y: 500,
    debug: true
  });

  stage.addChild(text);

  stage.update();

  return stage;
}
