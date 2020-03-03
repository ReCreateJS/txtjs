import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(910, 700, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.Text({
      text:
        '"Logic will take you from A to B. Imagination will take you everywhere." - Albert Einstein',
      font: "quicksand",
      lineHeight: 100,
      width: 800,
      height: 480,
      size: 70,
      x: 10,
      y: 10,
      debug: true
    })
  );

  stage.addChild(
    new txt.Text({
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
    new txt.Text({
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
  return stage;
}
