import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(210, 550, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.scaleX = stage.scaleY = 4;

  function createLine(yPos: number, text: string) {
    stage.addChild(
      new txt.CharacterText({
        autoReduce: true,
        fillColor: "#231f20",
        font: "cinzel",
        height: 10,
        singleLine: true,
        size: 8,
        text,
        tracking: 50000,
        x: 0,
        y: yPos,
        debug: true
      })
    );
  }

  const chars = "ABCD";
  const remainingChars = "EFGHIJKLMNOPQRSTUVWXYZAB";
  createLine(0, "AB");
  for (let i = 1; i <= remainingChars.length; i++) {
    createLine(i * 10, chars + remainingChars.substr(0, i));
  }

  stage.update();
  return stage;
}
