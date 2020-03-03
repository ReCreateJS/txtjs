import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(300, 1800, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  function addText(width, height, yPos) {
    stage.addChild(
      new txt.Text({
        text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
        font: "lato",
        width,
        height,
        size: 20,
        x: 10,
        y: yPos,
        debug: true
      })
    );
  }

  addText(260, 100, 0);
  addText(250, 100, 100);
  addText(240, 100, 200);
  addText(230, 100, 300);
  addText(220, 100, 400);
  addText(210, 100, 500);
  addText(200, 100, 600);
  addText(190, 100, 700);
  addText(180, 100, 800);
  addText(170, 100, 900);
  addText(160, 100, 1000);
  addText(150, 100, 1100);
  addText(140, 100, 1200);
  addText(130, 100, 1300);
  addText(120, 120, 1400);
  addText(110, 120, 1520);
  addText(100, 120, 1640);

  stage.update();
  return stage;
}
