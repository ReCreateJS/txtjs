import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(400, 900, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const text = new txt.CharacterText({
    text: "1\n2345\n6789 01",
    font: "lato",
    align: 4,
    tracking: 0,
    lineHeight: 38.4,
    ligatures: false,
    width: 65,
    height: 150,
    size: 32,
    debug: true,
    x: 50,
    y: 50
  });
  text.scaleX = 5;
  text.scaleY = 5;

  stage.addChild(text);

  stage.update();
  return stage;
}
