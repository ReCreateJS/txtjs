var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZXMtdmlzdWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvZXhhbXBsZXMtdmlzdWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxXQUFXLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwRSxJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUM7QUFFbEMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQzFCLGtDQUFrQztJQUNsQyxJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBRTFCLFNBQVMsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxFQUFFO1lBQ2pFLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUNBLFdBQVcsRUFDWCxVQUFlLElBQUk7Ozs7OztnQ0FDWCxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUM7Z0NBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsS0FBQSxjQUFjLENBQUE7Z0NBQ3ZDLHFCQUFNLFNBQVMsQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsRUFBQTs7Z0NBRDdELGtCQUFr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QUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxFQUFFO1lBQ3JFLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUNBLFdBQVcsRUFDWDs7Ozs7O2dDQUNRLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQztnQ0FDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN0QixLQUFBLGNBQWMsQ0FBQTtnQ0FDdkMscUJBQU0sU0FBUyxDQUNiLGVBQWUsR0FBRyxXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FDckQsRUFBQTs7Z0NBSEcsa0JBQWtCLEdBQUcsa0JBQ3pCLFNBRUMsRUFDRjtnQ0FDSyxlQUFlLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN6RCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7O2FBQzdELEVBQ0QsWUFBWSxDQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGtCQUFrQixDQUFDLE1BQU07SUFDaEMsT0FBTyxNQUFNO1NBQ1YsVUFBVSxDQUFDLElBQUksQ0FBQztTQUNoQixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0RXhhbXBsZXMgZnJvbSBcImV4YW1wbGVzXCI7XG5pbXBvcnQgeyByZW1vdmVDYW52YXMsIGltZ1RvSW1hZ2VEYXRhLCBsb2FkSW1hZ2UgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmNvbnN0IFJFRl9JTUFHRVNfUEFUSCA9IFwiaW1hZ2VzL1wiO1xuXG5kZXNjcmliZShcIkV4YW1wbGVzIHZpc3VhbFwiLCBmdW5jdGlvbigpIHtcbiAgLy8gRm9udCBkb3dubG9hZGluZyBkZWxheXMgcmVuZGVyc1xuICBjb25zdCBSRU5ERVJfV0FJVCA9IDEwMDtcbiAgY29uc3QgVEVTVF9USU1FT1VUID0gMjAwMDtcblxuICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgcmVtb3ZlQ2FudmFzKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiVGV4dFwiLCBmdW5jdGlvbigpIHtcbiAgICBPYmplY3QuZW50cmllcyh0eHRFeGFtcGxlcy52aXN1YWxFeGFtcGxlcy5UZXh0KS5mb3JFYWNoKGZ1bmN0aW9uKGVnKSB7XG4gICAgICBjb25zdCBleGFtcGxlTmFtZSA9IGVnWzBdO1xuICAgICAgY29uc3QgcnVuRXhhbXBsZSA9IGVnWzFdO1xuICAgICAgaXQoXG4gICAgICAgIGV4YW1wbGVOYW1lLFxuICAgICAgICBhc3luYyBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgY29uc3Qgc3RhZ2UgPSBydW5FeGFtcGxlKCk7XG4gICAgICAgICAgZXhwZWN0KHN0YWdlLmNoaWxkcmVuLmxlbmd0aCkudG9CZUdyZWF0ZXJUaGFuKDApO1xuICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZUltYWdlRGF0YSA9IGltZ1RvSW1hZ2VEYXRhKFxuICAgICAgICAgICAgYXdhaXQgbG9hZEltYWdlKFJFRl9JTUFHRVNfUEFUSCArIFwiVGV4dC9cIiArIGV4YW1wbGVOYW1lICsgXCIucG5nXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzSW1hZ2VEYXRhID0gZ2V0Q2FudmFzSW1hZ2VEYXRhKHN0YWdlLmNhbnZhcyk7XG4gICAgICAgICAgICBleHBlY3QoY2FudmFzSW1hZ2VEYXRhKS50b1Zpc3VhbGx5RXF1YWwocmVmZXJlbmNlSW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LCBSRU5ERVJfV0FJVCk7XG4gICAgICAgIH0sXG4gICAgICAgIFRFU1RfVElNRU9VVFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJDaGFyYWN0ZXJUZXh0XCIsIGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5lbnRyaWVzKHR4dEV4YW1wbGVzLnZpc3VhbEV4YW1wbGVzLkNoYXJhY3RlclRleHQpLmZvckVhY2goZnVuY3Rpb24oXG4gICAgICBlZ1xuICAgICkge1xuICAgICAgY29uc3QgZXhhbXBsZU5hbWUgPSBlZ1swXTtcbiAgICAgIGNvbnN0IHJ1bkV4YW1wbGUgPSBlZ1sxXTtcbiAgICAgIGl0KFxuICAgICAgICBleGFtcGxlTmFtZSxcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgIGNvbnN0IHN0YWdlID0gcnVuRXhhbXBsZSgpO1xuICAgICAgICAgIGV4cGVjdChzdGFnZS5jaGlsZHJlbi5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgICBjb25zdCByZWZlcmVuY2VJbWFnZURhdGEgPSBpbWdUb0ltYWdlRGF0YShcbiAgICAgICAgICAgIGF3YWl0IGxvYWRJbWFnZShcbiAgICAgICAgICAgICAgUkVGX0lNQUdFU19QQVRIICsgXCJDaGFyYWN0ZXJUZXh0L1wiICsgZXhhbXBsZU5hbWUgKyBcIi5wbmdcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0ltYWdlRGF0YSA9IGdldENhbnZhc0ltYWdlRGF0YShzdGFnZS5jYW52YXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbnZhc0ltYWdlRGF0YSkudG9WaXN1YWxseUVxdWFsKHJlZmVyZW5jZUltYWdlRGF0YSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSwgUkVOREVSX1dBSVQpO1xuICAgICAgICB9LFxuICAgICAgICBURVNUX1RJTUVPVVRcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiUGF0aFRleHRcIiwgZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmVudHJpZXModHh0RXhhbXBsZXMudmlzdWFsRXhhbXBsZXMuUGF0aFRleHQpLmZvckVhY2goZnVuY3Rpb24oZWcpIHtcbiAgICAgIGNvbnN0IGV4YW1wbGVOYW1lID0gZWdbMF07XG4gICAgICBjb25zdCBydW5FeGFtcGxlID0gZWdbMV07XG4gICAgICBpdChcbiAgICAgICAgZXhhbXBsZU5hbWUsXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICBjb25zdCBzdGFnZSA9IHJ1bkV4YW1wbGUoKTtcbiAgICAgICAgICBleHBlY3Qoc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoKS50b0JlR3JlYXRlclRoYW4oMCk7XG4gICAgICAgICAgY29uc3QgcmVmZXJlbmNlSW1hZ2VEYXRhID0gaW1nVG9JbWFnZURhdGEoXG4gICAgICAgICAgICBhd2FpdCBsb2FkSW1hZ2UoXG4gICAgICAgICAgICAgIFJFRl9JTUFHRVNfUEFUSCArIFwiUGF0aFRleHQvXCIgKyBleGFtcGxlTmFtZSArIFwiLnBuZ1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgYXN5bmMgLSBwZXJoYXBzIHByZWxvYWQgZm9udHM/XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0ltYWdlRGF0YSA9IGdldENhbnZhc0ltYWdlRGF0YShzdGFnZS5jYW52YXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbnZhc0ltYWdlRGF0YSkudG9WaXN1YWxseUVxdWFsKHJlZmVyZW5jZUltYWdlRGF0YSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSwgUkVOREVSX1dBSVQpO1xuICAgICAgICB9LFxuICAgICAgICBURVNUX1RJTUVPVVRcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiR3JhcGhpY3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmVudHJpZXModHh0RXhhbXBsZXMudmlzdWFsRXhhbXBsZXMuR3JhcGhpY3MpLmZvckVhY2goZnVuY3Rpb24oZWcpIHtcbiAgICAgIGNvbnN0IGV4YW1wbGVOYW1lID0gZWdbMF07XG4gICAgICBjb25zdCBydW5FeGFtcGxlID0gZWdbMV07XG4gICAgICBpdChcbiAgICAgICAgZXhhbXBsZU5hbWUsXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvbnN0IHN0YWdlID0gcnVuRXhhbXBsZSgpO1xuICAgICAgICAgIGV4cGVjdChzdGFnZS5jaGlsZHJlbi5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgICBjb25zdCByZWZlcmVuY2VJbWFnZURhdGEgPSBpbWdUb0ltYWdlRGF0YShcbiAgICAgICAgICAgIGF3YWl0IGxvYWRJbWFnZShcbiAgICAgICAgICAgICAgUkVGX0lNQUdFU19QQVRIICsgXCJHcmFwaGljcy9cIiArIGV4YW1wbGVOYW1lICsgXCIucG5nXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0ltYWdlRGF0YSA9IGdldENhbnZhc0ltYWdlRGF0YShzdGFnZS5jYW52YXMpO1xuICAgICAgICAgIGV4cGVjdChjYW52YXNJbWFnZURhdGEpLnRvVmlzdWFsbHlFcXVhbChyZWZlcmVuY2VJbWFnZURhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBURVNUX1RJTUVPVVRcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGdldENhbnZhc0ltYWdlRGF0YShjYW52YXMpIHtcbiAgcmV0dXJuIGNhbnZhc1xuICAgIC5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG4iXX0=