import createHiDPICanvas from "../../lib/hidpi-canvas";
import svgPath from "../fixtures/svg-glyph";
export default function init() {
  const canvas = createHiDPICanvas(500, 300, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const a = new createjs.Shape();

  a.graphics.beginFill("#000");
  a.graphics.setStrokeStyle(10);
  a.graphics.beginStroke("#F00");
  a.graphics.decodeSVGPath(svgPath);
  a.graphics.endFill();
  a.graphics.endStroke();
  a.y = 250;
  a.scaleX = 0.5;
  a.scaleY = -0.5;

  stage.addChild(a);
  stage.update();

  return stage;
}
