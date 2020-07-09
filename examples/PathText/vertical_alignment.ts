import * as txt from "txt";
import circle from "../../lib/circle-path";

import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(500, 500, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.PathText({
      x: 500,
      y: 550,
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
      y: 550,
      text: "Victory!",
      font: "lobster",
      strokeWidth: 5,
      strokeColor: "black",
      fillColor: "gold",
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
  return stage;
}
