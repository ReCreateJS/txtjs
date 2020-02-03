import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  let canvas = createHiDPICanvas(1000, 1000, 2);
  document.body.appendChild(canvas);
  let stage = new createjs.Stage(canvas);
  stage.scaleX = stage.scaleY = 4;

  stage.addChild(
    new txt.PathText({
      x: -46.0,
      y: 101.0,
      flipped: false,
      text: "This Is Text On Path",
      font: "lobster",
      size: 16,
      valign: txt.VerticalAlign.Center,
      path:
        "M 226 159.333333333333 C 350.816352746667 159.333333333333 452 123.665351484444 452 79.6666666666667 C 452 35.667981848889 350.816352746667 0 226 0 C 101.183647253333 0 0 35.667981848889 0 79.6666666666667 C 0 123.665351484444 101.183647253333 159.333333333333 226 159.333333333333 Z",
      start: 620.5843673934,
      end: 394.750579307083,
      debug: true,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: -46.0,
      y: 267.3333,
      flipped: true,
      text: "This Is Text On Path Inverted",
      font: "lobster",
      size: 16,
      path:
        "M 226 159.333366666667 C 350.816352746667 159.333366666667 452 123.665384817778 452 79.6667 C 452 35.6680151822221 350.816352746667 0.00003333333325 226 0.00003333333325 C 101.183647253333 0.00003333333325 0 35.6680151822221 0 79.6667 C 0 123.665384817778 101.183647253333 159.333366666667 226 159.333366666667 Z",
      start: 904.155004709136,
      end: 115.333461219884,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 36.0,
      y: 160.5833,
      flipped: false,
      text:
        "This is curvy path text... groovy right? I think so, how about you?",
      font: "montserrat",
      size: 11,
      path:
        "M 0 57.7500333333333 C 0 57.7500333333333 28.5 0.00003333333342 66 0.00003333333342 C 103.5 0.00003333333342 126 54.6667 130.5 63.0000333333333 C 135 71.3333666666666 162.75 99.7500333333333 221.25 99.7500333333333 C 279.75 99.7500333333333 288 58.5000333333332 288 44.2500333333333 C 288 30.0000333333333 0 57.7500333333333 0 57.7500333333333",
      start: 0,
      end: 385.455997043843,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 36.0,
      y: 202.125,
      flipped: false,
      text: "This is curvy path text... with different brackets",
      font: "montserrat",
      size: 11,
      path:
        "M 0 57.7499999999999 C 0 57.7499999999999 28.5 5.6843418860808e-14 66 5.6843418860808e-14 C 103.5 5.6843418860808e-14 126 54.6666666666667 130.5 63 C 135 71.3333333333333 162.75 99.7499999999999 221.25 99.7499999999999 C 279.75 99.7499999999999 288 58.4999999999999 288 44.2499999999999 C 288 30 0 57.7499999999999 0 57.7499999999999",
      start: 53.2193374753861,
      end: 338.528731735386,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 34.333,
      y: 334.6667,
      flipped: false,
      text: "This is curvy path text... with different brackets",
      font: "montserrat",
      size: 11,
      path:
        "M 0.00033333333334 -0.00003333333336 C 0.00033333333334 -0.00003333333336 -0.66633333333331 35.0833 62.3336666666667 35.0833 C 125.333666666667 35.0833 106.417 9.66663333333332 143.167 9.66663333333332 C 156.162050473979 9.66663333333332 179.332999643764 34.1360425930804 212.333333155215 15.2346712965402 C 245.333666666667 -3.66669999999999 284.667 42.7503779620275 284.667 12.2083 C 284.667 -35.0417 0.00033333333334 -0.00003333333336 0.00033333333334 -0.00003333333336",
      start: 34.2411224396698,
      end: 316.709414697189,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 42.3333,
      y: 289.6667,
      flipped: false,
      text: "Line Text",
      font: "lobster",
      size: 16,
      path:
        "M 0.00003333333334 31.3333 L 74.6667 -0.00003333333336 L 0.00003333333334 31.3333",
      start: 0,
      end: 80.9746187943413,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 170.0,
      y: 129.3333,
      flipped: false,
      text: "Strange box text... I’m not sure about this...",
      font: "montserrat",
      size: 10,
      path:
        "M 0 0.00003333333331 L 0 35.0833666666666 L 73 35.0833666666666 L 73 0.00003333333331 L 0 0.00003333333331 Z",
      start: 214.5,
      end: 0,
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 259.6667,
      y: 168.0,
      flipped: false,
      text: "Polygon text is also very odd",
      font: "montserrat",
      size: 11,
      path:
        "M 45.6106379326471 0 L 15.2035237553268 0 L -0.00003333333336 26.3333333333333 L 15.2035237553268 52.6666666666666 L 45.6106379326471 52.6666666666667 L 60.8141950213072 26.3333333333333 L 45.6106379326471 0 Z",
      start: 29.9443379326471,
      end: 30.9443379326471,
      debug: false,
      tracking: 0
    })
  );

  stage.update();
  return stage;
}
