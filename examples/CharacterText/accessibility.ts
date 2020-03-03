import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(610, 610, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  function addText(text, align, xPos, yPos) {
    stage.addChild(
      new txt.CharacterText({
        text,
        font: "poiretone",
        align,
        width: 400,
        height: 400,
        size: 100,
        x: xPos,
        y: yPos,
        accessibilityPriority: 0,
        accessibilityText: "<h1>First poiretone</h1>",
        debug: true
      })
    );
  }

  addText("First poiretone", txt.Align.TOP_LEFT, 0, 0);
  addText("Second poiretone", txt.Align.TOP_CENTER, 410, 0);
  addText("Third poiretone", txt.Align.TOP_RIGHT, 820, 0);
  addText("ANOTHER 1 poiretone", txt.Align.MIDDLE_LEFT, 0, 410);
  addText("low 5 poiretone", txt.Align.MIDDLE_CENTER, 410, 410);
  addText("poiretone default", txt.Align.MIDDLE_RIGHT, 820, 410);
  addText("low 3 poiretone", txt.Align.BOTTOM_LEFT, 0, 820);
  addText("another default poiretone", txt.Align.BOTTOM_CENTER, 410, 820);
  addText("bottom 7 poiretone", txt.Align.BOTTOM_RIGHT, 820, 820);

  stage.update();
  return stage;
}
