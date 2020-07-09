(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('txt'), require('examples')) :
    typeof define === 'function' && define.amd ? define(['exports', 'txt', 'examples'], factory) :
    (global = global || self, factory(global.site = {}, global.txt, global.examples));
}(this, (function (exports, txt, txtExamples) { 'use strict';

    (function () {
        var layout = document.getElementById("layout");
        var menu = document.getElementById("menu");
        var menuLink = document.getElementById("menuLink");
        function toggleClass(element, className) {
            var classes = element.className.split(/\s+/);
            var length = classes.length;
            var i = 0;
            for (; i < length; i++) {
                if (classes[i] === className) {
                    classes.splice(i, 1);
                    break;
                }
            }
            // The className is not found
            if (length === classes.length) {
                classes.push(className);
            }
            element.className = classes.join(" ");
        }
        menuLink.onclick = function (e) {
            var active = "active";
            e.preventDefault();
            toggleClass(layout, active);
            toggleClass(menu, active);
            toggleClass(menuLink, active);
        };
    })();

    function circle(x, y, r) {
        // prettier-ignore
        return ("M " + x + " " + y + " " +
            "m " + -r + ",0 " +
            "a " + r + "," + r + " 0 1,0 " + (r * 2) + ",0 " +
            "a " + r + "," + r + " 0 1,0 " + (-r * 2) +
            ",0 Z");
    }

    var PIXEL_RATIO = window.devicePixelRatio || 1;

    function createHiDPICanvas(w, h, ratio) {
        if (!ratio) {
            ratio = PIXEL_RATIO;
        }
        var canvas = document.createElement("canvas");
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        return canvas;
    }

    var pathText, text, stage;
    function createDemo(exampleElement) {
        var canvas = createHiDPICanvas(500, 300, 2);
        canvas.style.maxWidth = "100%";
        exampleElement.appendChild(canvas);
        stage = new createjs.Stage(canvas);
        text = new txt.Text({
            text: "This is TxtJS",
            font: "lobster",
            align: txt.Align.MIDDLE_CENTER,
            style: Array.from(Array(14).keys()).map(function (val) {
                var hex = val.toString(16);
                var unhex = (14 - val).toString(16);
                return {
                    fillColor: val % 2 == 0
                        ? "#FF" + hex + hex + unhex + unhex
                        : "#" + hex + hex + unhex + unhex + "FF"
                };
            }),
            strokeWidth: 1,
            strokeColor: "#000",
            width: 500,
            height: 300,
            size: 100,
            start: 2700,
            x: 250,
            y: 150,
            debug: true
        });
        stage.addChild(text);
        pathText = new txt.PathText({
            text: "Text on a path!",
            font: "arimo",
            align: txt.PathAlign.Center,
            path: circle(0, 0, 200),
            rotation: 0,
            initialTracking: 200,
            width: 1000,
            height: 600,
            size: 50,
            start: 2700,
            x: 500,
            y: 300
        });
        stage.addChild(pathText);
        createjs.Ticker.on("tick", tick);
        createjs.Ticker.framerate = 30;
    }
    var counter = 0;
    var counter2 = 0;
    function tick(event) {
        pathText.tracking = 50 + Math.sin(counter) * 200;
        text.align =
            Math.sin(counter) > 0 ? txt.Align.BOTTOM_RIGHT : txt.Align.TOP_LEFT;
        counter = (counter + 0.05) % 7;
        counter2 = (counter2 + 3) % 500;
        text.width = 100 + counter2;
        text.x = 450 - counter2 / 2;
        pathText.font = counter > 2.5 ? "arimo" : "lobster";
        pathText.rotation = pathText.rotation + (1 % 360);
        text.layout();
        pathText.layout();
        stage.update(event);
    }

    function buildExampleInit(examplePath) {
        var parts = examplePath.split("/");
        return txtExamples[parts[0]][parts[1]];
    }
    function buildExampleTitle(examplePath) {
        return ("txtjs example: " +
            examplePath
                .split("/")
                .join(" - ")
                .split("_")
                .join(" "));
    }
    function clearExample() {
        var canvas = document.getElementsByTagName("canvas")[0];
        if (canvas && canvas.parentNode === document.body) {
            document.body.removeChild(canvas);
        }
    }
    function exampleLoader () {
        var example = location.hash.replace("#", "");
        if (example) {
            document.title = buildExampleTitle(example);
            window.onload = function () {
                buildExampleInit(example)();
            };
        }
        window.onhashchange = function () {
            var example = location.hash.replace("#", "");
            clearExample();
            document.title = buildExampleTitle(example);
            buildExampleInit(example)();
        };
    }

    exports.initDemo = createDemo;
    exports.initExampleLoader = exampleLoader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=site.umd.js.map
