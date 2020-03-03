import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(820, 900, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  function addText(width, yPos) {
    stage.addChild(
      new txt.CharacterText({
        text: "Harland Clarke...",
        font: "glegoo",
        singleLine: true,
        autoReduce: true,
        autoExpand: true,
        maxTracking: 260,
        tracking: 200,
        lineHeight: 60,
        width,
        height: 65,
        size: 60,
        minSize: 35,
        x: 5,
        y: yPos,
        debug: true
      })
    );
  }
  for (let i = 0; i < 12; i++) {
    addText(800 - i * 50, i * 75);
  }

  stage.update();
  return stage;
}
