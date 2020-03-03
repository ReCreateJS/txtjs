import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(300, 200, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  const text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "arimo",
    complete: function() {
      console.log("complete");
    },
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
  return stage;
}
