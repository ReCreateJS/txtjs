describe("Text", function() {
  var canvas;
  var stage;
  beforeEach(function() {
    canvas = txtExamples.createHiDPICanvas(300, 300, 2);
    document.body.appendChild(canvas);

    stage = new createjs.Stage(canvas);
  });

  afterEach(function() {
    txtExamples.clearExample();
  });

  it("getBounds of Glyph", function() {
    var glyph = new txt.Glyph();
    glyph.offset = 1063 / 2048;
    glyph.path =
      "M492 -246v226q-72 1 -136 28.5t-111 75t-74.5 111.5t-27.5 137v57l129 21v-78q0 -47 17 -88t47 -72t70 -49.5t86 -20.5v582q-66 24 -128.5 52.5t-111.5 72.5t-79 108t-30 158v27q0 72 27.5 135.5t74.5 111.5t111 76t136 29v184h102v-184q71 -1 134 -29.5t110 -76 t74.5 -111t27.5 -135.5v-37l-129 -21v58q0 46 -17 87t-46 71.5t-69 49.5t-85 21v-555q65 -25 129 -55t114.5 -75t81.5 -110.5t31 -160.5v-43q0 -73 -27.5 -137t-75.5 -112t-112 -75.5t-137 -27.5h-4v-226h-102zM821 375q0 57 -18 99.5t-48.5 74t-72 54.5t-88.5 42v-543 q47 0 88.5 18t72 49.5t48.5 73t18 89.5v43v0zM272 1075q0 -53 17 -92.5t47 -69.5t70 -53t86 -43v514q-46 -2 -86 -21t-70 -49.5t-47 -71.5t-17 -87v-27v0z";
    var bounds = glyph.getBounds();
    expect(bounds.width).toBeGreaterThan(0);
  });

  it("getBounds of Text", function() {
    var text = new txt.Text({
      text: "First poiretone",
      font: "poiretone",
      width: 400,
      height: 400,
      size: 100,
      x: 0,
      y: 0,
      accessibilityPriority: 0
    });

    stage.addChild(text);

    var bounds = text.getBounds();

    expect(bounds).not.toBeNull();

    expect(bounds.x).toBe(0);
    expect(bounds.y).toBe(0);
    expect(bounds.width).toBe(400);
    expect(bounds.height).toBe(400);
  });
});
