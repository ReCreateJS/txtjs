import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
import svgPath from "../fixtures/svg-glyph";

export default function init() {
  const canvas = createHiDPICanvas(500, 300, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const shape = new createjs.Shape();

  shape.graphics.beginFill("#000");
  shape.graphics.decodeSVGPath(svgPath);
  shape.graphics.endFill();
  shape.y = 30;
  stage.addChild(shape);

  let boundingBox = new createjs.Rectangle();
  boundingBox = txt.svgPathBoundingBox(svgPath);
  const boundaryLine = new createjs.Shape();
  boundaryLine.y = 30;
  boundaryLine.graphics
    .beginStroke("#dd0000")
    .setStrokeStyle(2)
    .setStrokeDash([15, 5])
    .rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
  stage.addChild(boundaryLine);

  stage.update();
  return stage;
}
