import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(320, 290, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const text = new txt.Text({
    text: "The fox jumped over the log.",
    font: "raleway",
    align: txt.Align.TOP_RIGHT,
    tracking: -4,
    lineHeight: 120,
    width: 600,
    height: 360,
    size: 120,
    x: 10,
    y: 10
  });

  stage.addChild(text);

  stage.update();

  window.setTimeout(function() {
    text.font = "lobster";
    text.layout();
  }, 2000);

  return stage;
}
