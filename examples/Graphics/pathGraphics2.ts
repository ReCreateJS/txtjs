import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(500, 350, 1);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  var a = new createjs.Shape();

  a.graphics.setStrokeStyle(10);
  a.graphics.beginStroke("#F00");
  a.graphics.decodeSVGPath("M 25 70 A 40 40 0 1 0 25 69 Z");
  a.graphics.endFill();
  a.graphics.endStroke();

  a.graphics.setStrokeStyle(1);
  a.graphics.beginStroke("#00F");
  a.graphics.beginFill("#0F0");
  a.graphics.decodeSVGPath("m 150 100 a 50 40 0 1 0 25 -70 z");
  a.graphics.endFill();
  a.graphics.endStroke();

  a.graphics.setStrokeStyle(1);
  a.graphics.beginStroke("#000");
  a.graphics.decodeSVGPath("M 350 245 a 40 40 0 1 0 80 60");
  a.graphics.endFill();
  a.graphics.endStroke();

  a.graphics.beginFill("#C0C000");
  a.graphics.decodeSVGPath(
    "M 270 30 A 50 50 0 1 0 345 30 a 50 50 0 1 0 50 0 a 50 50 0 1 0 25 0 z"
  );
  a.graphics.endFill();
  a.graphics.endStroke();

  a.graphics.setStrokeStyle(3);
  a.graphics.beginStroke("#000000");
  a.graphics.beginFill("#CF0000");
  a.graphics.decodeSVGPath(
    "M 30 150 a 40 40 0 0 1 65 50 Z m 30 30 A 20 20 0 0 0 125 230 Z m 40 24 a 20 20 0 0 1 65 50 z"
  );

  //M 30 150 a 40 40 0 0 1 65 50 Z
  //m 30 30 A 20 20 0 0 0 125 230 Z
  //m 40 24 a 20 20 0 0 1 65 50 z
  a.graphics.endFill();
  a.graphics.endStroke();

  a.graphics.setStrokeStyle(1);
  a.graphics.beginStroke("#FF0000");
  a.graphics.decodeSVGPath(
    "M 215 190 A 40 200 10 0 0 265 190 A 40 200 20 0 1 315 190 A 40 200 30 0 0 365 190 A 40 200 40 0 1 415 190 A 40 200 50 0 0 465 190"
  );

  stage.addChild(a);
  stage.update();
  return stage;
}
