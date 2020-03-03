import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(850, 500, 1);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);

  //set cache to true
  // defaults to false
  txt.FontLoader.cache = true;

  //set cache version
  //if version changes it will overwrite cache and load data remotely
  //version is stored with the font locally.
  txt.FontLoader.version = 4;

  let text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "raleway",
    tracking: -4,
    lineHeight: 60,
    width: 300,
    height: 180,
    size: 60,
    x: 5,
    y: 5,
    debug: true
  });

  stage.addChild(text);

  text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "raleway",
    singleLine: true,
    tracking: -4,
    lineHeight: 60,
    width: 800,
    height: 180,
    size: 60,
    x: 5,
    y: 250,
    debug: true
  });

  stage.addChild(text);

  stage.update();

  return stage;
}
