import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(85, 510, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.CharacterText({
      text: "7\r\n8\n7\r3\r2",
      font: "tinos",
      align: txt.Align.MIDDLE_CENTER,
      lineHeight: 100,
      width: 150,
      height: 1000,
      size: 100,
      debug: true,
      x: 10,
      y: 10
    })
  );

  stage.update();
  return stage;
}
