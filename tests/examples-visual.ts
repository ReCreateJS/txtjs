import * as txtExamples from "examples";
import { removeCanvas, imgToImageData, loadImage } from "./helpers";

const REF_IMAGES_PATH = "images/";

describe("Examples visual", function() {
  // Font downloading delays renders
  const RENDER_WAIT = 100;
  const TEST_TIMEOUT = 2000;

  afterEach(function() {
    removeCanvas();
  });

  describe("Text", function() {
    Object.entries(txtExamples.visualExamples.Text).forEach(function(eg) {
      const exampleName = eg[0];
      const runExample = eg[1];
      it(
        exampleName,
        async function(done) {
          const stage = runExample();
          expect(stage.children.length).toBeGreaterThan(0);
          const referenceImageData = imgToImageData(
            await loadImage(REF_IMAGES_PATH + "Text/" + exampleName + ".png")
          );
          setTimeout(function() {
            const canvasImageData = getCanvasImageData(stage.canvas);
            expect(canvasImageData).toVisuallyEqual(referenceImageData);
            done();
          }, RENDER_WAIT);
        },
        TEST_TIMEOUT
      );
    });
  });

  describe("CharacterText", function() {
    Object.entries(txtExamples.visualExamples.CharacterText).forEach(function(
      eg
    ) {
      const exampleName = eg[0];
      const runExample = eg[1];
      it(
        exampleName,
        async function(done) {
          const stage = runExample();
          expect(stage.children.length).toBeGreaterThan(0);
          const referenceImageData = imgToImageData(
            await loadImage(
              REF_IMAGES_PATH + "CharacterText/" + exampleName + ".png"
            )
          );
          setTimeout(function() {
            const canvasImageData = getCanvasImageData(stage.canvas);
            expect(canvasImageData).toVisuallyEqual(referenceImageData);
            done();
          }, RENDER_WAIT);
        },
        TEST_TIMEOUT
      );
    });
  });

  describe("PathText", function() {
    Object.entries(txtExamples.visualExamples.PathText).forEach(function(eg) {
      const exampleName = eg[0];
      const runExample = eg[1];
      it(
        exampleName,
        async function(done) {
          const stage = runExample();
          expect(stage.children.length).toBeGreaterThan(0);
          const referenceImageData = imgToImageData(
            await loadImage(
              REF_IMAGES_PATH + "PathText/" + exampleName + ".png"
            )
          );
          // TODO: figure out how to handle async - perhaps preload fonts?
          setTimeout(function() {
            const canvasImageData = getCanvasImageData(stage.canvas);
            expect(canvasImageData).toVisuallyEqual(referenceImageData);
            done();
          }, RENDER_WAIT);
        },
        TEST_TIMEOUT
      );
    });
  });

  describe("Graphics", function() {
    Object.entries(txtExamples.visualExamples.Graphics).forEach(function(eg) {
      const exampleName = eg[0];
      const runExample = eg[1];
      it(
        exampleName,
        async function() {
          const stage = runExample();
          expect(stage.children.length).toBeGreaterThan(0);
          const referenceImageData = imgToImageData(
            await loadImage(
              REF_IMAGES_PATH + "Graphics/" + exampleName + ".png"
            )
          );
          const canvasImageData = getCanvasImageData(stage.canvas);
          expect(canvasImageData).toVisuallyEqual(referenceImageData);
        },
        TEST_TIMEOUT
      );
    });
  });
});

function getCanvasImageData(canvas) {
  return canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);
}
