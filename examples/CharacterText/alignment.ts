import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(520, 320, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const shape = new createjs.Shape();
  shape.graphics.beginStroke("green");
  shape.graphics.drawRect(10, 10, 500, 300);
  stage.addChild(shape);

  function addText(text, font, align) {
    stage.addChild(
      new txt.CharacterText({
        text,
        font,
        align,
        lineHeight: 25,
        width: 500,
        height: 300,
        size: 19,
        x: 10,
        y: 10
      })
    );
  }

  addText("TOP_LEFT", "cantarell", txt.Align.TOP_LEFT);
  addText("TOP_CENTER", "glegoo", txt.Align.TOP_CENTER);
  addText("TOP_RIGHT", "amaticsc", txt.Align.TOP_RIGHT);
  addText("MIDDLE_LEFT", "indieflower", txt.Align.MIDDLE_LEFT);
  addText("MIDDLE_CENTER", "pacifico", txt.Align.MIDDLE_CENTER);
  addText("MIDDLE_RIGHT", "lato", txt.Align.MIDDLE_RIGHT);
  addText("BOTTOM_LEFT", "opensans", txt.Align.BOTTOM_LEFT);
  addText("BOTTOM_CENTER", "luckiestguy", txt.Align.BOTTOM_CENTER);
  addText("BOTTOM_RIGHT", "nixieone", txt.Align.BOTTOM_RIGHT);

  stage.update();
  return stage;
}
