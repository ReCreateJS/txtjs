import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(500, 300, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  // set cache to true
  // defaults to false
  txt.FontLoader.cache = true;

  // set cache version
  // if version changes it will overwrite cache and load data remotely
  // version is stored with the font locally.
  txt.FontLoader.version = 4;

  const spiralPath =
    "m258.09999999999997,178a48.416000000000004,48.416000000000004 0 0 0 48.416000000000004,48.416000000000004a78.32000000000001,78.32000000000001 0 0 0 78.32000000000001,-78.32000000000001a126.73600000000002,126.73600000000002 0 0 0 -126.73600000000002,-126.73600000000002a205.056,205.056 0 0 0 -205.056,205.056a331.79200000000003,331.79200000000003 0 0 0 331.79200000000003,331.79200000000003a536.8480000000001,536.8480000000001 0 0 0 536.8480000000001,-536.8480000000001";

  stage.addChild(
    new txt.PathText({
      text: "The FontLoader has cache = true.",
      font: "glegoo",
      size: 90,
      align: txt.PathAlign.Right,
      path: spiralPath
    })
  );

  stage.update();
  return stage;
}
