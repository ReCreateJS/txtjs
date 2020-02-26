import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(500, 500, 2);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  function addText(align, xPos, yPos) {
    let text = new txt.Text({
      text: "Save",
      font: "lato",
      align,
      width: 115,
      height: 73,
      size: 52,
      x: xPos,
      y: yPos,
      debug: true
    });
    stage.addChild(text);
  }

  addText(txt.Align.TOP_LEFT, 0, 0);
  addText(txt.Align.TOP_CENTER, 410, 0);
  addText(txt.Align.TOP_RIGHT, 820, 0);
  addText(txt.Align.MIDDLE_LEFT, 0, 410);
  addText(txt.Align.MIDDLE_CENTER, 410, 410);
  addText(txt.Align.MIDDLE_RIGHT, 820, 410);
  addText(txt.Align.BOTTOM_LEFT, 0, 820);
  addText(txt.Align.BOTTOM_CENTER, 410, 820);
  addText(txt.Align.BOTTOM_RIGHT, 820, 820);

  stage.update();
  return stage;
}
