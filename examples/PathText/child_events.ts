import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(500, 300, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.PathText({
      text:
        ".............mmmmmmm,kkkkkkkk.....txt.PathText is complete, have a great weekend.",
      font: "lobster",
      minSize: 80,
      autoReduce: true,
      align: txt.PathAlign.Center,
      path:
        "m258.09999999999997,178a48.416000000000004,48.416000000000004 0 0 0 48.416000000000004,48.416000000000004a78.32000000000001,78.32000000000001 0 0 0 78.32000000000001,-78.32000000000001a126.73600000000002,126.73600000000002 0 0 0 -126.73600000000002,-126.73600000000002a205.056,205.056 0 0 0 -205.056,205.056a331.79200000000003,331.79200000000003 0 0 0 331.79200000000003,331.79200000000003a536.8480000000001,536.8480000000001 0 0 0 536.8480000000001,-536.8480000000001",
      tracking: 0,
      character: {
        click: function() {
          console.log("click");
        }
      },
      size: 90,
      x: 0,
      y: 0,
      debug: true
    })
  );

  stage.update();
  return stage;
}
