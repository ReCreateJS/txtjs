var canvas;
var stage;

var PIXEL_RATIO = (function() {
  var ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
         ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
  return dpr / bsr;
})();

createHiDPICanvas = function(w, h, ratio) {
  if (!ratio) {
    ratio = PIXEL_RATIO;
  }
  var can = document.createElement("canvas");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
};

function circle(x, y, r) {
  var circle =
    "M " +
    x +
    " " +
    y +
    " " +
    "m " +
    -r +
    ",0 " +
    "a " +
    r +
    "," +
    r +
    " 0 1,0 " +
    r * 2 +
    ",0 " +
    "a " +
    r +
    "," +
    r +
    " 0 1,0 " +
    -r * 2 +
    ",0 Z";
  return circle;
}

function init() {
  canvas = createHiDPICanvas(1000, 1000, 2);
  document.body.appendChild(canvas);
  stage = new createjs.Stage(canvas);
  stage.x = 10;
  stage.scaleX = stage.scaleY = 2;

  stage.addChild(
    new txt.PathText({
      x: 500,
      y: 600,
      flipped: false,
      text: "Path Alignment",
      fillColor: "#111",
      font: "lobster",
      start: 2500,
      end: 0,
      align: txt.PathAlign.Center,
      valign: txt.VerticalAlign.Center,
      size: 150,
      tracking: 0,
      rotation: 270,
      path: circle(0, 0, 400),
      debug: true
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 500,
      y: 600,
      flipped: false,
      text: "Victory",
      fillColor: "#111",
      font: "lobster",
      start: 2500,
      align: txt.PathAlign.Center,
      valign: txt.VerticalAlign.Percent,
      valignPercent: 0.001,
      size: 200,
      tracking: 0,
      rotation: 270,
      path: circle(0, 0, 400),
      debug: true
    })
  );

  stage.update();
}
