import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(1080, 420, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const a = new createjs.Shape();
  a.graphics.setStrokeStyle(4);
  a.graphics.beginStroke("#00F");
  a.graphics.beginFill("#F00");
  a.graphics.decodeSVGPath("M 300 200 h -150 a 150 150 0 1 0 150 -150 z");
  stage.addChild(a);

  const b = new createjs.Shape();
  b.graphics.setStrokeStyle(4);
  b.graphics.beginStroke("#000");
  b.graphics.beginFill("#FF0");
  b.graphics.decodeSVGPath("M 275 175 v -150 a 150 150 0 0 0 -150 150 z");
  stage.addChild(b);

  const c = new createjs.Shape();
  c.graphics.setStrokeStyle(4);
  c.graphics.beginStroke("#F00");
  c.graphics.decodeSVGPath(
    "M 600 400 l 50 -25 a25 25 -30 0 1 50 -25 l 50 -25 a25 50 -30 0 1 50 -25 l 50 -25 a25 75 -30 0 1 50 -25 l 50 -25 a 25 100 -30 0 1 50 -25 l50 -25"
  );
  stage.addChild(c);

  let d = new createjs.Shape();
  d.graphics.setStrokeStyle(4);
  d.graphics.beginStroke("#F00");
  d.graphics.decodeSVGPath("M 600,75 a100,50 0 0,0 100,50");
  stage.addChild(d);

  d = new createjs.Shape();
  d.graphics.setStrokeStyle(4);
  d.graphics.beginStroke("#0F0");
  d.graphics.decodeSVGPath("M 600,75 a100,50 0 0,1 100,50");
  stage.addChild(d);

  d = new createjs.Shape();
  d.graphics.setStrokeStyle(4);
  d.graphics.beginStroke("#00F");
  d.graphics.decodeSVGPath("M 600,75 a100,50 0 1,0 100,50");
  stage.addChild(d);

  d = new createjs.Shape();
  d.graphics.setStrokeStyle(4);
  d.graphics.beginStroke("#F0F");
  d.graphics.decodeSVGPath("M 600,75 a100,50 0 1,1 100,50");
  stage.addChild(d);

  stage.update();
  return stage;
}
