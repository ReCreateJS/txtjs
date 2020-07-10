import { __awaiter, __generator } from "tslib";
import * as txtExamples from "examples";
import { removeCanvas, imgToImageData, loadImage } from "./helpers";
var REF_IMAGES_PATH = "images/";
describe("Examples visual", function () {
    // Font downloading delays renders
    var RENDER_WAIT = 100;
    var TEST_TIMEOUT = 2000;
    afterEach(function () {
        removeCanvas();
    });
    describe("Text", function () {
        Object.entries(txtExamples.visualExamples.Text).forEach(function (eg) {
            var exampleName = eg[0];
            var runExample = eg[1];
            it(exampleName, function (done) {
                return __awaiter(this, void 0, void 0, function () {
                    var stage, referenceImageData, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                stage = runExample();
                                expect(stage.children.length).toBeGreaterThan(0);
                                _a = imgToImageData;
                                return [4 /*yield*/, loadImage(REF_IMAGES_PATH + "Text/" + exampleName + ".png")];
                            case 1:
                                referenceImageData = _a.apply(void 0, [_b.sent()]);
                                setTimeout(function () {
                                    var canvasImageData = getCanvasImageData(stage.canvas);
                                    expect(canvasImageData).toVisuallyEqual(referenceImageData);
                                    done();
                                }, RENDER_WAIT);
                                return [2 /*return*/];
                        }
                    });
                });
            }, TEST_TIMEOUT);
        });
    });
    describe("CharacterText", function () {
        Object.entries(txtExamples.visualExamples.CharacterText).forEach(function (eg) {
            var exampleName = eg[0];
            var runExample = eg[1];
            it(exampleName, function (done) {
                return __awaiter(this, void 0, void 0, function () {
                    var stage, referenceImageData, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                stage = runExample();
                                expect(stage.children.length).toBeGreaterThan(0);
                                _a = imgToImageData;
                                return [4 /*yield*/, loadImage(REF_IMAGES_PATH + "CharacterText/" + exampleName + ".png")];
                            case 1:
                                referenceImageData = _a.apply(void 0, [_b.sent()]);
                                setTimeout(function () {
                                    var canvasImageData = getCanvasImageData(stage.canvas);
                                    expect(canvasImageData).toVisuallyEqual(referenceImageData);
                                    done();
                                }, RENDER_WAIT);
                                return [2 /*return*/];
                        }
                    });
                });
            }, TEST_TIMEOUT);
        });
    });
    describe("PathText", function () {
        Object.entries(txtExamples.visualExamples.PathText).forEach(function (eg) {
            var exampleName = eg[0];
            var runExample = eg[1];
            it(exampleName, function (done) {
                return __awaiter(this, void 0, void 0, function () {
                    var stage, referenceImageData, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                stage = runExample();
                                expect(stage.children.length).toBeGreaterThan(0);
                                _a = imgToImageData;
                                return [4 /*yield*/, loadImage(REF_IMAGES_PATH + "PathText/" + exampleName + ".png")];
                            case 1:
                                referenceImageData = _a.apply(void 0, [_b.sent()]);
                                // TODO: figure out how to handle async - perhaps preload fonts?
                                setTimeout(function () {
                                    var canvasImageData = getCanvasImageData(stage.canvas);
                                    expect(canvasImageData).toVisuallyEqual(referenceImageData);
                                    done();
                                }, RENDER_WAIT);
                                return [2 /*return*/];
                        }
                    });
                });
            }, TEST_TIMEOUT);
        });
    });
    describe("Graphics", function () {
        Object.entries(txtExamples.visualExamples.Graphics).forEach(function (eg) {
            var exampleName = eg[0];
            var runExample = eg[1];
            it(exampleName, function () {
                return __awaiter(this, void 0, void 0, function () {
                    var stage, referenceImageData, _a, canvasImageData;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                stage = runExample();
                                expect(stage.children.length).toBeGreaterThan(0);
                                _a = imgToImageData;
                                return [4 /*yield*/, loadImage(REF_IMAGES_PATH + "Graphics/" + exampleName + ".png")];
                            case 1:
                                referenceImageData = _a.apply(void 0, [_b.sent()]);
                                canvasImageData = getCanvasImageData(stage.canvas);
                                expect(canvasImageData).toVisuallyEqual(referenceImageData);
                                return [2 /*return*/];
                        }
                    });
                });
            }, TEST_TIMEOUT);
        });
    });
});
function getCanvasImageData(canvas) {
    return canvas
        .getContext("2d")
        .getImageData(0, 0, canvas.width, canvas.height);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZXMtdmlzdWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvZXhhbXBsZXMtdmlzdWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssV0FBVyxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFcEUsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRWxDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUMxQixrQ0FBa0M7SUFDbEMsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQztJQUUxQixTQUFTLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDZixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsRUFBRTtZQUNqRSxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FDQSxXQUFXLEVBQ1gsVUFBZSxJQUFJOzs7Ozs7Z0NBQ1gsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDO2dDQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3RCLEtBQUEsY0FBYyxDQUFBO2dDQUN2QyxxQkFBTSxTQUFTLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUE7O2dDQUQ3RCxrQkFBa0IsR0FBRyxrQkFDekIsU0FBaUUsRUFDbEU7Z0NBQ0QsVUFB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QUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsRUFBRTtZQUNyRSxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FDQSxXQUFXLEVBQ1g7Ozs7OztnQ0FDUSxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUM7Z0NBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsS0FBQSxjQUFjLENBQUE7Z0NBQ3ZDLHFCQUFNLFNBQVMsQ0FDYixlQUFlLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQ3JELEVBQUE7O2dDQUhHLGtCQUFrQixHQUFHLGtCQUN6QixTQUVDLEVBQ0Y7Z0NBQ0ssZUFBZSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7OzthQUM3RCxFQUNELFlBQVksQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxrQkFBa0IsQ0FBQyxNQUFNO0lBQ2hDLE9BQU8sTUFBTTtTQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDaEIsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHR4dEV4YW1wbGVzIGZyb20gXCJleGFtcGxlc1wiO1xuaW1wb3J0IHsgcmVtb3ZlQ2FudmFzLCBpbWdUb0ltYWdlRGF0YSwgbG9hZEltYWdlIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5jb25zdCBSRUZfSU1BR0VTX1BBVEggPSBcImltYWdlcy9cIjtcblxuZGVzY3JpYmUoXCJFeGFtcGxlcyB2aXN1YWxcIiwgZnVuY3Rpb24oKSB7XG4gIC8vIEZvbnQgZG93bmxvYWRpbmcgZGVsYXlzIHJlbmRlcnNcbiAgY29uc3QgUkVOREVSX1dBSVQgPSAxMDA7XG4gIGNvbnN0IFRFU1RfVElNRU9VVCA9IDIwMDA7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgIHJlbW92ZUNhbnZhcygpO1xuICB9KTtcblxuICBkZXNjcmliZShcIlRleHRcIiwgZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmVudHJpZXModHh0RXhhbXBsZXMudmlzdWFsRXhhbXBsZXMuVGV4dCkuZm9yRWFjaChmdW5jdGlvbihlZykge1xuICAgICAgY29uc3QgZXhhbXBsZU5hbWUgPSBlZ1swXTtcbiAgICAgIGNvbnN0IHJ1bkV4YW1wbGUgPSBlZ1sxXTtcbiAgICAgIGl0KFxuICAgICAgICBleGFtcGxlTmFtZSxcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgIGNvbnN0IHN0YWdlID0gcnVuRXhhbXBsZSgpO1xuICAgICAgICAgIGV4cGVjdChzdGFnZS5jaGlsZHJlbi5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgICBjb25zdCByZWZlcmVuY2VJbWFnZURhdGEgPSBpbWdUb0ltYWdlRGF0YShcbiAgICAgICAgICAgIGF3YWl0IGxvYWRJbWFnZShSRUZfSU1BR0VTX1BBVEggKyBcIlRleHQvXCIgKyBleGFtcGxlTmFtZSArIFwiLnBuZ1wiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0ltYWdlRGF0YSA9IGdldENhbnZhc0ltYWdlRGF0YShzdGFnZS5jYW52YXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbnZhc0ltYWdlRGF0YSkudG9WaXN1YWxseUVxdWFsKHJlZmVyZW5jZUltYWdlRGF0YSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSwgUkVOREVSX1dBSVQpO1xuICAgICAgICB9LFxuICAgICAgICBURVNUX1RJTUVPVVRcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiQ2hhcmFjdGVyVGV4dFwiLCBmdW5jdGlvbigpIHtcbiAgICBPYmplY3QuZW50cmllcyh0eHRFeGFtcGxlcy52aXN1YWxFeGFtcGxlcy5DaGFyYWN0ZXJUZXh0KS5mb3JFYWNoKGZ1bmN0aW9uKFxuICAgICAgZWdcbiAgICApIHtcbiAgICAgIGNvbnN0IGV4YW1wbGVOYW1lID0gZWdbMF07XG4gICAgICBjb25zdCBydW5FeGFtcGxlID0gZWdbMV07XG4gICAgICBpdChcbiAgICAgICAgZXhhbXBsZU5hbWUsXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICBjb25zdCBzdGFnZSA9IHJ1bkV4YW1wbGUoKTtcbiAgICAgICAgICBleHBlY3Qoc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoKS50b0JlR3JlYXRlclRoYW4oMCk7XG4gICAgICAgICAgY29uc3QgcmVmZXJlbmNlSW1hZ2VEYXRhID0gaW1nVG9JbWFnZURhdGEoXG4gICAgICAgICAgICBhd2FpdCBsb2FkSW1hZ2UoXG4gICAgICAgICAgICAgIFJFRl9JTUFHRVNfUEFUSCArIFwiQ2hhcmFjdGVyVGV4dC9cIiArIGV4YW1wbGVOYW1lICsgXCIucG5nXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXNJbWFnZURhdGEgPSBnZXRDYW52YXNJbWFnZURhdGEoc3RhZ2UuY2FudmFzKTtcbiAgICAgICAgICAgIGV4cGVjdChjYW52YXNJbWFnZURhdGEpLnRvVmlzdWFsbHlFcXVhbChyZWZlcmVuY2VJbWFnZURhdGEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0sIFJFTkRFUl9XQUlUKTtcbiAgICAgICAgfSxcbiAgICAgICAgVEVTVF9USU1FT1VUXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcIlBhdGhUZXh0XCIsIGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5lbnRyaWVzKHR4dEV4YW1wbGVzLnZpc3VhbEV4YW1wbGVzLlBhdGhUZXh0KS5mb3JFYWNoKGZ1bmN0aW9uKGVnKSB7XG4gICAgICBjb25zdCBleGFtcGxlTmFtZSA9IGVnWzBdO1xuICAgICAgY29uc3QgcnVuRXhhbXBsZSA9IGVnWzFdO1xuICAgICAgaXQoXG4gICAgICAgIGV4YW1wbGVOYW1lLFxuICAgICAgICBhc3luYyBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgY29uc3Qgc3RhZ2UgPSBydW5FeGFtcGxlKCk7XG4gICAgICAgICAgZXhwZWN0KHN0YWdlLmNoaWxkcmVuLmxlbmd0aCkudG9CZUdyZWF0ZXJUaGFuKDApO1xuICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZUltYWdlRGF0YSA9IGltZ1RvSW1hZ2VEYXRhKFxuICAgICAgICAgICAgYXdhaXQgbG9hZEltYWdlKFxuICAgICAgICAgICAgICBSRUZfSU1BR0VTX1BBVEggKyBcIlBhdGhUZXh0L1wiICsgZXhhbXBsZU5hbWUgKyBcIi5wbmdcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gaGFuZGxlIGFzeW5jIC0gcGVyaGFwcyBwcmVsb2FkIGZvbnRzP1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXNJbWFnZURhdGEgPSBnZXRDYW52YXNJbWFnZURhdGEoc3RhZ2UuY2FudmFzKTtcbiAgICAgICAgICAgIGV4cGVjdChjYW52YXNJbWFnZURhdGEpLnRvVmlzdWFsbHlFcXVhbChyZWZlcmVuY2VJbWFnZURhdGEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0sIFJFTkRFUl9XQUlUKTtcbiAgICAgICAgfSxcbiAgICAgICAgVEVTVF9USU1FT1VUXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcIkdyYXBoaWNzXCIsIGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5lbnRyaWVzKHR4dEV4YW1wbGVzLnZpc3VhbEV4YW1wbGVzLkdyYXBoaWNzKS5mb3JFYWNoKGZ1bmN0aW9uKGVnKSB7XG4gICAgICBjb25zdCBleGFtcGxlTmFtZSA9IGVnWzBdO1xuICAgICAgY29uc3QgcnVuRXhhbXBsZSA9IGVnWzFdO1xuICAgICAgaXQoXG4gICAgICAgIGV4YW1wbGVOYW1lLFxuICAgICAgICBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCBzdGFnZSA9IHJ1bkV4YW1wbGUoKTtcbiAgICAgICAgICBleHBlY3Qoc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoKS50b0JlR3JlYXRlclRoYW4oMCk7XG4gICAgICAgICAgY29uc3QgcmVmZXJlbmNlSW1hZ2VEYXRhID0gaW1nVG9JbWFnZURhdGEoXG4gICAgICAgICAgICBhd2FpdCBsb2FkSW1hZ2UoXG4gICAgICAgICAgICAgIFJFRl9JTUFHRVNfUEFUSCArIFwiR3JhcGhpY3MvXCIgKyBleGFtcGxlTmFtZSArIFwiLnBuZ1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjYW52YXNJbWFnZURhdGEgPSBnZXRDYW52YXNJbWFnZURhdGEoc3RhZ2UuY2FudmFzKTtcbiAgICAgICAgICBleHBlY3QoY2FudmFzSW1hZ2VEYXRhKS50b1Zpc3VhbGx5RXF1YWwocmVmZXJlbmNlSW1hZ2VEYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgVEVTVF9USU1FT1VUXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRDYW52YXNJbWFnZURhdGEoY2FudmFzKSB7XG4gIHJldHVybiBjYW52YXNcbiAgICAuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgLmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuIl19