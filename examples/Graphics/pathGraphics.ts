import createHiDPICanvas from "../../lib/hidpi-canvas";

function createPathShape(path, strokeColor, fillColor = null) {
  const shape = new createjs.Shape();

  if (fillColor) {
    shape.graphics.beginFill(fillColor);
  }
  shape.graphics
    .setStrokeStyle(4)
    .beginStroke(strokeColor)
    .decodeSVGPath(path);

  let bounds = txt.svgPathBoundingBox(path);
  shape.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

  shape.graphics
    .endFill()
    .setStrokeStyle(1)
    .setStrokeDash([20, 10], 0)
    .beginStroke("#93F")
    .drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

  return shape;
}

export default function init() {
  const canvas = createHiDPICanvas(1080, 420, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const a = createPathShape(
    "M 300 200 h -150 a 150 150 0 1 0 150 -150 z",
    "#00F",
    "#F00"
  );
  stage.addChild(a);

  const b = createPathShape(
    "M 275 175 v -150 a 150 150 0 0 0 -150 150 z",
    "#000",
    "#FF0"
  );

  stage.addChild(b);

  const c = createPathShape(
    "M 600 400 l 50 -25 a25 25 -30 0 1 50 -25 l 50 -25 a25 50 -30 0 1 50 -25 l 50 -25 a25 75 -30 0 1 50 -25 l 50 -25 a 25 100 -30 0 1 50 -25 l50 -25",
    "#F00"
  );
  stage.addChild(c);

  const d = createPathShape("M 600,75 a100,50 0 0,0 100,50", "#F00");
  stage.addChild(d);

  const e = createPathShape("M 600,75 a100,50 0 0,1 100,50", "#0F0");
  stage.addChild(e);

  const f = createPathShape("M 600,75 a100,50 0 1,0 100,50", "#00F");
  stage.addChild(f);

  const g = createPathShape("M 600,75 a100,50 0 1,1 100,50", "#F0F");
  stage.addChild(g);

  stage.update();
  return stage;
}
