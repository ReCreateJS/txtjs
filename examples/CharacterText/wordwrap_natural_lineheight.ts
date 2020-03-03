import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(612, 744, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const text = new txt.CharacterText({
    text: "123 444 555\n6",
    font: "lato",
    align: 4,
    tracking: 0,
    lineHeight: 19,
    ligatures: false,
    width: 60,
    height: 73,
    size: 16,
    debug: true,
    x: 5,
    y: 5
  });
  text.scaleX = 10;
  text.scaleY = 10;

  stage.addChild(text);

  stage.update();
  return stage;
}
