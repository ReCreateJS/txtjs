import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(300, 1800, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const text = "Weekday, Month Day at Time\nLocation\nAddress - City, ST";

  function addText(width, yPos, height) {
    stage.addChild(
      new txt.CharacterText({
        text,
        font: "lato",
        width,
        height,
        size: 20,
        x: 10,
        y: yPos,
        debug: true
      })
    );
  }

  for (let i = 0; i < 17; i++) {
    let y = i * 100;
    let height = 100;
    // add more space for examples that use 4 lines:
    if (i > 13) {
      height += 20;
    }
    if (i > 14) {
      y += (i - 14) * 20;
    }
    addText(260 - i * 10, y, height);
  }

  stage.update();
  return stage;
}
