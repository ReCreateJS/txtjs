(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('txt'), require('examples')) :
    typeof define === 'function' && define.amd ? define(['txt', 'examples'], factory) :
    (global = global || self, factory(global.txt, global.examples));
}(this, (function (txt, txtExamples) { 'use strict';

    var imgToImageData = jasminePixelmatch.imgToImageData, loadImage = jasminePixelmatch.loadImage;
    function removeCanvas() {
        var canvas = document.getElementsByTagName("canvas")[0];
        if (canvas) {
            document.body.removeChild(canvas);
        }
    }

    describe("Smoke test", function () {
        afterEach(function () {
            removeCanvas();
        });
        it("Loads txt.js library and checks version", function () {
            expect(txt).not.toBeNull();
            expect(txt.Info.VERSION).toEqual("0.10.0"); // remember to update all parts of codebase
        });
    });

    describe("Examples non-visual", function () {
        var TEST_TIMEOUT = 2000;
        afterEach(function () {
            removeCanvas();
        });
        describe("Text", function () {
            Object.entries(txtExamples.nonVisualExamples.Text).forEach(function (eg) {
                var exampleName = eg[0];
                var runExample = eg[1];
                it(exampleName, function () {
                    var stage = runExample();
                    expect(stage.children.length).toBeGreaterThan(0);
                }, TEST_TIMEOUT);
            });
        });
        describe("CharacterText", function () {
            Object.entries(txtExamples.nonVisualExamples.CharacterText).forEach(function (eg) {
                var exampleName = eg[0];
                var runExample = eg[1];
                it(exampleName, function () {
                    var stage = runExample();
                    expect(stage.children.length).toBeGreaterThan(0);
                }, TEST_TIMEOUT);
            });
        });
        describe("PathText", function () {
            Object.entries(txtExamples.nonVisualExamples.PathText).forEach(function (eg) {
                var exampleName = eg[0];
                var runExample = eg[1];
                it(exampleName, function () {
                    var stage = runExample();
                    expect(stage.children.length).toBeGreaterThan(0);
                }, TEST_TIMEOUT);
            });
        });
        describe("Graphics", function () {
            Object.entries(txtExamples.nonVisualExamples.Graphics).forEach(function (eg) {
                var exampleName = eg[0];
                var runExample = eg[1];
                it(exampleName, function () {
                    var stage = runExample();
                    expect(stage.children.length).toBeGreaterThan(0);
                }, TEST_TIMEOUT);
            });
        });
    });

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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

    describe("Unit tests", function () {
        it("Util: applyShapeEventListeners", function () {
            var knownEvents = [
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
            var shapeEvents = knownEvents.reduce(function (prev, cur) {
                prev[cur] = function () { };
                return prev;
            }, {});
            shapeEvents["unknown"] = function () { };
            var eventDispatcher = new createjs.EventDispatcher();
            knownEvents.forEach(function (eventName) {
                expect(eventDispatcher.hasEventListener(eventName)).toBe(false, "has " + eventName);
            });
            txt.Util.copyEventListeners(shapeEvents, eventDispatcher);
            knownEvents.forEach(function (eventName) {
                expect(eventDispatcher.hasEventListener(eventName)).toBe(true, "has " + eventName);
            });
            expect(eventDispatcher.hasEventListener("unknown")).toBe(false);
        });
    });

})));
//# sourceMappingURL=tests.umd.js.map
