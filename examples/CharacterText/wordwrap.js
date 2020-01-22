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
    new txt.CharacterText({
      text:
        '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
      font: "quicksand",
      lineHeight: 100,
      width: 800,
      height: 480,
      size: 80,
      x: 10,
      y: 10,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text:
        '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
      font: "righteous",
      lineHeight: 90,
      width: 900,
      height: 450,
      size: 90,
      x: 900,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text:
        '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
      font: "lobster",
      lineHeight: 200,
      width: 1700,
      height: 850,
      size: 150,
      x: 20,
      y: 500,
      debug: true
    })
  );

  stage.update();
}
