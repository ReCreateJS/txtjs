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

function init() {
  canvas = createHiDPICanvas(1000, 1000, 2);
  document.body.appendChild(canvas);
  stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.Text({
      text: "Hello World",
      font: "play",
      characterCase: txt.Case.NORMAL,
      lineHeight: 100,
      width: 800,
      height: 100,
      size: 100,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.Text({
      text: "Hello World",
      font: "play",
      characterCase: txt.Case.UPPER,
      lineHeight: 100,
      width: 800,
      height: 100,
      size: 100,
      x: 10,
      y: 120
    })
  );

  stage.addChild(
    new txt.Text({
      text: "Hello World",
      font: "play",
      characterCase: txt.Case.LOWER,
      lineHeight: 100,
      width: 800,
      height: 100,
      size: 100,
      x: 10,
      y: 230
    })
  );

  stage.addChild(
    new txt.Text({
      text: "Hello World",
      font: "play",
      characterCase: txt.Case.SMALL_CAPS,
      lineHeight: 100,
      width: 800,
      height: 100,
      size: 100,
      x: 10,
      y: 340
    })
  );

  stage.update();
}
