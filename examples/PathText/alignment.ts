import * as txt from "txt";
import circle from "../../lib/circle-path";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
  const canvas = createHiDPICanvas(650, 650, 2);
  document.body.appendChild(canvas);
  const stage = new createjs.Stage(canvas);
  stage.x = 10;

  stage.addChild(
    new txt.PathText({
      x: 50,
      y: 50,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Center,
      size: 30,
      path: "M10 10 H 500 V 500 H 10 L 10 10",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 300,
      y: 300,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 100,
      align: txt.PathAlign.Left,
      size: 30,
      path: "M10 10 H 500 V 500 H 10 L 10 10",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 600,
      y: 600,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 0,
      align: txt.PathAlign.Right,
      size: 30,
      path: "M10 10 H 500 V 500 H 10 L 10 10",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 100,
      y: 50,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Center,
      size: 30,
      path:
        "M41,373 L50,351 L60,329 L69,308 L78,287 L87,267 L97,248 L106,230 L115,213 L124,198 L134,185 L143,173 L152,163 L162,154 L171,148 L180,144 L189,142 L199,142 L208,144 L217,148 L226,154 L236,163 L245,173 L254,185 L264,198 L273,213 L282,230 L291,248 L301,267 L310,287 L319,308 L328,329 L338,351 L347,373 L356,395 L366,417 L375,438 L384,459 L393,479 L403,498 L412,516 L421,533 L430,548 L440,561 L449,573 L458,583 L468,592 L477,598 L486,602 L495,604 L505,604 L514,602 L523,598 L532,592 L542,583 L551,573 L560,561 L570,548 L579,533 L588,516 L597,498 L607,479 L616,459 L625,438 L634,417 L644,395 L653,373 L662,351 L672,329 L681,308 L690,287 L699,267 L709,248 L718,230 L727,213 L736,198 L746,185 L755,173 L764,163 L774,154 L783,148 L792,144 L801,142 L811,142 L820,144 L829,148 L838,154 L848,163 L857,173 L866,185 L876,198 L885,213 L894,230 L903,248 L913,267 L922,287 L931,308 L940,329 L950,351 L959,373",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 100,
      y: 300,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Left,
      size: 30,
      path:
        "M41,373 L50,351 L60,329 L69,308 L78,287 L87,267 L97,248 L106,230 L115,213 L124,198 L134,185 L143,173 L152,163 L162,154 L171,148 L180,144 L189,142 L199,142 L208,144 L217,148 L226,154 L236,163 L245,173 L254,185 L264,198 L273,213 L282,230 L291,248 L301,267 L310,287 L319,308 L328,329 L338,351 L347,373 L356,395 L366,417 L375,438 L384,459 L393,479 L403,498 L412,516 L421,533 L430,548 L440,561 L449,573 L458,583 L468,592 L477,598 L486,602 L495,604 L505,604 L514,602 L523,598 L532,592 L542,583 L551,573 L560,561 L570,548 L579,533 L588,516 L597,498 L607,479 L616,459 L625,438 L634,417 L644,395 L653,373 L662,351 L672,329 L681,308 L690,287 L699,267 L709,248 L718,230 L727,213 L736,198 L746,185 L755,173 L764,163 L774,154 L783,148 L792,144 L801,142 L811,142 L820,144 L829,148 L838,154 L848,163 L857,173 L866,185 L876,198 L885,213 L894,230 L903,248 L913,267 L922,287 L931,308 L940,329 L950,351 L959,373",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 100,
      y: 600,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Right,
      size: 30,
      path:
        "M41,373 L50,351 L60,329 L69,308 L78,287 L87,267 L97,248 L106,230 L115,213 L124,198 L134,185 L143,173 L152,163 L162,154 L171,148 L180,144 L189,142 L199,142 L208,144 L217,148 L226,154 L236,163 L245,173 L254,185 L264,198 L273,213 L282,230 L291,248 L301,267 L310,287 L319,308 L328,329 L338,351 L347,373 L356,395 L366,417 L375,438 L384,459 L393,479 L403,498 L412,516 L421,533 L430,548 L440,561 L449,573 L458,583 L468,592 L477,598 L486,602 L495,604 L505,604 L514,602 L523,598 L532,592 L542,583 L551,573 L560,561 L570,548 L579,533 L588,516 L597,498 L607,479 L616,459 L625,438 L634,417 L644,395 L653,373 L662,351 L672,329 L681,308 L690,287 L699,267 L709,248 L718,230 L727,213 L736,198 L746,185 L755,173 L764,163 L774,154 L783,148 L792,144 L801,142 L811,142 L820,144 L829,148 L838,154 L848,163 L857,173 L866,185 L876,198 L885,213 L894,230 L903,248 L913,267 L922,287 L931,308 L940,329 L950,351 L959,373",
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 300,
      y: 300,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Center,
      size: 30,
      path: circle(0, 0, 280),
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 500,
      y: 500,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Left,
      size: 30,
      path: circle(0, 0, 280),
      debug: false,
      tracking: 0
    })
  );

  stage.addChild(
    new txt.PathText({
      x: 700,
      y: 700,
      flipped: false,
      text:
        "Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      fillColor: "#111",
      font: "comfortaa",
      start: 10,
      align: txt.PathAlign.Right,
      size: 30,
      path: circle(0, 0, 280),
      debug: false,
      tracking: 0
    })
  );

  stage.update();
  return stage;
}
