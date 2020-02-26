import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(400, 300, 2);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  var text = new txt.Text({
    text: "The fox jumped over the log.",
    font: "raleway",
    character: {
      click: function(event) {
        console.log("click");
      }
    },
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
  return stage;
}
