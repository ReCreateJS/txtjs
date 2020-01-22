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
  canvas = createHiDPICanvas(1100, 1100, 2);
  document.body.appendChild(canvas);
  stage = new createjs.Stage(canvas);

  var shape = new createjs.Shape();
  shape.graphics.beginFill("#76d6ff");
  shape.graphics.drawRect(10, 10, 1000, 1000);
  stage.addChild(shape);

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.TOP_LEFT",
      font: "cantarell",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.TOP_LEFT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Align.TOP_RIGHT >",
      font: "amaticsc",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.TOP_RIGHT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.TOP_CENTER >",
      font: "glegoo",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.TOP_CENTER,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.MIDDLE_LEFT",
      font: "indieflower",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.MIDDLE_LEFT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Align.MIDDLE_RIGHT >",
      font: "lato",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.MIDDLE_RIGHT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.MIDDLE_CENTER >",
      font: "luckiestguy",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.MIDDLE_CENTER,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.BOTTOM_LEFT",
      font: "opensans",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.BOTTOM_LEFT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Align.BOTTOM_RIGHT >",
      font: "nixieone",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.BOTTOM_RIGHT,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "< Align.BOTTOM_CENTER >",
      font: "pacifico",
      lineHeight: 50,
      width: 1000,
      height: 1000,
      align: txt.Align.BOTTOM_CENTER,
      size: 25,
      x: 10,
      y: 10
    })
  );

  stage.update();
}
