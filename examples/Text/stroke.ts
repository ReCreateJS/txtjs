import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(1000, 500, 1);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);

  let label = "Harland Clarke";

  stage.addChild(
    new txt.Text({
      text: label,
      font: "lobster",
      lineHeight: 250,
      width: 950,
      height: 150,
      strokeColor: "#444",
      strokeWidth: 2,
      style: Array.from(Array(14).keys()).map(val => {
        let hex = val.toString(16);
        let unhex = (14 - val).toString(16);
        return {
          fillColor:
            val % 2 == 0
              ? "#FF" + hex + hex + unhex + unhex
              : "#" + hex + hex + unhex + unhex + "FF"
        };
      }),
      size: 150,
      x: 5,
      y: 5
    })
  );

  stage.addChild(
    new txt.Text({
      text: label,
      font: "lobster",
      lineHeight: 150,
      height: 150,
      width: 950,
      strokeColor: "#00aa00",
      strokeWidth: 3,
      style: Array.from(Array(label.length).keys()).map(val => {
        return {
          strokeWidth: (1 - Math.sin((val / label.length) * Math.PI)) * 10
        };
      }),
      fillColor: null,
      size: 150,
      x: 5,
      y: 150
    })
  );

  stage.addChild(
    new txt.Text({
      text: label,
      font: "lobster",
      lineHeight: 150,
      height: 150,
      width: 950,
      fillColor: null,
      strokeColor: "#f00",
      strokeWidth: 1,
      size: 150,
      x: 5,
      y: 300
    })
  );

  stage.update();
  return stage;
}
