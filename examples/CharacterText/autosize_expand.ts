import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(820, 900, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  function addText(width, yPos) {
    stage.addChild(
      new txt.CharacterText({
        text: "abcd",
        font: "cinzel",
        singleLine: true,
        align: txt.Align.MIDDLE_CENTER,
        autoExpand: true,
        maxTracking: 9000,
        lineHeight: 60,
        width,
        height: 65,
        size: 60,
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
