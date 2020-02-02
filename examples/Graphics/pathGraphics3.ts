export default function init() {
  let canvas = createHiDPICanvas(1800, 1800, 1);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  var a = new createjs.Shape();

  a.graphics.beginFill("#000");
  a.graphics.setStrokeStyle(10);
  a.graphics.beginStroke("#F00");
  a.graphics.decodeSVGPath(
    "M961 45 C961 69 952 77 942 77 C929 77 917 63 890 63 C843 63 836 120 836 177 C836 277 854 297 854 363 C854 411 828 430 780 430 C739 430 712 419 661 419 C609 419 585 482 543 482 C506 482 469 459 469 422 C469 390 496 370 530 357 C535 333 535 293 535 276 C535 135 411 61 276 61 C188 61 120 117 120 216 C120 309 181 372 269 372 C292 372 340 372 340 338 C340 309 295 289 295 259 C295 237 309 223 351 223 C395 223 436 286 436 331 C436 416 344 438 277 438 C129 438 25 349 25 198 C25 64 136 -21 279 -21 C591 -21 626 201 626 306 L626 335 C635 334 643 333 645 333 C670 333 710 339 730 339 C736 339 741 339 747 337 C752 335 754 326 754 314 C754 277 736 205 736 163 C736 85 752 -12 876 -12 C917 -12 961 3 961 45 L961 45 Z"
  );
  a.graphics.endFill();
  a.graphics.endStroke();
  a.y = 250;
  a.scaleX = 0.5;
  a.scaleY = -0.5;

  stage.addChild(a);
  stage.update();

  return stage;
}
