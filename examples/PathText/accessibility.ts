import * as txt from "txt";
import circle from "../../lib/circle-path";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(420, 420, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.PathText({
      x: 420,
      y: 420,
      flipped: true,
      text: "Yoda, Jedi Master",
      fillColor: "#111",
      font: "lobster",
      start: 2200,
      end: 310,
      align: txt.PathAlign.Center,
      size: 60,
      tracking: 0,
      rotation: 270,
      path: circle(0, 0, 400),
      accessibilityPriority: 0,
      accessibilityText:
        '<h1><a href="http://en.wikipedia.org/wiki/Yoda">Yoda</a>, Jedi Master</h1>',
      debug: true
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 420,
      y: 420,
      flipped: false,
      text: '"Try not. Do or do not. There is no try."',
      fillColor: "#111",
      font: "lobster",
      start: 2300,
      align: txt.PathAlign.Center,
      size: 60,
      tracking: 0,
      rotation: 270,
      path: circle(0, 0, 370),
      accessibilityPriority: 0,
      accessibilityText: '<p>"Try not. Do or do not. There is no try."</p>',
      debug: true
    })
  );

  stage.update();
  return stage;
}
