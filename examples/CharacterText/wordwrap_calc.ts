var canvas;
var stage;

export default function init() {
  canvas = createHiDPICanvas(1000, 2000, 1);
  document.body.appendChild(canvas);
  stage = new createjs.Stage(canvas);

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 260,
      height: 100,
      size: 20,
      x: 10,
      y: 0,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 250,
      height: 100,
      size: 20,
      x: 10,
      y: 100,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 240,
      height: 100,
      size: 20,
      x: 10,
      y: 200,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 230,
      height: 100,
      size: 20,
      x: 10,
      y: 300,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 220,
      height: 100,
      size: 20,
      x: 10,
      y: 400,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 210,
      height: 100,
      size: 20,
      x: 10,
      y: 500,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 200,
      height: 100,
      size: 20,
      x: 10,
      y: 600,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 190,
      height: 100,
      size: 20,
      x: 10,
      y: 700,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 180,
      height: 100,
      size: 20,
      x: 10,
      y: 800,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 170,
      height: 100,
      size: 20,
      x: 10,
      y: 900,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 160,
      height: 100,
      size: 20,
      x: 10,
      y: 1000,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 150,
      height: 100,
      size: 20,
      x: 10,
      y: 1100,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 140,
      height: 100,
      size: 20,
      x: 10,
      y: 1200,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 130,
      height: 100,
      size: 20,
      x: 10,
      y: 1300,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 120,
      height: 120,
      size: 20,
      x: 10,
      y: 1400,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 110,
      height: 120,
      size: 20,
      x: 10,
      y: 1520,
      debug: true
    })
  );

  stage.addChild(
    new txt.CharacterText({
      text: "Weekday, Month Day at Time\nLocation\nAddress - City, ST",
      font: "lato",
      width: 100,
      height: 120,
      size: 20,
      x: 10,
      y: 1640,
      debug: true
    })
  );

  stage.update();
}
