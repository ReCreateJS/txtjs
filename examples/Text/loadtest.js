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
  //console.log( canvas );
  document.body.appendChild(canvas);
  stage = new createjs.Stage(canvas);
  var style;
  var i = 1;
  var h = 8;
  var text;
  while (i < 30) {
    h = h + 5 * i;
    stage.addChild(
      new txt.Text({
        text:
          '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
        font: "righteous",
        fillColor: null,
        strokeWidth: 2,
        strokeColor: "#d48",
        lineHeight: h * 1.4,
        height: h * 1.4,
        width: 50000,
        size: h,
        y: h * 1.4
      })
    );
    i++;
  }
  stage.update();
}
