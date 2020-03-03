import createHiDPICanvas from "../../lib/hidpi-canvas";

export default function init() {
  const canvas = createHiDPICanvas(600, 220, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.scaleX = stage.scaleY = 4;

  const path =
    "M 226 159.333333333333 C 350.816352746667 159.333333333333 452 123.665351484444 452 79.6666666666667 C 452 35.667981848889 350.816352746667 0 226 0 C 101.183647253333 0 0 35.667981848889 0 79.6666666666667 C 0 123.665351484444 101.183647253333 159.333333333333 226 159.333333333333 Z";

  function addText(valign, fillColor, position) {
    stage.addChild(
      new txt.PathText({
        x: -60,
        y: 50,
        fillColor,
        flipped: false,
        text: "Align " + position,
        font: "droidsans",
        size: 30,
        valign,
        align: txt.PathAlign.Left,
        path,
        start: 620.5843673934,
        end: 394.750579307083,
        debug: true,
        tracking: 0
      })
    );
  }

  addText(txt.VerticalAlign.Top, "#FF583A", "Top");
  addText(txt.VerticalAlign.CapHeight, "#FF9032", "CapHeight");
  addText(txt.VerticalAlign.Center, "#FEDD0F", "Center");
  addText(txt.VerticalAlign.BaseLine, "#4B963E", "BaseLine");
  addText(txt.VerticalAlign.Bottom, "#23439F", "Bottom");

  stage.update();
  return stage;
}
