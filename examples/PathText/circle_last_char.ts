import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(480, 480, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.x = 50;
  stage.y = 50;
  stage.scaleX = stage.scaleY = 8;

  stage.addChild(
    new txt.PathText({
      autoExpand: true,
      autoReduce: true,
      characterCase: 1,
      start: 400,
      end: 400,
      fillColor: "#231f20",
      flipped: false,
      font: "roboto",
      height: 104.0489,
      maxSize: 120,
      minSize: 8,
      path:
        "M 52.4 104.048956523861 C 81.3397207253334 104.048956523861 104.8 80.7568137917513 104.8 52.0245 C 104.8 23.2921862082486 81.3397207253334 0.00004347613943 52.4 0.00004347613943 C 23.4602792746667 0.00004347613943 8.88178419700125e-15 23.2921862082486 8.88178419700125e-15 52.0245 C 8.88178419700125e-15 80.7568137917513 23.4602792746667 104.048956523861 52.4 104.048956523861 Z ",
      singleLine: true,
      size: 12,

      strokeColor: "#231f20",
      strokeWidth: 0,
      text: "JESSICA THOMPSON • JESSICA THOMPSON • JESSICA THOMPSON • ",
      tracking: 18,
      valign: 2,
      width: 104.8,
      x: 0,
      y: 0,
      debug: false
    })
  );

  stage.update();
  return stage;
}
