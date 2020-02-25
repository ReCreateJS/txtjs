import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(500, 500, 2);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  let charText = new txt.CharacterText({
    text: "The fox\n jumped over...",
    font: "raleway",
    tracking: 20,
    minSize: 70,
    width: 500,
    height: 500,
    size: 120,
    x: 100,
    y: 100,
    debug: true
  });
  stage.addChild(charText);

  charText.layout();

  console.log(charText.getBounds());

  stage.update();

  return stage;
}
