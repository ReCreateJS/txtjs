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

  var text;
  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.TOP_LEFT,
    width: 115,
    height: 73,
    size: 52,
    x: 0,
    y: 0,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.TOP_CENTER,
    width: 115,
    height: 73,
    size: 52,
    x: 410,
    y: 0,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.TOP_RIGHT,
    width: 115,
    height: 73,
    size: 52,
    x: 820,
    y: 0,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.MIDDLE_LEFT,
    width: 115.2541,
    height: 73,
    size: 52,
    x: 0,
    y: 410,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.MIDDLE_CENTER,
    width: 115,
    height: 73,
    size: 52,
    x: 410,
    y: 410,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.MIDDLE_RIGHT,
    width: 115,
    height: 73,
    size: 52,
    x: 820,
    y: 410,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.BOTTOM_LEFT,
    width: 115,
    height: 73,
    size: 52,
    x: 0,
    y: 820,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.BOTTOM_CENTER,
    width: 115,
    height: 73,
    size: 52,
    x: 410,
    y: 820,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "Save",
    font: "lato",
    align: txt.Align.BOTTOM_RIGHT,
    width: 115,
    height: 73,
    size: 52,
    x: 820,
    y: 820,
    debug: true
  });

  stage.addChild(text);

  stage.update();
}
