'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SVGArc = /** @class */ (function () {
    function SVGArc(x1, rx, ry, phiarg, fA, fS, x2) {
        this.rx = rx;
        this.ry = ry;
        this.x2 = x2;
        if (rx == 0 || ry == 0) {
            return;
        }
        var phi = phiarg * (Math.PI / 180.0);
        rx = Math.abs(rx);
        ry = Math.abs(ry);
        var xPrime = this.rotClockwise(this.midPoint(x1, x2), phi); // F.6.5.1
        var xPrime2 = this.pointMul(xPrime, xPrime);
        var rx2 = Math.pow(rx, 2);
        var ry2 = Math.pow(ry, 2);
        var lambda = Math.sqrt(xPrime2[0] / rx2 + xPrime2[1] / ry2);
        if (lambda > 1) {
            rx *= lambda;
            ry *= lambda;
            rx2 = Math.pow(rx, 2);
            ry2 = Math.pow(ry, 2);
        }
        var t = rx2 * ry2 - rx2 * xPrime2[1] - ry2 * xPrime2[0];
        if (t > -0.000001 && t < 0.000001) {
            t = 0;
        }
        var b = rx2 * xPrime2[1] + ry2 * xPrime2[0];
        if (b > -0.000001 && b < 0.000001) {
            b = 0;
        }
        var factor = Math.sqrt(t / b);
        if (fA == fS) {
            factor *= -1.0;
        }
        var cPrime = this.scale(factor, [
            (rx * xPrime[1]) / ry,
            (-ry * xPrime[0]) / rx
        ]);
        var c = this.sum(this.rotCounterClockwise(cPrime, phi), this.meanVec(x1, x2));
        var x1UnitVector = [
            (xPrime[0] - cPrime[0]) / rx,
            (xPrime[1] - cPrime[1]) / ry
        ];
        var x2UnitVector = [
            (-1.0 * xPrime[0] - cPrime[0]) / rx,
            (-1.0 * xPrime[1] - cPrime[1]) / ry
        ];
        var theta = this.angle([1, 0], x1UnitVector);
        var deltaTheta = this.angle(x1UnitVector, x2UnitVector);
        if (isNaN(deltaTheta)) {
            deltaTheta = Math.PI;
        }
        var start = theta;
        var end = theta + deltaTheta;
        this.cx = c[0];
        this.cy = c[1];
        this.phi = phi;
        this.rx = rx;
        this.ry = ry;
        this.start = start;
        this.end = end;
        this.fS = !fS;
    }
    SVGArc.prototype.mag = function (v) {
        return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
    };
    SVGArc.prototype.meanVec = function (u, v) {
        return [(u[0] + v[0]) / 2.0, (u[1] + v[1]) / 2.0];
    };
    SVGArc.prototype.dot = function (u, v) {
        return u[0] * v[0] + u[1] * v[1];
    };
    SVGArc.prototype.ratio = function (u, v) {
        return this.dot(u, v) / (this.mag(u) * this.mag(v));
    };
    SVGArc.prototype.rotClockwise = function (v, angle) {
        var cost = Math.cos(angle);
        var sint = Math.sin(angle);
        return [cost * v[0] + sint * v[1], -1 * sint * v[0] + cost * v[1]];
    };
    SVGArc.prototype.pointMul = function (u, v) {
        return [u[0] * v[0], u[1] * v[1]];
    };
    SVGArc.prototype.scale = function (c, v) {
        return [c * v[0], c * v[1]];
    };
    SVGArc.prototype.sum = function (u, v) {
        return [u[0] + v[0], u[1] + v[1]];
    };
    SVGArc.prototype.angle = function (u, v) {
        var sign = 1.0;
        if (u[0] * v[1] - u[1] * v[0] < 0) {
            sign = -1.0;
        }
        return sign * Math.acos(this.ratio(u, v));
    };
    SVGArc.prototype.rotCounterClockwise = function (v, angle) {
        var cost = Math.cos(angle);
        var sint = Math.sin(angle);
        return [cost * v[0] - sint * v[1], sint * v[0] + cost * v[1]];
    };
    SVGArc.prototype.midPoint = function (u, v) {
        return [(u[0] - v[0]) / 2.0, (u[1] - v[1]) / 2.0];
    };
    SVGArc.prototype.exec = function (ctx) {
        if (this.rx == 0 || this.ry == 0) {
            ctx.lineTo(this.x2[0], this.x2[1]);
            return;
        }
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.phi);
        ctx.scale(this.rx, this.ry);
        ctx.arc(0, 0, 1, this.start, this.end, this.fS);
        ctx.scale(1 / this.rx, 1 / this.ry);
        ctx.rotate(-this.phi);
        ctx.translate(-this.cx, -this.cy);
    };
    return SVGArc;
}());

function parsePathData(data) {
    if (!data) {
        return [];
    }
    var cs = data;
    var cc = [
        "m",
        "M",
        "l",
        "L",
        "v",
        "V",
        "h",
        "H",
        "z",
        "Z",
        "c",
        "C",
        "q",
        "Q",
        "t",
        "T",
        "s",
        "S",
        "a",
        "A"
    ];
    cs = cs.replace(new RegExp(" ", "g"), ",");
    for (var n = 0; n < cc.length; n++) {
        cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
    }
    var arr = cs.split("|");
    var ca = [];
    var cpx = 0;
    var cpy = 0;
    var arrLength = arr.length;
    var startPoint = null;
    for (var n = 1; n < arrLength; n++) {
        var str = arr[n];
        var c = str.charAt(0);
        str = str.slice(1);
        str = str.replace(new RegExp(",-", "g"), "-");
        str = str.replace(new RegExp("-", "g"), ",-");
        str = str.replace(new RegExp("e,-", "g"), "e-");
        var p = str.split(",");
        if (p.length > 0 && p[0] === "") {
            p.shift();
        }
        var pLength = p.length;
        for (var i = 0; i < pLength; i++) {
            p[i] = parseFloat(p[i]);
        }
        if (c === "z" || c === "Z") {
            p = [true];
        }
        while (p.length > 0) {
            if (isNaN(p[0])) {
                break;
            }
            var cmd = null;
            var points = [];
            var startX = cpx, startY = cpy;
            var prevCmd = void 0, ctlPtx = void 0, ctlPty = void 0;
            var rx = void 0, ry = void 0, psi = void 0, fa = void 0, fs = void 0, x1 = void 0, y1 = void 0;
            var dx = void 0, dy = void 0;
            switch (c) {
                case "l":
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "L";
                    points.push(cpx, cpy);
                    break;
                case "L":
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case "m":
                    dx = p.shift();
                    dy = p.shift();
                    cpx += dx;
                    cpy += dy;
                    if (startPoint == null) {
                        startPoint = [cpx, cpy];
                    }
                    cmd = "M";
                    points.push(cpx, cpy);
                    c = "l";
                    break;
                case "M":
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = "M";
                    if (startPoint == null) {
                        startPoint = [cpx, cpy];
                    }
                    points.push(cpx, cpy);
                    c = "L";
                    break;
                case "h":
                    cpx += p.shift();
                    cmd = "L";
                    points.push(cpx, cpy);
                    break;
                case "H":
                    cpx = p.shift();
                    cmd = "L";
                    points.push(cpx, cpy);
                    break;
                case "v":
                    cpy += p.shift();
                    cmd = "L";
                    points.push(cpx, cpy);
                    break;
                case "V":
                    cpy = p.shift();
                    cmd = "L";
                    points.push(cpx, cpy);
                    break;
                case "C":
                    points.push(p.shift(), p.shift(), p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case "c":
                    points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "C";
                    points.push(cpx, cpy);
                    break;
                case "S":
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === "C") {
                        ctlPtx = cpx + (cpx - prevCmd.points[2]);
                        ctlPty = cpy + (cpy - prevCmd.points[3]);
                    }
                    points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = "C";
                    points.push(cpx, cpy);
                    break;
                case "s":
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === "C") {
                        ctlPtx = cpx + (cpx - prevCmd.points[2]);
                        ctlPty = cpy + (cpy - prevCmd.points[3]);
                    }
                    points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "C";
                    points.push(cpx, cpy);
                    break;
                case "Q":
                    points.push(p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case "q":
                    points.push(cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "Q";
                    points.push(cpx, cpy);
                    break;
                case "T":
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === "Q") {
                        ctlPtx = cpx + (cpx - prevCmd.points[0]);
                        ctlPty = cpy + (cpy - prevCmd.points[1]);
                    }
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = "Q";
                    points.push(ctlPtx, ctlPty, cpx, cpy);
                    break;
                case "t":
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === "Q") {
                        ctlPtx = cpx + (cpx - prevCmd.points[0]);
                        ctlPty = cpy + (cpy - prevCmd.points[1]);
                    }
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "Q";
                    points.push(ctlPtx, ctlPty, cpx, cpy);
                    break;
                case "A":
                    rx = p.shift();
                    ry = p.shift();
                    psi = p.shift();
                    fa = p.shift();
                    fs = p.shift();
                    x1 = cpx;
                    y1 = cpy;
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = "A";
                    points = [[x1, y1], rx, ry, psi, fa, fs, [cpx, cpy]];
                    break;
                case "a":
                    rx = p.shift();
                    ry = p.shift();
                    psi = p.shift();
                    fa = p.shift();
                    fs = p.shift();
                    x1 = cpx;
                    y1 = cpy;
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = "A";
                    points = [[x1, y1], rx, ry, psi, fa, fs, [cpx, cpy]];
                    break;
                case "z":
                    cmd = "Z";
                    if (startPoint) {
                        cpx = startPoint[0];
                        cpy = startPoint[1];
                        startPoint = null;
                    }
                    else {
                        cpx = 0;
                        cpy = 0;
                    }
                    p.shift();
                    points = [cpx, cpy];
                    break;
                case "Z":
                    cmd = "Z";
                    if (startPoint) {
                        cpx = startPoint[0];
                        cpy = startPoint[1];
                        startPoint = null;
                    }
                    else {
                        cpx = 0;
                        cpy = 0;
                    }
                    p.shift();
                    points = [cpx, cpy];
                    break;
            }
            ca.push({
                command: cmd || c,
                points: points,
                start: {
                    x: startX,
                    y: startY
                }
            });
        }
    }
    return ca;
}

var Graphics = /** @class */ (function () {
    function Graphics() {
    }
    /**
     * Build up createjs Graphics commands based on path data.
     */
    Graphics.init = function (target, svgpath) {
        var ca = parsePathData(svgpath);
        var G = createjs.Graphics;
        for (var n = 0; n < ca.length; n++) {
            var c = ca[n].command;
            var p = ca[n].points;
            switch (c) {
                case "L":
                    target.append(new G.LineTo(p[0], p[1]));
                    break;
                case "M":
                    target.append(new G.MoveTo(p[0], p[1]));
                    break;
                case "C":
                    target.append(new G.BezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]));
                    break;
                case "Q":
                    target.append(new G.QuadraticCurveTo(p[0], p[1], p[2], p[3]));
                    break;
                case "A":
                    target.append(new SVGArc(p[0], p[1], p[2], p[3], p[4], p[5], p[6]));
                    break;
                case "Z":
                    target.append(new G.ClosePath());
                    target.append(new G.MoveTo(p[0], p[1]));
                    break;
            }
        }
    };
    return Graphics;
}());

function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}

var GraphicsMixin = /** @class */ (function () {
    function GraphicsMixin() {
    }
    /**
     * decodeSVGPath intended for createjs.Graphics class
     */
    GraphicsMixin.prototype.decodeSVGPath = function (data) {
        Graphics.init(this, data);
        return this;
    };
    return GraphicsMixin;
}());
applyMixins(createjs.Graphics, [GraphicsMixin]);

var Accessibility = /** @class */ (function () {
    function Accessibility() {
    }
    Accessibility.set = function (element) {
        //if an element is not on canvas, do not place into accessibility api
        if (element.stage == null) {
            return;
        }
        //clear timeout if exists
        if (Accessibility.timeout != null) {
            clearTimeout(Accessibility.timeout);
        }
        // add to accessibility elements
        if (element.accessibilityId == null) {
            Accessibility.data.push(element);
            element.accessibilityId = Accessibility.data.length - 1;
        }
        Accessibility.timeout = setTimeout(Accessibility.update, 300);
    };
    Accessibility.update = function () {
        Accessibility.timeout = null;
        var data = Accessibility.data.slice(0);
        data.sort(function (a, b) {
            return a.accessibilityPriority - b.accessibilityPriority;
        });
        var len = data.length;
        var out = "";
        var currentCanvas = data[0].stage.canvas;
        for (var i = 0; i < len; i++) {
            if (data[i].stage == null) {
                continue;
            }
            if (currentCanvas != data[i].stage.canvas) {
                currentCanvas.innerHTML = out;
                out = "";
                currentCanvas = data[i].stage.canvas;
            }
            if (data[i].accessibilityText == null) {
                out += "<p>" + data[i].text + "</p>";
            }
            else {
                out += data[i].accessibilityText;
            }
        }
        currentCanvas.innerHTML = out;
    };
    Accessibility.clear = function () {
        Accessibility.data = [];
    };
    Accessibility.data = [];
    Accessibility.timeout = null;
    return Accessibility;
}());

var Align;
(function (Align) {
    Align[Align["TOP_LEFT"] = 0] = "TOP_LEFT";
    Align[Align["TOP_CENTER"] = 1] = "TOP_CENTER";
    Align[Align["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    Align[Align["MIDDLE_LEFT"] = 3] = "MIDDLE_LEFT";
    Align[Align["MIDDLE_CENTER"] = 4] = "MIDDLE_CENTER";
    Align[Align["MIDDLE_RIGHT"] = 5] = "MIDDLE_RIGHT";
    Align[Align["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Align[Align["BOTTOM_CENTER"] = 7] = "BOTTOM_CENTER";
    Align[Align["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
    Align[Align["TL"] = 0] = "TL";
    Align[Align["TC"] = 1] = "TC";
    Align[Align["TR"] = 2] = "TR";
    Align[Align["ML"] = 3] = "ML";
    Align[Align["MC"] = 4] = "MC";
    Align[Align["MR"] = 5] = "MR";
    Align[Align["BL"] = 6] = "BL";
    Align[Align["BC"] = 7] = "BC";
    Align[Align["BR"] = 8] = "BR";
})(Align || (Align = {}));
var Align$1 = Align;

var Case;
(function (Case) {
    Case[Case["NORMAL"] = 0] = "NORMAL";
    Case[Case["UPPER"] = 1] = "UPPER";
    Case[Case["LOWER"] = 2] = "LOWER";
    Case[Case["SMALL_CAPS"] = 3] = "SMALL_CAPS";
})(Case || (Case = {}));
var Case$1 = Case;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Font = /** @class */ (function () {
    function Font() {
        this.glyphs = {};
        this.kerning = {};
        this.top = 0;
        this.middle = 0;
        this.bottom = 0;
        this.units = 1000;
        this.ligatures = {};
        this.loaded = false;
        this.targets = [];
    }
    Font.prototype.cloneGlyph = function (target, from) {
        if (this.glyphs[target] == undefined && this.glyphs[from] != undefined) {
            this.glyphs[target] = this.glyphs[from];
            this.kerning[target] = this.kerning[from];
        }
    };
    return Font;
}());

/**
 * Represents a single Glyph within a Font.
 */
var Glyph = /** @class */ (function () {
    function Glyph() {
        /** SVG path data */
        this.path = "";
        this.kerning = {};
        this._graphic = null;
    }
    Glyph.prototype.graphic = function () {
        if (this._graphic == null) {
            this._graphic = new createjs.Graphics();
            //append fill/stroke/stokeStyle
            //Character instances populate properties before draw
            this._stroke = new createjs.Graphics.Stroke(null, true);
            this._strokeStyle = new createjs.Graphics.StrokeStyle(0, null, null, null);
            this._fill = new createjs.Graphics.Fill(null);
            //convert SVG to drawing paths
            this._graphic.decodeSVGPath(this.path);
            this._graphic.append(this._fill);
            this._graphic.append(this._strokeStyle);
            this._graphic.append(this._stroke);
        }
        return this._graphic;
    };
    Glyph.prototype.draw = function (ctx) {
        this._graphic.draw(ctx);
        return true;
    };
    Glyph.prototype.getKerning = function (characterCode, size) {
        var out = -(this.kerning[characterCode] * size);
        if (isNaN(out)) {
            return 0;
        }
        if (isNaN(characterCode)) {
            return 0;
        }
        if (isNaN(size)) {
            return 0;
        }
        if (this.kerning[characterCode] != undefined) {
            return out;
        }
        return 0;
    };
    return Glyph;
}());

/**
 * Fetches font files via AJAX request, and
 * parses the font into glyphs, and stores it.
 * Local storage is optionally used for caching.
 *
 * Font files store font data, grouped by categories:
 *
 *  * `0` = Font properties: `0|property name|property value`
 *  * `1` = Glyph SVG shape data: `1|?|?|SVGPath data`
 *  * `2` = Kerning spacing: `2|?|?|?`
 *  * `3` = Ligatures: `3`
 *
 * Each line in a category of data is delineated with pipe characters "|".
 *
 * Partial example:
 *
 * ```
 * 0|id|Abel-Regular
 * 0|family|Abel
 * 1|33|428|M250 434h-72l-55 1000h182zM137 0v154h154v-154h-154z
 * 1|34|645|M225 993h-51l-51 441h153zM471 993h-51l-51 441h153z
 * 2|34|197|123
 * 2|47|100|102
 * 3
 * ```
 *
 * @todo This class should be split into FontLoader (AJAX fetch), FontParser (deserialisation), and probably a FontStorage class.
 */
var FontLoader = /** @class */ (function () {
    function FontLoader() {
    }
    FontLoader.isLoaded = function (name) {
        if (FontLoader.fonts.hasOwnProperty(name)) {
            return FontLoader.fonts[name].loaded;
        }
        return false;
    };
    FontLoader.getFont = function (name) {
        if (FontLoader.fonts.hasOwnProperty(name)) {
            return FontLoader.fonts[name];
        }
        return null;
    };
    FontLoader.load = function (target, fonts) {
        //no loaderId implies no loading for this txt field
        var loader;
        if (target.loaderId == null) {
            loader = {};
            target.loaderId = FontLoader.loaders.push(loader) - 1;
            loader._id = target.loaderId;
            loader._target = target;
        }
        else {
            loader = FontLoader.loaders[target.loaderId];
        }
        var fontCount = fonts.length;
        for (var i = 0; i < fontCount; ++i) {
            //mark loader for font loading
            loader[fonts[i]] = false;
        }
        for (var prop in loader) {
            if (prop.charAt(0) != "_") {
                FontLoader.loadFont(prop, loader);
            }
        }
    };
    FontLoader.check = function (id) {
        var loader = FontLoader.loaders[id];
        //determine if all fonts are loaded
        for (var prop in loader) {
            if (prop.charAt(0) != "_") {
                loader[prop] = FontLoader.isLoaded(prop);
                if (loader[prop] == false)
                    return;
            }
        }
        window.setTimeout(function () {
            loader._target.fontLoaded();
        }, 1);
    };
    FontLoader.loadFont = function (fontName, loader) {
        //determine if font exists in memory
        if (FontLoader.fonts.hasOwnProperty(fontName)) {
            //loading complete
            if (FontLoader.fonts[fontName].loaded === true) {
                FontLoader.check(loader._id);
                //loading not complete
            }
            else {
                //add loader id to font
                FontLoader.fonts[fontName].targets.push(loader._id);
            }
            //load from scratch
        }
        else {
            var font_1 = (FontLoader.fonts[fontName] = new Font());
            font_1.targets.push(loader._id);
            //TODO localstorage check & get
            var req = new XMLHttpRequest();
            if (localStorage && FontLoader.cache) {
                var local = JSON.parse(localStorage.getItem("txt_font_" + fontName.split(" ").join("_")));
                if (local != null) {
                    if (local.version === FontLoader.version) {
                        req.cacheResponseText = local.font;
                        req.cacheFont = true;
                    }
                }
            }
            req.onload = function () {
                //localstorage set
                if (localStorage && FontLoader.cache && this.cacheFont == undefined) {
                    localStorage.setItem("txt_font_" + fontName.split(" ").join("_"), JSON.stringify({
                        font: this.responseText,
                        version: FontLoader.version
                    }));
                }
                var lines = this.responseText.split("\n");
                //use cacheResponseText as responseText is readonly via XHR
                if (this.cacheResponseText) {
                    lines = this.cacheResponseText.split("\n");
                }
                var len = lines.length;
                var i = 0;
                var line;
                var glyph;
                var lineLen;
                while (i < len) {
                    line = lines[i].split("|");
                    switch (line[0]) {
                        case "0":
                            //properties
                            if (line[1] == "id" ||
                                line[1] == "panose" ||
                                line[1] == "family" ||
                                line[1] == "font-style" ||
                                line[1] == "font-stretch") {
                                font_1[line[1]] = line[2];
                            }
                            else {
                                font_1[line[1]] = parseInt(line[2]);
                            }
                            break;
                        case "1":
                            //glyphs
                            glyph = new Glyph();
                            glyph.offset = parseInt(line[2]) / font_1.units;
                            glyph.path = line[3];
                            font_1.glyphs[line[1]] = glyph;
                            break;
                        case "2":
                            //kerning
                            if (font_1.kerning[line[1]] == undefined) {
                                font_1.kerning[line[1]] = {};
                            }
                            if (font_1.glyphs[line[1]] == undefined) {
                                glyph = new Glyph();
                                glyph.offset = font_1.default / font_1.units;
                                glyph.path = "";
                                font_1.glyphs[line[1]] = glyph;
                            }
                            font_1.glyphs[line[1]].kerning[line[2]] =
                                parseInt(line[3]) / font_1.units;
                            font_1.kerning[line[1]][line[2]] = parseInt(line[3]) / font_1.units;
                            break;
                        case "3":
                            line.shift();
                            lineLen = line.length;
                            for (var j = 0; j < lineLen; j++) {
                                var path = line[j].split("");
                                var pathLength = path.length;
                                var target = font_1.ligatures;
                                for (var k = 0; k < pathLength; k++) {
                                    if (target[path[k]] == undefined) {
                                        target[path[k]] = {};
                                    }
                                    if (k == pathLength - 1) {
                                        target[path[k]].glyph = font_1.glyphs[line[j]];
                                    }
                                    target = target[path[k]];
                                }
                                //font.ligatures[ line[ j ] ] = font.glyphs[ line[j] ]
                            }
                            break;
                    }
                    i++;
                }
                //character cloning
                //clone bullet into multiple areas
                font_1.cloneGlyph(183, 8226);
                font_1.cloneGlyph(8729, 8226);
                font_1.cloneGlyph(12539, 8226);
                font_1.cloneGlyph(9702, 8226);
                font_1.cloneGlyph(9679, 8226);
                font_1.cloneGlyph(9675, 8226);
                //define font adjustment values for font.top, font.middle, font.bottom
                if (font_1.top == undefined) {
                    font_1.top = 0;
                }
                if (font_1.middle == undefined) {
                    font_1.middle = 0;
                }
                if (font_1.bottom == undefined) {
                    font_1.bottom = 0;
                }
                //level the font metadata
                var lLen = font_1.targets.length;
                font_1.loaded = true;
                for (var l = 0; l < lLen; ++l) {
                    FontLoader.check(font_1.targets[l]);
                }
                font_1.targets = [];
            };
            //check if cached
            if (req.cacheFont == true) {
                req.onload();
            }
            else {
                req.open("get", FontLoader.path + fontName.split(" ").join("_") + ".txt", true);
                req.send();
            }
        }
    };
    /**
     * Server path to load font files from.
     */
    FontLoader.path = "/font/";
    FontLoader.cache = false;
    FontLoader.version = 0;
    FontLoader.fonts = {};
    FontLoader.loaders = [];
    return FontLoader;
}());

/**
 * Represents a styled character
 */
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(character, style, index) {
        if (index === void 0) { index = null; }
        var _this = _super.call(this) || this;
        _this.character = "";
        _this.characterCode = null;
        _this.font = null;
        _this.tracking = null;
        _this.characterCase = null;
        _this.characterCaseOffset = 0;
        _this.index = null;
        _this.size = null;
        _this.fillColor = null;
        _this.strokeColor = null;
        _this.strokeWidth = null;
        _this.measuredWidth = null;
        _this.measuredHeight = null;
        _this.hPosition = null;
        _this.missing = false;
        _this.set(style);
        _this.index = index;
        var upperSmall;
        // flip case depending on characterCase property
        if (_this.characterCase == Case$1.NORMAL) {
            _this.character = character;
        }
        else if (_this.characterCase == Case$1.UPPER) {
            _this.character = character.toUpperCase();
        }
        else if (_this.characterCase == Case$1.LOWER) {
            _this.character = character.toLowerCase();
        }
        else if (_this.characterCase == Case$1.SMALL_CAPS) {
            _this.character = character.toUpperCase();
            upperSmall = !(character === _this.character);
        }
        else {
            //fallback case for unknown.
            _this.character = character;
        }
        _this.characterCode = _this.character.charCodeAt(0);
        _this._font = FontLoader.getFont(_this.font);
        if (_this._font.glyphs[_this.characterCode]) {
            _this._glyph = _this._font.glyphs[_this.characterCode];
            //flip lower
        }
        else if (_this._font.glyphs[String.fromCharCode(_this.characterCode)
            .toLowerCase()
            .charCodeAt(0)]) {
            _this._glyph = _this._font.glyphs[String.fromCharCode(_this.characterCode)
                .toLowerCase()
                .charCodeAt(0)];
            //flip upper
        }
        else if (_this._font.glyphs[String.fromCharCode(_this.characterCode)
            .toUpperCase()
            .charCodeAt(0)]) {
            _this._glyph = _this._font.glyphs[String.fromCharCode(_this.characterCode)
                .toUpperCase()
                .charCodeAt(0)];
        }
        //missing glyph
        if (_this._glyph === undefined) {
            console.log("MISSING GLYPH:" + _this.character);
            _this._glyph = _this._font.glyphs[42];
            _this.missing = true;
        }
        _this.graphics = _this._glyph.graphic();
        // scale x
        if (_this.characterCase === Case$1.SMALL_CAPS) {
            if (upperSmall) {
                _this.scaleX = (_this.size / _this._font.units) * 0.8;
                _this.characterCaseOffset = -0.2 * (_this._glyph.offset * _this.size);
            }
            else {
                _this.scaleX = _this.size / _this._font.units;
            }
        }
        else {
            _this.scaleX = _this.size / _this._font.units;
        }
        _this.scaleY = -_this.scaleX;
        _this.measuredHeight =
            (_this._font.ascent - _this._font.descent) * _this.scaleX;
        _this.measuredWidth = _this.scaleX * _this._glyph.offset * _this._font.units;
        var ha = new createjs.Shape();
        ha.graphics
            .beginFill("#000")
            .drawRect(0, _this._font.descent, _this._glyph.offset * _this._font.units, _this._font.ascent - _this._font.descent);
        _this.hitArea = ha;
        return _this;
    }
    Character.prototype.setGlyph = function (glyph) {
        this._glyph = glyph;
        this.graphics = this._glyph.graphic();
    };
    Character.prototype.trackingOffset = function () {
        return this.size * (2.5 / this._font.units + 1 / 900 + this.tracking / 990);
    };
    Character.prototype.draw = function (ctx) {
        this._glyph._fill.style = this.fillColor;
        this._glyph._fill.matrix = null;
        this._glyph._stroke.style = this.strokeColor;
        this._glyph._strokeStyle.width = this.strokeWidth;
        return this._glyph.draw(ctx);
    };
    Character.prototype.getWidth = function () {
        return this.size * this._glyph.offset;
    };
    return Character;
}(createjs.Shape));

/**
 * Common aspects of top-level Text classes
 */
var TextContainer = /** @class */ (function (_super) {
    __extends(TextContainer, _super);
    function TextContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        _this.original = null;
        _this.style = null;
        _this.font = "belinda";
        _this.characterCase = Case$1.NORMAL;
        //accessibility
        _this.accessibilityText = null;
        _this.accessibilityPriority = 2;
        _this.accessibilityId = null;
        return _this;
    }
    TextContainer.prototype.loadFonts = function () {
        var fonts = [this.font].concat(this.fontsFromCharacterStyles(this.style));
        FontLoader.load(this, fonts);
    };
    //called when text is rendered
    TextContainer.prototype.complete = function () {
        //placeholder
    };
    //called when font has loaded
    TextContainer.prototype.fontLoaded = function () {
        this.layout();
    };
    //call stage.update to render canvas
    //overload to support deferred rendering
    TextContainer.prototype.render = function () {
        this.stage.update();
    };
    TextContainer.prototype.addAccessibility = function () {
        Accessibility.set(this);
    };
    TextContainer.prototype.fontsFromCharacterStyles = function (styles) {
        var styleFonts = [];
        if (styles) {
            for (var i = 0; i < styles.length; ++i) {
                if (styles[i] != undefined && styles[i].font != undefined) {
                    styleFonts.push(styles[i].font);
                }
            }
        }
        return styleFonts;
    };
    TextContainer.prototype.getCharCodeAt = function (index) {
        if (this.characterCase == Case$1.NORMAL) {
            return this.text.charAt(index).charCodeAt(0);
        }
        else if (this.characterCase == Case$1.UPPER) {
            return this.text
                .charAt(index)
                .toUpperCase()
                .charCodeAt(0);
        }
        else if (this.characterCase == Case$1.LOWER) {
            return this.text
                .charAt(index)
                .toLowerCase()
                .charCodeAt(0);
        }
        else if (this.characterCase == Case$1.SMALL_CAPS) {
            return this.text
                .charAt(index)
                .toUpperCase()
                .charCodeAt(0);
        }
        else {
            //fallback case for unknown.
            return this.text.charAt(index).charCodeAt(0);
        }
    };
    // TODO: this code needs unit tests before it gets changed any further
    /**
     * Figure out how many characters a ligature covers,
     * and swap character glyph
     * @param char
     * @param ligTarget
     */
    TextContainer.prototype.ligatureSwap = function (char, ligTarget) {
        var advanceBy = 0;
        var firstChar = ligTarget.charAt(0);
        var firstLigature = char._font.ligatures[firstChar];
        //1 char match
        if (firstLigature) {
            //2 char match
            if (firstLigature[ligTarget.charAt(1)]) {
                //3 char match
                if (firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)]) {
                    //4 char match
                    if (firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)]) {
                        //swap 4 char ligature
                        char.setGlyph(firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)].glyph);
                        advanceBy = 3;
                    }
                    else {
                        //swap 3 char ligature
                        char.setGlyph(firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)].glyph);
                        advanceBy = 2;
                    }
                }
                else {
                    //swap 2 char ligature
                    char.setGlyph(firstLigature[ligTarget.charAt(1)].glyph);
                    advanceBy = 1;
                }
            }
        }
        return advanceBy;
    };
    return TextContainer;
}(createjs.Container));

var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super.call(this) || this;
    }
    //Text support
    Line.prototype.lastWord = function () {
        return this.children[this.children.length - 1];
    };
    //CharacterText support
    Line.prototype.lastCharacter = function () {
        return this.children[this.children.length - 1];
    };
    return Line;
}(createjs.Container));

var EventNames = [
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
/**
 *
 * @param source
 * @param shape
 *
 * @todo: simplify with a loop
 */
function copyEventListeners (original, shape) {
    EventNames.forEach(function (eventName) {
        if (original[eventName]) {
            shape.on(eventName, original[eventName]);
        }
    });
}

var SPACE_CHAR_CODE = 32;
var CharacterText = /** @class */ (function (_super) {
    __extends(CharacterText, _super);
    function CharacterText(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this) || this;
        _this.lineHeight = null;
        _this.width = 100;
        _this.height = 20;
        _this.align = Align$1.TOP_LEFT;
        _this.size = 12;
        _this.minSize = null;
        _this.maxTracking = null;
        _this.tracking = 0;
        _this.ligatures = false;
        _this.fillColor = "#000";
        _this.strokeColor = null;
        _this.strokeWidth = null;
        _this.singleLine = false;
        _this.autoExpand = false;
        _this.autoReduce = false;
        _this.overset = false;
        _this.oversetIndex = null;
        _this.loaderId = null;
        _this.debug = false;
        _this.lines = [];
        _this.missingGlyphs = null;
        _this.renderCycle = true;
        _this.measured = false;
        _this.oversetPotential = false;
        if (props) {
            _this.original = props;
            _this.set(props);
            _this.original.tracking = _this.tracking;
        }
        _this.loadFonts();
        return _this;
    }
    //layout text
    CharacterText.prototype.layout = function () {
        this.addAccessibility();
        this.overset = false;
        this.measured = false;
        this.oversetPotential = false;
        if (this.original.size) {
            this.size = this.original.size;
        }
        if (this.original.tracking) {
            this.tracking = this.original.tracking;
        }
        this.text = this.text.replace(/([\n][ \t]+)/g, "\n");
        if (this.singleLine === true) {
            this.text = this.text.split("\n").join("");
            this.text = this.text.split("\r").join("");
        }
        this.lines = [];
        this.missingGlyphs = null;
        this.removeAllChildren();
        if (this.text === "" || this.text === undefined) {
            this.render();
            this.complete();
            return;
        }
        this.block = new createjs.Container();
        this.addChild(this.block);
        if (this.debug == true) {
            this.addDebugLayout();
        }
        if (this.singleLine === true &&
            (this.autoExpand === true || this.autoReduce === true)) {
            this.measure();
        }
        if (this.renderCycle === false) {
            this.removeAllChildren();
            this.complete();
            return;
        }
        if (this.characterLayout() === false) {
            this.removeAllChildren();
            return;
        }
        this.lineLayout();
        this.render();
        this.complete();
    };
    /**
     * Draw baseline, ascent, ascender, and descender lines
     */
    CharacterText.prototype.addDebugLayout = function () {
        var font = FontLoader.getFont(this.font);
        //outline
        var s = new createjs.Shape();
        s.graphics.beginStroke("#FF0000");
        s.graphics.setStrokeStyle(1.2);
        s.graphics.drawRect(0, 0, this.width, this.height);
        this.addChild(s);
        //baseline
        s = new createjs.Shape();
        s.graphics.beginFill("#000");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = 0;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#F00");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font["cap-height"] / font.units) * this.size;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#0F0");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font.ascent / font.units) * this.size;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#00F");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font.descent / font.units) * this.size;
        this.block.addChild(s);
    };
    CharacterText.prototype.measure = function () {
        this.measured = true;
        //Extract origin sizing from this.original to preserve
        //metrics. autoMeasure will change style properties
        //directly. Change this.original to re-render.
        var len = this.text.length;
        var defaultStyle = {
            size: this.original.size,
            font: this.original.font,
            tracking: this.original.tracking,
            characterCase: this.original.characterCase
        };
        var currentStyle;
        var charCode = null;
        var font;
        var charMetrics = [];
        var largestFontSize = defaultStyle.size;
        for (var i = 0; i < len; i++) {
            charCode = this.text.charCodeAt(i);
            currentStyle = defaultStyle;
            if (this.original.style !== undefined &&
                this.original.style[i] !== undefined) {
                currentStyle = this.original.style[i];
                // make sure style contains properties needed.
                if (currentStyle.size === undefined)
                    currentStyle.size = defaultStyle.size;
                if (currentStyle.font === undefined)
                    currentStyle.font = defaultStyle.font;
                if (currentStyle.tracking === undefined)
                    currentStyle.tracking = defaultStyle.tracking;
            }
            if (currentStyle.size > largestFontSize) {
                largestFontSize = currentStyle.size;
            }
            font = FontLoader.fonts[currentStyle.font];
            charMetrics.push({
                char: this.text[i],
                size: currentStyle.size,
                charCode: charCode,
                font: currentStyle.font,
                offset: font.glyphs[charCode].offset,
                units: font.units,
                tracking: this.trackingOffset(currentStyle.tracking, currentStyle.size, font.units),
                kerning: font.glyphs[charCode].getKerning(this.getCharCodeAt(i + 1), 1)
            });
        }
        //save space char using last known width/height
        var space = {
            char: " ",
            size: currentStyle.size,
            charCode: 32,
            font: currentStyle.font,
            offset: font.glyphs[32].offset,
            units: font.units,
            tracking: 0,
            kerning: 0
        };
        charMetrics[charMetrics.length - 1].tracking = 0;
        //charMetrics[ charMetrics.length-1 ].kerning=0;
        len = charMetrics.length;
        //measured without size
        var metricBaseWidth = 0;
        //measured at size
        var metricRealWidth = 0;
        //measured at size with tracking
        var metricRealWidthTracking = 0;
        var current = null;
        for (var i = 0; i < len; i++) {
            current = charMetrics[i];
            metricBaseWidth = metricBaseWidth + current.offset + current.kerning;
            metricRealWidth =
                metricRealWidth + (current.offset + current.kerning) * current.size;
            metricRealWidthTracking =
                metricRealWidthTracking +
                    (current.offset + current.kerning + current.tracking) * current.size;
        }
        //size cases
        if (metricRealWidth > this.width) {
            if (this.autoReduce === true) {
                this.tracking = 0;
                this.size =
                    (this.original.size * this.width) /
                        (metricRealWidth + space.offset * space.size);
                if (this.minSize != null && this.size < this.minSize) {
                    this.size = this.minSize;
                    this.oversetPotential = true;
                }
                return true;
            }
            //tracking cases
        }
        else {
            var trackMetric = this.offsetTracking((this.width - metricRealWidth) / len, current.size, current.units);
            if (trackMetric < 0) {
                trackMetric = 0;
            }
            //auto expand case
            if (trackMetric > this.original.tracking && this.autoExpand) {
                if (this.maxTracking != null && trackMetric > this.maxTracking) {
                    this.tracking = this.maxTracking;
                }
                else {
                    this.tracking = trackMetric;
                }
                this.size = this.original.size;
                return true;
            }
            //auto reduce tracking case
            if (trackMetric < this.original.tracking && this.autoReduce) {
                if (this.maxTracking != null && trackMetric > this.maxTracking) {
                    this.tracking = this.maxTracking;
                }
                else {
                    this.tracking = trackMetric;
                }
                this.size = this.original.size;
                return true;
            }
        }
        return true;
    };
    CharacterText.prototype.trackingOffset = function (tracking, size, units) {
        return size * (2.5 / units + 1 / 900 + tracking / 990);
    };
    CharacterText.prototype.offsetTracking = function (offset, size, units) {
        return Math.floor(((offset - 2.5 / units - 1 / 900) * 990) / size);
    };
    CharacterText.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * Place characters in lines
     * adds Characters to lines. LineHeight IS a factor given lack of Words.
     */
    CharacterText.prototype.characterLayout = function () {
        //char layout
        var len = this.text.length;
        var char;
        var defaultStyle = {
            size: this.size,
            font: this.font,
            tracking: this.tracking,
            characterCase: this.characterCase,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        };
        var currentStyle = defaultStyle;
        var hPosition = 0;
        var vPosition = 0;
        var lineY = 0;
        var firstLine = true;
        var currentLine = new Line();
        this.lines.push(currentLine);
        this.block.addChild(currentLine);
        // loop over characters
        // place into lines
        for (var i = 0; i < len; i++) {
            if (this.style !== null && this.style[i] !== undefined) {
                currentStyle = this.style[i];
                // make sure style contains properties needed.
                if (currentStyle.size === undefined)
                    currentStyle.size = defaultStyle.size;
                if (currentStyle.font === undefined)
                    currentStyle.font = defaultStyle.font;
                if (currentStyle.tracking === undefined)
                    currentStyle.tracking = defaultStyle.tracking;
                if (currentStyle.characterCase === undefined)
                    currentStyle.characterCase = defaultStyle.characterCase;
                if (currentStyle.fillColor === undefined)
                    currentStyle.fillColor = defaultStyle.fillColor;
                if (currentStyle.strokeColor === undefined)
                    currentStyle.strokeColor = defaultStyle.strokeColor;
                if (currentStyle.strokeWidth === undefined)
                    currentStyle.strokeWidth = defaultStyle.strokeWidth;
            }
            // newline
            // mark word as having newline
            // create new word
            // new line has no character
            if (this.text.charAt(i) == "\n" || this.text.charAt(i) == "\r") {
                //only if not last char
                if (i < len - 1) {
                    if (firstLine === true) {
                        vPosition = currentStyle.size;
                        currentLine.measuredHeight = currentStyle.size;
                        currentLine.measuredWidth = hPosition;
                        lineY = 0;
                        currentLine.y = 0;
                    }
                    else if (this.lineHeight != undefined) {
                        vPosition = this.lineHeight;
                        currentLine.measuredHeight = vPosition;
                        currentLine.measuredWidth = hPosition;
                        lineY = lineY + vPosition;
                        currentLine.y = lineY;
                    }
                    else {
                        vPosition = char.measuredHeight;
                        currentLine.measuredHeight = vPosition;
                        currentLine.measuredWidth = hPosition;
                        lineY = lineY + vPosition;
                        currentLine.y = lineY;
                    }
                    firstLine = false;
                    currentLine = new Line();
                    currentLine.measuredHeight = currentStyle.size;
                    currentLine.measuredWidth = 0;
                    this.lines.push(currentLine);
                    this.block.addChild(currentLine);
                    vPosition = 0;
                    hPosition = 0;
                }
                if (this.text.charAt(i) == "\r" && this.text.charAt(i + 1) == "\n") {
                    i++;
                }
                continue;
            }
            //runtime test for font
            if (FontLoader.isLoaded(currentStyle.font) === false) {
                FontLoader.load(this, [currentStyle.font]);
                return false;
            }
            // create character
            char = new Character(this.text.charAt(i), currentStyle, i);
            if (this.original.character) {
                copyEventListeners(this.original.character, char);
            }
            if (char.missing) {
                if (this.missingGlyphs == null) {
                    this.missingGlyphs = [];
                }
                this.missingGlyphs.push({
                    position: i,
                    character: this.text.charAt(i),
                    font: currentStyle.font
                });
            }
            if (firstLine === true) {
                if (vPosition < char.size) {
                    vPosition = char.size;
                }
            }
            else if (this.lineHeight != undefined && this.lineHeight > 0) {
                if (vPosition < this.lineHeight) {
                    vPosition = this.lineHeight;
                }
            }
            else if (char.measuredHeight > vPosition) {
                vPosition = char.measuredHeight;
            }
            //swap character if ligature
            //ligatures removed if tracking or this.ligatures is false
            if (currentStyle.tracking == 0 && this.ligatures == true) {
                var ligTarget = this.text.substr(i, 4);
                i = i + this.ligatureSwap(char, ligTarget);
            }
            if (this.overset == true) {
                break;
            }
            var longerThanWidth = hPosition + char.measuredWidth > this.width;
            if (this.singleLine === false && longerThanWidth) {
                var lastchar = currentLine.children[currentLine.children.length - 1];
                currentLine.measuredWidth =
                    hPosition -
                        lastchar.trackingOffset() -
                        lastchar._glyph.getKerning(this.getCharCodeAt(i), lastchar.size);
                if (lastchar.characterCode == SPACE_CHAR_CODE) {
                    currentLine.measuredWidth -= lastchar.measuredWidth;
                }
                if (firstLine === true) {
                    currentLine.measuredHeight = vPosition;
                    currentLine.y = 0;
                    lineY = 0;
                }
                else {
                    currentLine.measuredHeight = vPosition;
                    lineY = lineY + vPosition;
                    currentLine.y = lineY;
                }
                firstLine = false;
                currentLine = new Line();
                currentLine.addChild(char);
                if (char.characterCode == SPACE_CHAR_CODE) {
                    hPosition = 0;
                }
                else {
                    hPosition =
                        char.x +
                            char._glyph.offset * char.size +
                            char.characterCaseOffset +
                            char.trackingOffset();
                }
                this.lines.push(currentLine);
                this.block.addChild(currentLine);
                vPosition = 0;
                //measured case
            }
            else if (this.measured == true &&
                this.singleLine === true &&
                longerThanWidth &&
                this.oversetPotential == true) {
                this.oversetIndex = i;
                this.overset = true;
                //not measured
            }
            else if (this.measured == false &&
                this.singleLine === true &&
                longerThanWidth) {
                this.oversetIndex = i;
                this.overset = true;
            }
            else {
                char.x = hPosition;
                // push character into word
                currentLine.addChild(char);
                hPosition =
                    char.x +
                        char._glyph.offset * char.size +
                        char.characterCaseOffset +
                        char.trackingOffset() +
                        char._glyph.getKerning(this.getCharCodeAt(i + 1), char.size);
            }
        }
        //case of empty word at end.
        if (currentLine.children.length == 0) {
            currentLine = this.lines[this.lines.length - 1];
            hPosition = currentLine.measuredWidth;
            vPosition = currentLine.measuredHeight;
        }
        if (firstLine === true) {
            currentLine.measuredWidth = hPosition;
            currentLine.measuredHeight = vPosition;
            currentLine.y = 0;
        }
        else {
            currentLine.measuredWidth = hPosition;
            currentLine.measuredHeight = vPosition;
            if (vPosition == 0) {
                if (this.lineHeight) {
                    vPosition = this.lineHeight;
                }
                else {
                    vPosition = currentStyle.size;
                }
            }
            currentLine.y = lineY + vPosition;
        }
        return true;
    };
    CharacterText.prototype.lineLayout = function () {
        // loop over lines
        // place into text
        var measuredHeight = 0;
        var line;
        var a = Align$1;
        var fnt = FontLoader.getFont(this.font);
        var len = this.lines.length;
        for (var i = 0; i < len; i++) {
            line = this.lines[i];
            //correct measuredWidth if last line character contains tracking
            if (line.lastCharacter()) {
                line.measuredWidth -= line.lastCharacter().trackingOffset();
            }
            if (this.original.line) {
                copyEventListeners(this.original.line, line);
            }
            measuredHeight += line.measuredHeight;
            if (this.align === a.TOP_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.TOP_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
            else if (this.align === a.MIDDLE_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.MIDDLE_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
            else if (this.align === a.BOTTOM_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.BOTTOM_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
        }
        //TOP ALIGNED
        if (this.align === a.TOP_LEFT ||
            this.align === a.TOP_CENTER ||
            this.align === a.TOP_RIGHT) {
            if (fnt.top == 0) {
                this.block.y = (this.lines[0].measuredHeight * fnt.ascent) / fnt.units;
            }
            else {
                this.block.y =
                    (this.lines[0].measuredHeight * fnt.ascent) / fnt.units +
                        (this.lines[0].measuredHeight * fnt.top) / fnt.units;
            }
            //MIDDLE ALIGNED
        }
        else if (this.align === a.MIDDLE_LEFT ||
            this.align === a.MIDDLE_CENTER ||
            this.align === a.MIDDLE_RIGHT) {
            this.block.y =
                this.lines[0].measuredHeight +
                    (this.height - measuredHeight) / 2 +
                    (this.lines[0].measuredHeight * fnt.middle) / fnt.units;
            //BOTTOM ALIGNED
        }
        else if (this.align === a.BOTTOM_LEFT ||
            this.align === a.BOTTOM_CENTER ||
            this.align === a.BOTTOM_RIGHT) {
            this.block.y =
                this.height -
                    this.lines[this.lines.length - 1].y +
                    (this.lines[0].measuredHeight * fnt.bottom) / fnt.units;
        }
        if (this.original.block) {
            copyEventListeners(this.original.block, this.block);
        }
    };
    return CharacterText;
}(TextContainer));

var Info = /** @class */ (function () {
    function Info() {
    }
    Info.VERSION = "0.10.0";
    Info.LICENSE = "BSD-2-Clause";
    return Info;
}());

var Word = /** @class */ (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.hasNewLine = false;
        _this.hasHyphen = false;
        _this.hasSpace = false;
        _this.spaceOffset = 0;
        return _this;
    }
    //CharacterText support
    Word.prototype.lastCharacter = function () {
        return this.children[this.children.length - 1];
    };
    return Word;
}(createjs.Container));

var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this) || this;
        _this.lineHeight = null;
        _this.width = 100;
        _this.height = 20;
        _this.align = Align$1.TOP_LEFT;
        _this.size = 12;
        _this.tracking = 0;
        _this.ligatures = false;
        _this.fillColor = "#000";
        _this.strokeColor = null;
        _this.strokeWidth = null;
        _this.loaderId = null;
        _this.debug = false;
        _this.words = [];
        _this.lines = [];
        _this.missingGlyphs = null;
        _this.renderCycle = true;
        if (props) {
            _this.original = props;
            _this.set(props);
        }
        _this.loadFonts();
        return _this;
    }
    Text.prototype.getBounds = function () {
        // TODO: obtain intersected bounds of the characters/words in here
        return new createjs.Rectangle(this.x, this.y, this.width, this.height);
    };
    Text.prototype.layout = function () {
        this.addAccessibility();
        this.text = this.text.replace(/([\n][ \t]+)/g, "\n");
        this.words = [];
        this.lines = [];
        this.missingGlyphs = null;
        // TODO - remove composite layout
        this.removeAllChildren();
        this.block = new createjs.Container();
        this.addChild(this.block);
        if (this.debug == true) {
            this.addDebugLayout();
        }
        if (this.text === "" || this.text === undefined) {
            this.render();
            this.complete();
            return;
        }
        if (this.characterLayout() === false) {
            this.removeAllChildren();
            return;
        }
        if (this.renderCycle === false) {
            this.removeAllChildren();
            this.complete();
            return;
        }
        this.wordLayout();
        this.lineLayout();
        this.render();
        this.complete();
    };
    /**
     * Draw baseline, ascent, ascender, and descender lines
     */
    Text.prototype.addDebugLayout = function () {
        var font = FontLoader.getFont(this.font);
        //outline
        var s = new createjs.Shape();
        s.graphics.beginStroke("#FF0000");
        s.graphics.setStrokeStyle(1.2);
        s.graphics.drawRect(0, 0, this.width, this.height);
        this.addChild(s);
        //baseline
        s = new createjs.Shape();
        s.graphics.beginFill("#000");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = 0;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#F00");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font["cap-height"] / font.units) * this.size;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#0F0");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font.ascent / font.units) * this.size;
        this.block.addChild(s);
        s = new createjs.Shape();
        s.graphics.beginFill("#00F");
        s.graphics.drawRect(0, 0, this.width, 0.2);
        s.x = 0;
        s.y = (-font.descent / font.units) * this.size;
        this.block.addChild(s);
    };
    //place characters in words
    Text.prototype.characterLayout = function () {
        //characterlayout adds Charcters to words and measures true height. LineHeight is not a factor til Line layout.
        //char layout
        var len = this.text.length;
        var char;
        var defaultStyle = {
            size: this.size,
            font: this.font,
            tracking: this.tracking,
            characterCase: this.characterCase,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        };
        var currentStyle = defaultStyle;
        var hPosition = 0;
        var vPosition = 0;
        var currentWord = new Word();
        // push a new word to capture characters
        this.words.push(currentWord);
        // loop over characters
        // place into words
        for (var i = 0; i < len; i++) {
            if (this.style !== null && this.style[i] !== undefined) {
                currentStyle = this.style[i];
                // make sure style contains properties needed.
                if (currentStyle.size === undefined)
                    currentStyle.size = defaultStyle.size;
                if (currentStyle.font === undefined)
                    currentStyle.font = defaultStyle.font;
                if (currentStyle.tracking === undefined)
                    currentStyle.tracking = defaultStyle.tracking;
                if (currentStyle.characterCase === undefined)
                    currentStyle.characterCase = defaultStyle.characterCase;
                if (currentStyle.fillColor === undefined)
                    currentStyle.fillColor = defaultStyle.fillColor;
                if (currentStyle.strokeColor === undefined)
                    currentStyle.strokeColor = defaultStyle.strokeColor;
                if (currentStyle.strokeWidth === undefined)
                    currentStyle.strokeWidth = defaultStyle.strokeWidth;
            }
            // newline
            // mark word as having newline
            // create new word
            // new line has no character
            if (this.text.charAt(i) == "\n") {
                //only if not last char
                if (i < len - 1) {
                    currentWord.measuredWidth = hPosition;
                    currentWord.measuredHeight = vPosition;
                    if (currentWord.measuredHeight == 0) {
                        currentWord.measuredHeight = currentStyle.size;
                    }
                    currentWord.hasNewLine = true;
                    currentWord = new Word();
                    this.words.push(currentWord);
                    vPosition = 0;
                    hPosition = 0;
                }
                continue;
            }
            //runtime test for font
            if (FontLoader.isLoaded(currentStyle.font) === false) {
                FontLoader.load(this, [currentStyle.font]);
                return false;
            }
            // create character
            char = new Character(this.text.charAt(i), currentStyle, i);
            if (this.original.character) {
                copyEventListeners(this.original.character, char);
            }
            if (char.missing) {
                if (this.missingGlyphs == null) {
                    this.missingGlyphs = [];
                }
                this.missingGlyphs.push({
                    position: i,
                    character: this.text.charAt(i),
                    font: currentStyle.font
                });
            }
            if (char.measuredHeight > vPosition) {
                vPosition = char.measuredHeight;
            }
            //swap character if ligature
            //ligatures removed if tracking or this.ligatures is false
            if (currentStyle.tracking == 0 && this.ligatures == true) {
                var ligTarget = this.text.substr(i, 4);
                i = i + this.ligatureSwap(char, ligTarget);
            }
            char.x = hPosition;
            // push character into word
            currentWord.addChild(char);
            // space
            // mark word as having space
            // create new word
            // space character
            if (this.text.charAt(i) == " ") {
                currentWord.hasSpace = true;
                currentWord.spaceOffset = char._glyph.offset * char.size;
                hPosition =
                    char.x +
                        char._glyph.offset * char.size +
                        char.characterCaseOffset +
                        char.trackingOffset() +
                        char._glyph.getKerning(this.text.charCodeAt(i + 1), char.size);
                currentWord.measuredWidth = hPosition;
                currentWord.measuredHeight = vPosition;
                hPosition = 0;
                vPosition = 0;
                currentWord = new Word();
                this.words.push(currentWord);
                continue;
            }
            // hyphen
            // mark word as having hyphen
            // create new word
            // space character
            if (this.text.charAt(i) == "-") {
                currentWord.hasHyphen = true;
            }
            hPosition =
                char.x +
                    char._glyph.offset * char.size +
                    char.characterCaseOffset +
                    char.trackingOffset() +
                    char._glyph.getKerning(this.text.charCodeAt(i + 1), char.size);
        }
        //case of empty word at end.
        if (currentWord.children.length == 0) {
            currentWord = this.words[this.words.length - 1];
            hPosition = currentWord.measuredWidth;
            vPosition = currentWord.measuredHeight;
        }
        currentWord.measuredWidth = hPosition;
        currentWord.measuredHeight = vPosition;
        return true;
    };
    //place words in lines
    Text.prototype.wordLayout = function () {
        // loop over words
        // place into lines
        var len = this.words.length;
        var currentLine = new Line();
        this.lines.push(currentLine);
        currentLine.y = 0;
        var currentWord;
        var lastHeight;
        this.block.addChild(currentLine);
        var hPosition = 0;
        var vPosition = 0;
        var firstLine = true;
        var lastLineWord;
        for (var i = 0; i < len; i++) {
            currentWord = this.words[i];
            currentWord.x = hPosition;
            if (this.original.word) {
                copyEventListeners(this.original.word, currentWord);
            }
            if (firstLine) {
                vPosition = currentWord.measuredHeight;
            }
            else if (this.lineHeight != null) {
                vPosition = this.lineHeight;
            }
            else if (currentWord.measuredHeight > vPosition) {
                vPosition = currentWord.measuredHeight;
            }
            //exceeds line width && has new line
            if (hPosition + currentWord.measuredWidth > this.width &&
                currentWord.hasNewLine == true &&
                currentLine.children.length > 0) {
                if (this.lineHeight != null) {
                    lastHeight = currentLine.y + this.lineHeight;
                }
                else {
                    lastHeight = currentLine.y + vPosition;
                }
                currentLine.measuredWidth = hPosition;
                lastLineWord = this.words[i - 1];
                if (lastLineWord != undefined && lastLineWord.hasSpace) {
                    currentLine.measuredWidth -= lastLineWord.spaceOffset;
                }
                if (firstLine == false && this.lineHeight != null) {
                    currentLine.measuredHeight = this.lineHeight;
                }
                else {
                    currentLine.measuredHeight = vPosition;
                }
                firstLine = false;
                currentLine = new Line();
                this.lines.push(currentLine);
                currentLine.y = lastHeight;
                hPosition = 0;
                currentWord.x = 0;
                this.block.addChild(currentLine);
                //add word
                var swapWord = this.words[i];
                currentLine.addChild(swapWord);
                if (this.lineHeight != null) {
                    currentLine.measuredHeight = this.lineHeight;
                }
                else {
                    currentLine.measuredHeight = swapWord.measuredHeight;
                }
                currentLine.measuredWidth = swapWord.measuredWidth;
                //add new line
                currentLine = new Line();
                this.lines.push(currentLine);
                if (this.lineHeight != null) {
                    currentLine.y = lastHeight + this.lineHeight;
                }
                else {
                    currentLine.y = lastHeight + vPosition;
                }
                this.block.addChild(currentLine);
                if (i < len - 1) {
                    vPosition = 0;
                }
                continue;
            }
            //wrap word to new line if length
            else if (hPosition + currentWord.measuredWidth > this.width &&
                i > 0 &&
                currentLine.children.length > 0) {
                if (this.lineHeight != null) {
                    lastHeight = currentLine.y + this.lineHeight;
                }
                else {
                    lastHeight = currentLine.y + vPosition;
                }
                currentLine.measuredWidth = hPosition;
                lastLineWord = this.words[i - 1];
                if (lastLineWord != undefined && lastLineWord.hasSpace) {
                    currentLine.measuredWidth -= lastLineWord.spaceOffset;
                }
                if (firstLine == false && this.lineHeight != null) {
                    currentLine.measuredHeight = this.lineHeight;
                }
                else {
                    currentLine.measuredHeight = vPosition;
                }
                firstLine = false;
                currentLine = new Line();
                this.lines.push(currentLine);
                currentLine.y = lastHeight;
                if (i < len - 1) {
                    vPosition = 0;
                }
                hPosition = 0;
                currentWord.x = hPosition;
                this.block.addChild(currentLine);
            }
            //wrap word to new line if newline
            else if (currentWord.hasNewLine == true) {
                if (this.lineHeight != null) {
                    lastHeight = currentLine.y + this.lineHeight;
                }
                else {
                    lastHeight = currentLine.y + vPosition;
                }
                currentLine.measuredWidth = hPosition + currentWord.measuredWidth;
                if (firstLine == false && this.lineHeight != null) {
                    currentLine.measuredHeight = this.lineHeight;
                }
                else {
                    currentLine.measuredHeight = vPosition;
                }
                currentLine.addChild(this.words[i]);
                firstLine = false;
                currentLine = new Line();
                this.lines.push(currentLine);
                currentLine.y = lastHeight;
                if (i < len - 1) {
                    vPosition = 0;
                }
                hPosition = 0;
                this.block.addChild(currentLine);
                continue;
            }
            hPosition = hPosition + currentWord.measuredWidth;
            currentLine.addChild(this.words[i]);
        }
        //case of empty word at end.
        if (currentLine.children.length == 0) {
            currentLine = this.lines[this.lines.length - 1];
        }
        currentLine.measuredWidth = hPosition;
        currentLine.measuredHeight = vPosition;
    };
    Text.prototype.lineLayout = function () {
        // loop over lines
        // place into text
        var measuredHeight = 0;
        var line;
        var a = Align$1;
        var fnt = FontLoader.getFont(this.font);
        var len = this.lines.length;
        for (var i = 0; i < len; i++) {
            line = this.lines[i];
            if (this.original.line) {
                copyEventListeners(this.original.line, line);
            }
            //correct measuredWidth if last line character contains tracking
            if (line.lastWord() != undefined && line.lastWord().lastCharacter()) {
                line.measuredWidth -= line
                    .lastWord()
                    .lastCharacter()
                    .trackingOffset();
            }
            measuredHeight += line.measuredHeight;
            if (this.align === a.TOP_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.TOP_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
            else if (this.align === a.MIDDLE_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.MIDDLE_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
            else if (this.align === a.BOTTOM_CENTER) {
                //move to center
                line.x = (this.width - line.measuredWidth) / 2;
            }
            else if (this.align === a.BOTTOM_RIGHT) {
                //move to right
                line.x = this.width - line.measuredWidth;
            }
        }
        //TOP ALIGNED
        if (this.align === a.TOP_LEFT ||
            this.align === a.TOP_CENTER ||
            this.align === a.TOP_RIGHT) {
            this.block.y =
                (this.lines[0].measuredHeight * fnt.ascent) / fnt.units +
                    (this.lines[0].measuredHeight * fnt.top) / fnt.units;
            //MIDDLE ALIGNED
        }
        else if (this.align === a.MIDDLE_LEFT ||
            this.align === a.MIDDLE_CENTER ||
            this.align === a.MIDDLE_RIGHT) {
            this.block.y =
                this.lines[0].measuredHeight +
                    (this.height - measuredHeight) / 2 +
                    (this.lines[0].measuredHeight * fnt.middle) / fnt.units;
            //BOTTOM ALIGNED
        }
        else if (this.align === a.BOTTOM_LEFT ||
            this.align === a.BOTTOM_CENTER ||
            this.align === a.BOTTOM_RIGHT) {
            this.block.y =
                this.height -
                    this.lines[this.lines.length - 1].y +
                    (this.lines[0].measuredHeight * fnt.bottom) / fnt.units;
        }
        if (this.original.block) {
            copyEventListeners(this.original.block, this.block);
        }
    };
    return Text;
}(TextContainer));

(function (PathFit) {
    PathFit[PathFit["Rainbow"] = 0] = "Rainbow";
    PathFit[PathFit["Stairstep"] = 1] = "Stairstep";
})(exports.PathFit || (exports.PathFit = {}));
(function (PathAlign) {
    PathAlign[PathAlign["Center"] = 0] = "Center";
    PathAlign[PathAlign["Right"] = 1] = "Right";
    PathAlign[PathAlign["Left"] = 2] = "Left";
})(exports.PathAlign || (exports.PathAlign = {}));
var Path = /** @class */ (function () {
    function Path(path, start, end, flipped, fit, align) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        if (flipped === void 0) { flipped = false; }
        if (fit === void 0) { fit = exports.PathFit.Rainbow; }
        if (align === void 0) { align = exports.PathAlign.Center; }
        this.pathElement = null;
        this.path = null;
        this.start = 0;
        this.center = null;
        this.end = null;
        this.angles = null;
        this.flipped = false;
        this.fit = exports.PathFit.Rainbow;
        this.align = exports.PathAlign.Center;
        this.length = null;
        this.realLength = null;
        this.closed = false;
        this.clockwise = true;
        this.path = path;
        this.start = start;
        this.align = align;
        this.end = end;
        this.flipped = flipped;
        this.fit = fit;
        this.update();
    }
    Path.prototype.update = function () {
        this.pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.pathElement.setAttributeNS(null, "d", this.path);
        this.length = this.pathElement.getTotalLength();
        this.closed = this.path.toLowerCase().indexOf("z") != -1;
        var pointlength = this.length / 10;
        var points = [];
        points.push(this.getRealPathPoint(0));
        points.push(this.getRealPathPoint(pointlength));
        points.push(this.getRealPathPoint(pointlength * 2));
        points.push(this.getRealPathPoint(pointlength * 3));
        points.push(this.getRealPathPoint(pointlength * 4));
        points.push(this.getRealPathPoint(pointlength * 5));
        points.push(this.getRealPathPoint(pointlength * 6));
        points.push(this.getRealPathPoint(pointlength * 7));
        points.push(this.getRealPathPoint(pointlength * 8));
        points.push(this.getRealPathPoint(pointlength * 9));
        points.push(this.getRealPathPoint(pointlength * 10));
        var clock = (points[1].x - points[0].x) * (points[1].y + points[0].y) +
            (points[2].x - points[1].x) * (points[2].y + points[1].y) +
            (points[3].x - points[2].x) * (points[3].y + points[2].y) +
            (points[4].x - points[3].x) * (points[4].y + points[3].y) +
            (points[5].x - points[4].x) * (points[5].y + points[4].y) +
            (points[6].x - points[5].x) * (points[6].y + points[5].y) +
            (points[7].x - points[6].x) * (points[7].y + points[6].y) +
            (points[8].x - points[7].x) * (points[8].y + points[7].y) +
            (points[9].x - points[8].x) * (points[9].y + points[8].y) +
            (points[10].x - points[9].x) * (points[10].y + points[9].y);
        if (clock > 0) {
            this.clockwise = false;
        }
        else {
            this.clockwise = true;
        }
        if (this.end == null) {
            this.end = this.length;
        }
        if (this.closed == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.start - this.realLength / 2;
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.start - this.realLength / 2;
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
        }
        else if (this.clockwise == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.end + this.realLength / 2;
                }
                else {
                    this.realLength = this.start + this.length - this.end;
                    this.center = this.end + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.end + this.length - this.start;
                    this.center = this.start + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
        }
        else {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.end + this.length - this.start;
                    this.center = this.start + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.end + this.realLength / 2;
                }
                else {
                    this.realLength = this.start + this.length - this.end;
                    this.center = this.end + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
            }
        }
    };
    Path.prototype.getRealPathPoint = function (distance) {
        if (distance > this.length) {
            return this.pathElement.getPointAtLength(distance - this.length);
        }
        else if (distance < 0) {
            return this.pathElement.getPointAtLength(distance + this.length);
        }
        else {
            return this.pathElement.getPointAtLength(distance);
        }
    };
    Path.prototype.getPathPoint = function (distance, characterLength, charOffset) {
        if (characterLength === void 0) { characterLength = 0; }
        if (charOffset === void 0) { charOffset = 0; }
        distance = distance * 0.99;
        characterLength = characterLength * 0.99;
        var point1;
        var point2;
        var position;
        var direction = true;
        var realStart = 0;
        if (this.closed == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart - distance;
                }
            }
        }
        else if (this.clockwise == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                        position = realStart - distance;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                        position = realStart - distance;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                        position = realStart - distance;
                    }
                    if (position < 0) {
                        position = position + this.length;
                    }
                    direction = false;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                        position = realStart + distance;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                        position = realStart + distance;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                        position = realStart + distance;
                    }
                    if (position > this.length) {
                        position = position - this.length;
                    }
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
            }
        }
        else {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                        position = realStart - distance;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                        position = realStart - distance;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                        position = realStart - distance;
                    }
                    if (position < 0) {
                        position = position + this.length;
                    }
                    direction = false;
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
                else {
                    if (this.align == exports.PathAlign.Left) {
                        realStart = this.start;
                        position = realStart + distance;
                    }
                    else if (this.align == exports.PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                        position = realStart + distance;
                    }
                    else if (this.align == exports.PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                        position = realStart + distance;
                    }
                    if (position > this.length) {
                        position = position - this.length;
                    }
                }
            }
        }
        point1 = this.getRealPathPoint(position);
        var segment = this.pathElement.pathSegList.getItem(this.pathElement.getPathSegAtLength(position)).pathSegType;
        if (segment == 4 &&
            !direction &&
            this.pathElement.getPathSegAtLength(position) !=
                this.pathElement.getPathSegAtLength(position - charOffset)) {
            var pp0 = this.getRealPathPoint(position);
            var pp1 = this.getRealPathPoint(position - charOffset);
            var ppc = this.pathElement.pathSegList.getItem(this.pathElement.getPathSegAtLength(position) - 1);
            var d0 = Math.sqrt(Math.pow(pp0.x - ppc["x"], 2) + Math.pow(pp0.y - ppc["y"], 2));
            var d1 = Math.sqrt(Math.pow(pp1.x - ppc["x"], 2) + Math.pow(pp1.y - ppc["y"], 2));
            if (d0 > d1) {
                point1 = pp0;
                point2 = { x: ppc["x"], y: ppc["y"] };
                var rot12_1 = (Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180) /
                    Math.PI;
                if (point1.x > point2.x) {
                    rot12_1 = rot12_1 + 180;
                }
                if (rot12_1 < 0) {
                    rot12_1 = rot12_1 + 360;
                }
                if (rot12_1 > 360) {
                    rot12_1 = rot12_1 - 360;
                }
                point1.rotation = rot12_1;
                return point1;
            }
            else {
                point1 = { x: ppc["x"], y: ppc["y"] };
                point1.offsetX = -d0;
                point1["next"] = true;
                return point1;
            }
        }
        if (direction) {
            point2 = this.getRealPathPoint(position + charOffset);
        }
        else {
            point2 = this.getRealPathPoint(position - charOffset);
        }
        var rot12 = (Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180) /
            Math.PI;
        if (point1.x > point2.x) {
            rot12 = rot12 + 180;
        }
        if (rot12 < 0) {
            rot12 = rot12 + 360;
        }
        if (rot12 > 360) {
            rot12 = rot12 - 360;
        }
        point1.rotation = rot12;
        return point1;
    };
    return Path;
}());

var VerticalAlign;
(function (VerticalAlign) {
    VerticalAlign[VerticalAlign["Top"] = 0] = "Top";
    VerticalAlign[VerticalAlign["CapHeight"] = 1] = "CapHeight";
    VerticalAlign[VerticalAlign["Center"] = 2] = "Center";
    VerticalAlign[VerticalAlign["BaseLine"] = 3] = "BaseLine";
    VerticalAlign[VerticalAlign["Bottom"] = 4] = "Bottom";
    VerticalAlign[VerticalAlign["XHeight"] = 5] = "XHeight";
    VerticalAlign[VerticalAlign["Ascent"] = 6] = "Ascent";
    VerticalAlign[VerticalAlign["Percent"] = 7] = "Percent";
})(VerticalAlign || (VerticalAlign = {}));
var VerticalAlign$1 = VerticalAlign;

var PathText = /** @class */ (function (_super) {
    __extends(PathText, _super);
    function PathText(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this) || this;
        _this.size = 12;
        _this.tracking = 0;
        _this.ligatures = false;
        _this.minSize = null;
        _this.maxTracking = null;
        _this.fillColor = "#000";
        _this.strokeColor = null;
        _this.strokeWidth = null;
        _this.debug = false;
        _this.original = null;
        _this.autoExpand = false;
        _this.autoReduce = false;
        _this.overset = false;
        _this.oversetIndex = null;
        _this.pathPoints = null;
        _this.path = "";
        _this.start = 0;
        _this.end = null;
        _this.flipped = false;
        _this.fit = exports.PathFit.Rainbow;
        _this.align = exports.PathAlign.Center;
        _this.valign = VerticalAlign$1.BaseLine;
        _this.missingGlyphs = null;
        _this.renderCycle = true;
        _this.valignPercent = 1;
        _this.initialTracking = 0;
        _this.initialOffset = 0;
        _this.measured = false;
        _this.oversetPotential = false;
        if (props) {
            _this.original = props;
            _this.set(props);
            _this.original.tracking = _this.tracking;
        }
        _this.loadFonts();
        _this.pathPoints = new Path(_this.path, _this.start, _this.end, _this.flipped, _this.fit, _this.align);
        return _this;
    }
    PathText.prototype.setPath = function (path) {
        this.path = path;
        this.pathPoints.path = this.path;
        this.pathPoints.update();
    };
    PathText.prototype.setStart = function (start) {
        this.start = start;
        this.pathPoints.start = this.start;
        this.pathPoints.update();
    };
    PathText.prototype.setEnd = function (end) {
        this.end = end;
        this.pathPoints.end = this.end;
        this.pathPoints.update();
    };
    PathText.prototype.setFlipped = function (flipped) {
        this.flipped = flipped;
        this.pathPoints.flipped = this.flipped;
        this.pathPoints.update();
    };
    PathText.prototype.setFit = function (fit) {
        if (fit === void 0) { fit = exports.PathFit.Rainbow; }
        this.fit = fit;
        this.pathPoints.fit = this.fit;
        this.pathPoints.update();
    };
    PathText.prototype.setAlign = function (align) {
        if (align === void 0) { align = exports.PathAlign.Center; }
        this.align = align;
        this.pathPoints.align = this.align;
        this.pathPoints.update();
    };
    PathText.prototype.getWidth = function () {
        return this.pathPoints.realLength;
    };
    PathText.prototype.layout = function () {
        this.addAccessibility();
        this.overset = false;
        this.oversetIndex = null;
        this.removeAllChildren();
        this.characters = [];
        this.missingGlyphs = null;
        this.measured = false;
        this.oversetPotential = false;
        if (this.debug == true) {
            this.addDebugLayout();
        }
        if (this.text === "" || this.text === undefined) {
            this.render();
            return;
        }
        this.block = new createjs.Container();
        this.addChild(this.block);
        if (this.autoExpand === true || this.autoReduce === true) {
            if (this.measure() === false) {
                this.removeAllChildren();
                return;
            }
        }
        if (this.renderCycle === false) {
            this.removeAllChildren();
            this.complete();
            return;
        }
        if (this.characterLayout() === false) {
            this.removeAllChildren();
            return;
        }
        this.render();
        this.complete();
    };
    PathText.prototype.addDebugLayout = function () {
        var s = new createjs.Shape();
        s.graphics.beginStroke("#FF0000");
        s.graphics.setStrokeStyle(0.1);
        s.graphics.decodeSVGPath(this.path);
        s.graphics.endFill();
        s.graphics.endStroke();
        this.addChild(s);
        s = new createjs.Shape();
        var pp = this.pathPoints.getRealPathPoint(0);
        s.x = pp.x;
        s.y = pp.y;
        s.graphics.beginFill("black");
        s.graphics.drawCircle(0, 0, 2);
        this.addChild(s);
        s = new createjs.Shape();
        pp = this.pathPoints.getRealPathPoint(this.pathPoints.start);
        s.x = pp.x;
        s.y = pp.y;
        s.graphics.beginFill("green");
        s.graphics.drawCircle(0, 0, 2);
        this.addChild(s);
        s = new createjs.Shape();
        pp = this.pathPoints.getRealPathPoint(this.pathPoints.end);
        s.x = pp.x;
        s.y = pp.y;
        s.graphics.beginFill("red");
        s.graphics.drawCircle(0, 0, 2);
        this.addChild(s);
        s = new createjs.Shape();
        pp = this.pathPoints.getRealPathPoint(this.pathPoints.center);
        s.x = pp.x;
        s.y = pp.y;
        s.graphics.beginFill("blue");
        s.graphics.drawCircle(0, 0, 2);
        this.addChild(s);
    };
    PathText.prototype.measure = function () {
        this.measured = true;
        //Extract orgin sizing from this.original to preserve
        //metrics. autoMeasure will change style properties
        //directly. Change this.original to rerender.
        var len = this.text.length;
        var width = this.getWidth();
        var defaultStyle = {
            size: this.original.size,
            font: this.original.font,
            tracking: this.original.tracking,
            characterCase: this.original.characterCase
        };
        var currentStyle;
        var charCode = null;
        var font;
        var charMetrics = [];
        var largestFontSize = defaultStyle.size;
        for (var i = 0; i < len; i++) {
            charCode = this.text.charCodeAt(i);
            currentStyle = defaultStyle;
            if (this.original.style !== undefined &&
                this.original.style[i] !== undefined) {
                currentStyle = this.original.style[i];
                // make sure style contains properties needed.
                if (currentStyle.size === undefined)
                    currentStyle.size = defaultStyle.size;
                if (currentStyle.font === undefined)
                    currentStyle.font = defaultStyle.font;
                if (currentStyle.tracking === undefined)
                    currentStyle.tracking = defaultStyle.tracking;
            }
            if (currentStyle.size > largestFontSize) {
                largestFontSize = currentStyle.size;
            }
            font = FontLoader.fonts[currentStyle.font];
            charMetrics.push({
                char: this.text[i],
                size: currentStyle.size,
                charCode: charCode,
                font: currentStyle.font,
                offset: font.glyphs[charCode].offset,
                units: font.units,
                tracking: this.trackingOffset(currentStyle.tracking, currentStyle.size, font.units),
                kerning: font.glyphs[charCode].getKerning(this.getCharCodeAt(i + 1), 1)
            });
        }
        //save space char using last known width/height
        var space = {
            char: " ",
            size: currentStyle.size,
            charCode: 32,
            font: currentStyle.font,
            offset: font.glyphs[32].offset,
            units: font.units,
            tracking: 0,
            kerning: 0
        };
        charMetrics[charMetrics.length - 1].tracking = 0;
        //charMetrics[ charMetrics.length-1 ].kerning=0;
        len = charMetrics.length;
        //measured without size
        var metricBaseWidth = 0;
        //measured at size
        var metricRealWidth = 0;
        //measured at size with tracking
        var metricRealWidthTracking = 0;
        var current = null;
        for (var i = 0; i < len; i++) {
            current = charMetrics[i];
            metricBaseWidth = metricBaseWidth + current.offset + current.kerning;
            metricRealWidth =
                metricRealWidth + (current.offset + current.kerning) * current.size;
            metricRealWidthTracking =
                metricRealWidthTracking +
                    (current.offset + current.kerning + current.tracking) * current.size;
        }
        //size cases
        if (metricRealWidth > width) {
            if (this.autoReduce === true) {
                this.tracking = 0;
                this.size =
                    (this.original.size * width) /
                        (metricRealWidth + space.offset * space.size);
                if (this.minSize != null && this.size < this.minSize) {
                    this.size = this.minSize;
                    if (this.renderCycle === false) {
                        this.overset = true;
                    }
                    else {
                        this.oversetPotential = true;
                    }
                }
                return true;
            }
            //tracking cases
        }
        else {
            var trackMetric = this.offsetTracking((width - metricRealWidth) / len, current.size, current.units);
            if (trackMetric < 0) {
                trackMetric = 0;
            }
            //autoexpand case
            if (trackMetric > this.original.tracking && this.autoExpand) {
                if (this.maxTracking != null && trackMetric > this.maxTracking) {
                    this.tracking = this.maxTracking;
                }
                else {
                    this.tracking = trackMetric;
                }
                this.size = this.original.size;
                return true;
            }
            //autoreduce tracking case
            if (trackMetric < this.original.tracking && this.autoReduce) {
                if (this.maxTracking != null && trackMetric > this.maxTracking) {
                    this.tracking = this.maxTracking;
                }
                else {
                    this.tracking = trackMetric;
                }
                this.size = this.original.size;
                return true;
            }
        }
        return true;
    };
    //place characters in words
    PathText.prototype.characterLayout = function () {
        //char layout
        var len = this.text.length;
        var char;
        var defaultStyle = {
            size: this.size,
            font: this.font,
            tracking: this.tracking,
            characterCase: this.characterCase,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        };
        var currentStyle = defaultStyle;
        var hPosition = 0;
        // loop over characters
        // place into lines
        for (var i = 0; i < len; i++) {
            if (this.style !== null && this.style[i] !== undefined) {
                currentStyle = this.style[i];
                // make sure style contains properties needed.
                if (currentStyle.size === undefined)
                    currentStyle.size = defaultStyle.size;
                if (currentStyle.font === undefined)
                    currentStyle.font = defaultStyle.font;
                if (currentStyle.tracking === undefined)
                    currentStyle.tracking = defaultStyle.tracking;
                if (currentStyle.characterCase === undefined)
                    currentStyle.characterCase = defaultStyle.characterCase;
                if (currentStyle.fillColor === undefined)
                    currentStyle.fillColor = defaultStyle.fillColor;
                if (currentStyle.strokeColor === undefined)
                    currentStyle.strokeColor = defaultStyle.strokeColor;
                if (currentStyle.strokeWidth === undefined)
                    currentStyle.strokeWidth = defaultStyle.strokeWidth;
            }
            // newline
            if (this.text.charAt(i) == "\n") {
                continue;
            }
            //runtime test for font
            if (FontLoader.isLoaded(currentStyle.font) === false) {
                FontLoader.load(this, [currentStyle.font]);
                return false;
            }
            //initalize with initialTracking and initialOffset;
            if (hPosition == 0) {
                hPosition =
                    this.initialOffset +
                        this.trackingOffset(this.initialTracking, currentStyle.size, FontLoader.getFont(currentStyle.font).units);
            }
            // create character
            char = new Character(this.text.charAt(i), currentStyle, i);
            if (this.original.character) {
                copyEventListeners(this.original.character, char);
            }
            if (char.missing) {
                if (this.missingGlyphs == null) {
                    this.missingGlyphs = [];
                }
                this.missingGlyphs.push({
                    position: i,
                    character: this.text.charAt(i),
                    font: currentStyle.font
                });
            }
            //swap character if ligature
            //ligatures removed if tracking or this.ligatures is false
            if (currentStyle.tracking == 0 && this.ligatures == true) {
                //1 char match
                var ligTarget = this.text.substr(i, 4);
                if (char._font.ligatures[ligTarget.charAt(0)]) {
                    //2 char match
                    if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)]) {
                        //3 char match
                        if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)]) {
                            //4 char match
                            if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)]) {
                                //swap 4 char ligature
                                char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)].glyph);
                                i = i + 3;
                            }
                            else {
                                //swap 3 char ligature
                                char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)].glyph);
                                i = i + 2;
                            }
                        }
                        else {
                            //swap 2 char ligature
                            char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)]
                                .glyph);
                            i = i + 1;
                        }
                    }
                }
            }
            //char.hPosition = hPosition;
            // push character into block
            //this.characters.push( char );
            //this.block.addChild( char );
            if (this.overset == true) {
                break;
            }
            else if (this.measured == true &&
                hPosition + char.measuredWidth > this.getWidth() &&
                this.oversetPotential == true) {
                //char.hPosition = hPosition;
                //this.characters.push( char );
                //this.block.addChild( char );
                //this.block.removeChild(this.characters.pop() );
                this.oversetIndex = i;
                this.overset = true;
                break;
            }
            else if (this.measured == false &&
                hPosition + char.measuredWidth > this.getWidth()) {
                //char.hPosition = hPosition;
                //this.characters.push( char );
                //this.block.addChild( char );
                //this.block.removeChild(this.characters.pop() );
                this.oversetIndex = i;
                this.overset = true;
                break;
            }
            else {
                char.hPosition = hPosition;
                this.characters.push(char);
                this.block.addChild(char);
            }
            //char.x = hPosition;
            hPosition =
                hPosition +
                    char._glyph.offset * char.size +
                    char.characterCaseOffset +
                    char.trackingOffset() +
                    char._glyph.getKerning(this.getCharCodeAt(i + 1), char.size);
        }
        len = this.characters.length;
        var pathPoint;
        var nextRotation = false;
        for (var i = 0; i < len; i++) {
            char = this.characters[i];
            pathPoint = this.pathPoints.getPathPoint(char.hPosition, hPosition, char._glyph.offset * char.size);
            //correct rotation around linesegments
            if (nextRotation == true) {
                this.characters[i - 1].parent.rotation = pathPoint.rotation;
                nextRotation = false;
            }
            if (pathPoint.next == true) {
                nextRotation = true;
            }
            char.rotation = pathPoint.rotation;
            //Baseline
            if (this.valign == VerticalAlign$1.BaseLine) {
                char.x = pathPoint.x;
                char.y = pathPoint.y;
                //reparent child into offset container
                if (pathPoint.offsetX) {
                    var offsetChild = new createjs.Container();
                    offsetChild.x = pathPoint.x;
                    offsetChild.y = pathPoint.y;
                    offsetChild.rotation = pathPoint.rotation;
                    char.parent.removeChild(char);
                    offsetChild.addChild(char);
                    char.x = pathPoint.offsetX;
                    char.y = 0;
                    char.rotation = 0;
                    this.addChild(offsetChild);
                }
                else {
                    char.x = pathPoint.x;
                    char.y = pathPoint.y;
                    char.rotation = pathPoint.rotation;
                }
            }
            else {
                var offsetChild = new createjs.Container();
                offsetChild.x = pathPoint.x;
                offsetChild.y = pathPoint.y;
                offsetChild.rotation = pathPoint.rotation;
                char.parent.removeChild(char);
                offsetChild.addChild(char);
                char.x = 0;
                //vertical alignment
                if (this.valign == VerticalAlign$1.Top) {
                    char.y = char.size;
                }
                else if (this.valign == VerticalAlign$1.Bottom) {
                    char.y = (char._font.descent / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign$1.CapHeight) {
                    char.y = (char._font["cap-height"] / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign$1.XHeight) {
                    char.y = (char._font["x-height"] / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign$1.Ascent) {
                    char.y = (char._font.ascent / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign$1.Center) {
                    char.y =
                        ((char._font["cap-height"] / char._font.units) * char.size) / 2;
                }
                else if (this.valign == VerticalAlign$1.Percent) {
                    char.y = this.valignPercent * char.size;
                }
                else {
                    char.y = 0;
                }
                char.rotation = 0;
                this.addChild(offsetChild);
            }
        }
        if (this.original.block) {
            copyEventListeners(this.original.block, this.block);
        }
        return true;
    };
    PathText.prototype.trackingOffset = function (tracking, size, units) {
        return size * (2.5 / units + 1 / 900 + tracking / 990);
    };
    PathText.prototype.offsetTracking = function (offset, size, units) {
        return Math.floor(((offset - 2.5 / units - 1 / 900) * 990) / size);
    };
    return PathText;
}(TextContainer));

var Util = {
    copyEventListeners: copyEventListeners
};

exports.Accessibility = Accessibility;
exports.Align = Align$1;
exports.Case = Case$1;
exports.Character = Character;
exports.CharacterText = CharacterText;
exports.Font = Font;
exports.FontLoader = FontLoader;
exports.Glyph = Glyph;
exports.Graphics = Graphics;
exports.Info = Info;
exports.Line = Line;
exports.Path = Path;
exports.PathText = PathText;
exports.Text = Text;
exports.Util = Util;
exports.VerticalAlign = VerticalAlign$1;
exports.Word = Word;
//# sourceMappingURL=txt.cjs.js.map
