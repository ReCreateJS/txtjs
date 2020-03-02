import createHiDPICanvas from "../../lib/hidpi-canvas";

// TODO: import this list from src dir instead
const EventNames = [
  "click",
  "dblclick",
  "mousedown",
  "mouseout",
  "mouseover",
  "pressmove",
  "pressup",
  "rollout",
  "rollover",
  "added",
  "removed",
  "tick"
];

export default function init() {
  let canvas = createHiDPICanvas(300, 200, 2);
  document.body.appendChild(canvas);

  var output = document.createElement("p");
  document.body.appendChild(output);

  let stage = new createjs.Stage(canvas);

  // attach all event types for demoing
  let events = EventNames.reduce((prev, cur) => {
    prev[cur] = () => {
      console.log(cur);
      output.innerHTML = cur;
    };
    return prev;
  }, {});

  let text = new txt.CharacterText({
    text: "The fox jumped over the log.",
    font: "arimo",
    character: events,
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
