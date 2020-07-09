var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import TextContainer from "./TextContainer";
import Align from "./Align";
import FontLoader from "./FontLoader";
import Character from "./Character";
import Line from "./Line";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";
var SPACE_CHAR_CODE = 32;
var CharacterText = /** @class */ (function (_super) {
    __extends(CharacterText, _super);
    function CharacterText(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this) || this;
        _this.lineHeight = null;
        _this.width = 100;
        _this.height = 20;
        _this.align = Align.TOP_LEFT;
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
                applyShapeEventListeners(this.original.character, char);
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
        var a = Align;
        var fnt = FontLoader.getFont(this.font);
        var len = this.lines.length;
        for (var i = 0; i < len; i++) {
            line = this.lines[i];
            //correct measuredWidth if last line character contains tracking
            if (line.lastCharacter()) {
                line.measuredWidth -= line.lastCharacter().trackingOffset();
            }
            if (this.original.line) {
                applyShapeEventListeners(this.original.line, line);
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
            applyShapeEventListeners(this.original.block, this.block);
        }
    };
    return CharacterText;
}(TextContainer));
export default CharacterText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGFyYWN0ZXJUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBR3RDLE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLElBQUksTUFBTSxRQUFRLENBQUM7QUFDMUIsT0FBTyx3QkFBd0IsTUFBTSxxQ0FBcUMsQ0FBQztBQUUzRSxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFM0I7SUFBMkMsaUNBQWE7SUEyQnRELHVCQUFZLEtBQTBCO1FBQTFCLHNCQUFBLEVBQUEsWUFBMEI7UUFBdEMsWUFDRSxpQkFBTyxTQVFSO1FBbkNELGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBQzFCLFdBQUssR0FBRyxHQUFHLENBQUM7UUFDWixZQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osV0FBSyxHQUFXLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsVUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVC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LEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElB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QUFRLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFqbUJELENBQTJDLGFBQWEsR0FpbUJ2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0Q29udGFpbmVyIGZyb20gXCIuL1RleHRDb250YWluZXJcIjtcbmltcG9ydCBBbGlnbiBmcm9tIFwiLi9BbGlnblwiO1xuaW1wb3J0IEZvbnRMb2FkZXIgZnJvbSBcIi4vRm9udExvYWRlclwiO1xuaW1wb3J0IHsgQ29uc3RydWN0T2JqLCBTdHlsZSB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcbmltcG9ydCBGb250IGZyb20gXCIuL0ZvbnRcIjtcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vQ2hhcmFjdGVyXCI7XG5pbXBvcnQgTGluZSBmcm9tIFwiLi9MaW5lXCI7XG5pbXBvcnQgYXBwbHlTaGFwZUV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL3V0aWxzL2FwcGx5LXNoYXBlLWV2ZW50LWxpc3RlbmVyc1wiO1xuXG5jb25zdCBTUEFDRV9DSEFSX0NPREUgPSAzMjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVGV4dCBleHRlbmRzIFRleHRDb250YWluZXIge1xuICBsaW5lSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICB3aWR0aCA9IDEwMDtcbiAgaGVpZ2h0ID0gMjA7XG4gIGFsaWduOiBudW1iZXIgPSBBbGlnbi5UT1BfTEVGVDtcbiAgc2l6ZSA9IDEyO1xuICBtaW5TaXplOiBudW1iZXIgPSBudWxsO1xuICBtYXhUcmFja2luZzogbnVtYmVyID0gbnVsbDtcbiAgdHJhY2tpbmcgPSAwO1xuICBsaWdhdHVyZXMgPSBmYWxzZTtcbiAgZmlsbENvbG9yID0gXCIjMDAwXCI7XG4gIHN0cm9rZUNvbG9yOiBzdHJpbmcgPSBudWxsO1xuICBzdHJva2VXaWR0aDogbnVtYmVyID0gbnVsbDtcbiAgc2luZ2xlTGluZSA9IGZhbHNlO1xuICBhdXRvRXhwYW5kID0gZmFsc2U7XG4gIGF1dG9SZWR1Y2UgPSBmYWxzZTtcbiAgb3ZlcnNldCA9IGZhbHNlO1xuICBvdmVyc2V0SW5kZXg6IG51bWJlciA9IG51bGw7XG4gIGxvYWRlcklkOiBudW1iZXIgPSBudWxsO1xuICBkZWJ1ZyA9IGZhbHNlO1xuICBsaW5lczogTGluZVtdID0gW107XG4gIGJsb2NrOiBjcmVhdGVqcy5Db250YWluZXI7XG4gIG1pc3NpbmdHbHlwaHM6IGFueVtdID0gbnVsbDtcbiAgcmVuZGVyQ3ljbGUgPSB0cnVlO1xuICBtZWFzdXJlZCA9IGZhbHNlO1xuICBvdmVyc2V0UG90ZW50aWFsID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IENvbnN0cnVjdE9iaiA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsID0gcHJvcHM7XG4gICAgICB0aGlzLnNldChwcm9wcyk7XG4gICAgICB0aGlzLm9yaWdpbmFsLnRyYWNraW5nID0gdGhpcy50cmFja2luZztcbiAgICB9XG4gICAgdGhpcy5sb2FkRm9udHMoKTtcbiAgfVxuXG4gIC8vbGF5b3V0IHRleHRcbiAgbGF5b3V0KCkge1xuICAgIHRoaXMuYWRkQWNjZXNzaWJpbGl0eSgpO1xuXG4gICAgdGhpcy5vdmVyc2V0ID0gZmFsc2U7XG4gICAgdGhpcy5tZWFzdXJlZCA9IGZhbHNlO1xuICAgIHRoaXMub3ZlcnNldFBvdGVudGlhbCA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMub3JpZ2luYWwuc2l6ZSkge1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5vcmlnaW5hbC5zaXplO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcmlnaW5hbC50cmFja2luZykge1xuICAgICAgdGhpcy50cmFja2luZyA9IHRoaXMub3JpZ2luYWwudHJhY2tpbmc7XG4gICAgfVxuICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKC8oW1xcbl1bIFxcdF0rKS9nLCBcIlxcblwiKTtcblxuICAgIGlmICh0aGlzLnNpbmdsZUxpbmUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dC5zcGxpdChcIlxcblwiKS5qb2luKFwiXCIpO1xuICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0LnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgdGhpcy5saW5lcyA9IFtdO1xuICAgIHRoaXMubWlzc2luZ0dseXBocyA9IG51bGw7XG4gICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgaWYgKHRoaXMudGV4dCA9PT0gXCJcIiB8fCB0aGlzLnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5ibG9jayk7XG5cbiAgICBpZiAodGhpcy5kZWJ1ZyA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFkZERlYnVnTGF5b3V0KCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuc2luZ2xlTGluZSA9PT0gdHJ1ZSAmJlxuICAgICAgKHRoaXMuYXV0b0V4cGFuZCA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9SZWR1Y2UgPT09IHRydWUpXG4gICAgKSB7XG4gICAgICB0aGlzLm1lYXN1cmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZW5kZXJDeWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFyYWN0ZXJMYXlvdXQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5saW5lTGF5b3V0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBiYXNlbGluZSwgYXNjZW50LCBhc2NlbmRlciwgYW5kIGRlc2NlbmRlciBsaW5lc1xuICAgKi9cbiAgcHJpdmF0ZSBhZGREZWJ1Z0xheW91dCgpIHtcbiAgICBjb25zdCBmb250OiBGb250ID0gRm9udExvYWRlci5nZXRGb250KHRoaXMuZm9udCk7XG4gICAgLy9vdXRsaW5lXG4gICAgbGV0IHMgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBzLmdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiI0ZGMDAwMFwiKTtcbiAgICBzLmdyYXBoaWNzLnNldFN0cm9rZVN0eWxlKDEuMik7XG4gICAgcy5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5hZGRDaGlsZChzKTtcbiAgICAvL2Jhc2VsaW5lXG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzAwMFwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIHRoaXMud2lkdGgsIDAuMik7XG4gICAgcy54ID0gMDtcbiAgICBzLnkgPSAwO1xuICAgIHRoaXMuYmxvY2suYWRkQ2hpbGQocyk7XG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI0YwMFwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIHRoaXMud2lkdGgsIDAuMik7XG4gICAgcy54ID0gMDtcbiAgICBzLnkgPSAoLWZvbnRbXCJjYXAtaGVpZ2h0XCJdIC8gZm9udC51bml0cykgKiB0aGlzLnNpemU7XG4gICAgdGhpcy5ibG9jay5hZGRDaGlsZChzKTtcbiAgICBzID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgcy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMEYwXCIpO1xuICAgIHMuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgdGhpcy53aWR0aCwgMC4yKTtcbiAgICBzLnggPSAwO1xuICAgIHMueSA9ICgtZm9udC5hc2NlbnQgLyBmb250LnVuaXRzKSAqIHRoaXMuc2l6ZTtcbiAgICB0aGlzLmJsb2NrLmFkZENoaWxkKHMpO1xuICAgIHMgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBzLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMwMEZcIik7XG4gICAgcy5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB0aGlzLndpZHRoLCAwLjIpO1xuICAgIHMueCA9IDA7XG4gICAgcy55ID0gKC1mb250LmRlc2NlbnQgLyBmb250LnVuaXRzKSAqIHRoaXMuc2l6ZTtcbiAgICB0aGlzLmJsb2NrLmFkZENoaWxkKHMpO1xuICB9XG5cbiAgbWVhc3VyZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLm1lYXN1cmVkID0gdHJ1ZTtcbiAgICAvL0V4dHJhY3Qgb3JpZ2luIHNpemluZyBmcm9tIHRoaXMub3JpZ2luYWwgdG8gcHJlc2VydmVcbiAgICAvL21ldHJpY3MuIGF1dG9NZWFzdXJlIHdpbGwgY2hhbmdlIHN0eWxlIHByb3BlcnRpZXNcbiAgICAvL2RpcmVjdGx5LiBDaGFuZ2UgdGhpcy5vcmlnaW5hbCB0byByZS1yZW5kZXIuXG5cbiAgICBsZXQgbGVuID0gdGhpcy50ZXh0Lmxlbmd0aDtcbiAgICBjb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICBzaXplOiB0aGlzLm9yaWdpbmFsLnNpemUsXG4gICAgICBmb250OiB0aGlzLm9yaWdpbmFsLmZvbnQsXG4gICAgICB0cmFja2luZzogdGhpcy5vcmlnaW5hbC50cmFja2luZyxcbiAgICAgIGNoYXJhY3RlckNhc2U6IHRoaXMub3JpZ2luYWwuY2hhcmFjdGVyQ2FzZVxuICAgIH07XG4gICAgbGV0IGN1cnJlbnRTdHlsZTogYW55O1xuICAgIGxldCBjaGFyQ29kZTogbnVtYmVyID0gbnVsbDtcbiAgICBsZXQgZm9udDogRm9udDtcbiAgICBjb25zdCBjaGFyTWV0cmljcyA9IFtdO1xuICAgIGxldCBsYXJnZXN0Rm9udFNpemUgPSBkZWZhdWx0U3R5bGUuc2l6ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjaGFyQ29kZSA9IHRoaXMudGV4dC5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICBjdXJyZW50U3R5bGUgPSBkZWZhdWx0U3R5bGU7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3JpZ2luYWwuc3R5bGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0aGlzLm9yaWdpbmFsLnN0eWxlW2ldICE9PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50U3R5bGUgPSB0aGlzLm9yaWdpbmFsLnN0eWxlW2ldO1xuICAgICAgICAvLyBtYWtlIHN1cmUgc3R5bGUgY29udGFpbnMgcHJvcGVydGllcyBuZWVkZWQuXG4gICAgICAgIGlmIChjdXJyZW50U3R5bGUuc2l6ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5zaXplID0gZGVmYXVsdFN0eWxlLnNpemU7XG4gICAgICAgIGlmIChjdXJyZW50U3R5bGUuZm9udCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5mb250ID0gZGVmYXVsdFN0eWxlLmZvbnQ7XG4gICAgICAgIGlmIChjdXJyZW50U3R5bGUudHJhY2tpbmcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUudHJhY2tpbmcgPSBkZWZhdWx0U3R5bGUudHJhY2tpbmc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0eWxlLnNpemUgPiBsYXJnZXN0Rm9udFNpemUpIHtcbiAgICAgICAgbGFyZ2VzdEZvbnRTaXplID0gY3VycmVudFN0eWxlLnNpemU7XG4gICAgICB9XG4gICAgICBmb250ID0gRm9udExvYWRlci5mb250c1tjdXJyZW50U3R5bGUuZm9udF07XG5cbiAgICAgIGNoYXJNZXRyaWNzLnB1c2goe1xuICAgICAgICBjaGFyOiB0aGlzLnRleHRbaV0sXG4gICAgICAgIHNpemU6IGN1cnJlbnRTdHlsZS5zaXplLFxuICAgICAgICBjaGFyQ29kZTogY2hhckNvZGUsXG4gICAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250LFxuICAgICAgICBvZmZzZXQ6IGZvbnQuZ2x5cGhzW2NoYXJDb2RlXS5vZmZzZXQsXG4gICAgICAgIHVuaXRzOiBmb250LnVuaXRzLFxuICAgICAgICB0cmFja2luZzogdGhpcy50cmFja2luZ09mZnNldChcbiAgICAgICAgICBjdXJyZW50U3R5bGUudHJhY2tpbmcsXG4gICAgICAgICAgY3VycmVudFN0eWxlLnNpemUsXG4gICAgICAgICAgZm9udC51bml0c1xuICAgICAgICApLFxuICAgICAgICBrZXJuaW5nOiBmb250LmdseXBoc1tjaGFyQ29kZV0uZ2V0S2VybmluZyh0aGlzLmdldENoYXJDb2RlQXQoaSArIDEpLCAxKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9zYXZlIHNwYWNlIGNoYXIgdXNpbmcgbGFzdCBrbm93biB3aWR0aC9oZWlnaHRcbiAgICBjb25zdCBzcGFjZTogYW55ID0ge1xuICAgICAgY2hhcjogXCIgXCIsXG4gICAgICBzaXplOiBjdXJyZW50U3R5bGUuc2l6ZSxcbiAgICAgIGNoYXJDb2RlOiAzMixcbiAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250LFxuICAgICAgb2Zmc2V0OiBmb250LmdseXBoc1szMl0ub2Zmc2V0LFxuICAgICAgdW5pdHM6IGZvbnQudW5pdHMsXG4gICAgICB0cmFja2luZzogMCxcbiAgICAgIGtlcm5pbmc6IDBcbiAgICB9O1xuXG4gICAgY2hhck1ldHJpY3NbY2hhck1ldHJpY3MubGVuZ3RoIC0gMV0udHJhY2tpbmcgPSAwO1xuICAgIC8vY2hhck1ldHJpY3NbIGNoYXJNZXRyaWNzLmxlbmd0aC0xIF0ua2VybmluZz0wO1xuXG4gICAgbGVuID0gY2hhck1ldHJpY3MubGVuZ3RoO1xuXG4gICAgLy9tZWFzdXJlZCB3aXRob3V0IHNpemVcbiAgICBsZXQgbWV0cmljQmFzZVdpZHRoID0gMDtcbiAgICAvL21lYXN1cmVkIGF0IHNpemVcbiAgICBsZXQgbWV0cmljUmVhbFdpZHRoID0gMDtcbiAgICAvL21lYXN1cmVkIGF0IHNpemUgd2l0aCB0cmFja2luZ1xuICAgIGxldCBtZXRyaWNSZWFsV2lkdGhUcmFja2luZyA9IDA7XG5cbiAgICBsZXQgY3VycmVudCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY3VycmVudCA9IGNoYXJNZXRyaWNzW2ldO1xuICAgICAgbWV0cmljQmFzZVdpZHRoID0gbWV0cmljQmFzZVdpZHRoICsgY3VycmVudC5vZmZzZXQgKyBjdXJyZW50Lmtlcm5pbmc7XG4gICAgICBtZXRyaWNSZWFsV2lkdGggPVxuICAgICAgICBtZXRyaWNSZWFsV2lkdGggKyAoY3VycmVudC5vZmZzZXQgKyBjdXJyZW50Lmtlcm5pbmcpICogY3VycmVudC5zaXplO1xuICAgICAgbWV0cmljUmVhbFdpZHRoVHJhY2tpbmcgPVxuICAgICAgICBtZXRyaWNSZWFsV2lkdGhUcmFja2luZyArXG4gICAgICAgIChjdXJyZW50Lm9mZnNldCArIGN1cnJlbnQua2VybmluZyArIGN1cnJlbnQudHJhY2tpbmcpICogY3VycmVudC5zaXplO1xuICAgIH1cblxuICAgIC8vc2l6ZSBjYXNlc1xuICAgIGlmIChtZXRyaWNSZWFsV2lkdGggPiB0aGlzLndpZHRoKSB7XG4gICAgICBpZiAodGhpcy5hdXRvUmVkdWNlID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMudHJhY2tpbmcgPSAwO1xuICAgICAgICB0aGlzLnNpemUgPVxuICAgICAgICAgICh0aGlzLm9yaWdpbmFsLnNpemUgKiB0aGlzLndpZHRoKSAvXG4gICAgICAgICAgKG1ldHJpY1JlYWxXaWR0aCArIHNwYWNlLm9mZnNldCAqIHNwYWNlLnNpemUpO1xuICAgICAgICBpZiAodGhpcy5taW5TaXplICE9IG51bGwgJiYgdGhpcy5zaXplIDwgdGhpcy5taW5TaXplKSB7XG4gICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5taW5TaXplO1xuICAgICAgICAgIHRoaXMub3ZlcnNldFBvdGVudGlhbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvL3RyYWNraW5nIGNhc2VzXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0cmFja01ldHJpYyA9IHRoaXMub2Zmc2V0VHJhY2tpbmcoXG4gICAgICAgICh0aGlzLndpZHRoIC0gbWV0cmljUmVhbFdpZHRoKSAvIGxlbixcbiAgICAgICAgY3VycmVudC5zaXplLFxuICAgICAgICBjdXJyZW50LnVuaXRzXG4gICAgICApO1xuICAgICAgaWYgKHRyYWNrTWV0cmljIDwgMCkge1xuICAgICAgICB0cmFja01ldHJpYyA9IDA7XG4gICAgICB9XG4gICAgICAvL2F1dG8gZXhwYW5kIGNhc2VcbiAgICAgIGlmICh0cmFja01ldHJpYyA+IHRoaXMub3JpZ2luYWwudHJhY2tpbmcgJiYgdGhpcy5hdXRvRXhwYW5kKSB7XG4gICAgICAgIGlmICh0aGlzLm1heFRyYWNraW5nICE9IG51bGwgJiYgdHJhY2tNZXRyaWMgPiB0aGlzLm1heFRyYWNraW5nKSB7XG4gICAgICAgICAgdGhpcy50cmFja2luZyA9IHRoaXMubWF4VHJhY2tpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50cmFja2luZyA9IHRyYWNrTWV0cmljO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMub3JpZ2luYWwuc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvL2F1dG8gcmVkdWNlIHRyYWNraW5nIGNhc2VcbiAgICAgIGlmICh0cmFja01ldHJpYyA8IHRoaXMub3JpZ2luYWwudHJhY2tpbmcgJiYgdGhpcy5hdXRvUmVkdWNlKSB7XG4gICAgICAgIGlmICh0aGlzLm1heFRyYWNraW5nICE9IG51bGwgJiYgdHJhY2tNZXRyaWMgPiB0aGlzLm1heFRyYWNraW5nKSB7XG4gICAgICAgICAgdGhpcy50cmFja2luZyA9IHRoaXMubWF4VHJhY2tpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50cmFja2luZyA9IHRyYWNrTWV0cmljO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMub3JpZ2luYWwuc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdHJhY2tpbmdPZmZzZXQodHJhY2tpbmc6IG51bWJlciwgc2l6ZTogbnVtYmVyLCB1bml0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2l6ZSAqICgyLjUgLyB1bml0cyArIDEgLyA5MDAgKyB0cmFja2luZyAvIDk5MCk7XG4gIH1cblxuICBvZmZzZXRUcmFja2luZyhvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyLCB1bml0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKG9mZnNldCAtIDIuNSAvIHVuaXRzIC0gMSAvIDkwMCkgKiA5OTApIC8gc2l6ZSk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYWNlIGNoYXJhY3RlcnMgaW4gbGluZXNcbiAgICogYWRkcyBDaGFyYWN0ZXJzIHRvIGxpbmVzLiBMaW5lSGVpZ2h0IElTIGEgZmFjdG9yIGdpdmVuIGxhY2sgb2YgV29yZHMuXG4gICAqL1xuICBjaGFyYWN0ZXJMYXlvdXQoKTogYm9vbGVhbiB7XG4gICAgLy9jaGFyIGxheW91dFxuICAgIGNvbnN0IGxlbiA9IHRoaXMudGV4dC5sZW5ndGg7XG4gICAgbGV0IGNoYXI6IENoYXJhY3RlcjtcbiAgICBjb25zdCBkZWZhdWx0U3R5bGU6IFN0eWxlID0ge1xuICAgICAgc2l6ZTogdGhpcy5zaXplLFxuICAgICAgZm9udDogdGhpcy5mb250LFxuICAgICAgdHJhY2tpbmc6IHRoaXMudHJhY2tpbmcsXG4gICAgICBjaGFyYWN0ZXJDYXNlOiB0aGlzLmNoYXJhY3RlckNhc2UsXG4gICAgICBmaWxsQ29sb3I6IHRoaXMuZmlsbENvbG9yLFxuICAgICAgc3Ryb2tlQ29sb3I6IHRoaXMuc3Ryb2tlQ29sb3IsXG4gICAgICBzdHJva2VXaWR0aDogdGhpcy5zdHJva2VXaWR0aFxuICAgIH07XG4gICAgbGV0IGN1cnJlbnRTdHlsZSA9IGRlZmF1bHRTdHlsZTtcbiAgICBsZXQgaFBvc2l0aW9uID0gMDtcbiAgICBsZXQgdlBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGluZVkgPSAwO1xuICAgIGxldCBmaXJzdExpbmUgPSB0cnVlO1xuXG4gICAgbGV0IGN1cnJlbnRMaW5lOiBMaW5lID0gbmV3IExpbmUoKTtcblxuICAgIHRoaXMubGluZXMucHVzaChjdXJyZW50TGluZSk7XG4gICAgdGhpcy5ibG9jay5hZGRDaGlsZChjdXJyZW50TGluZSk7XG5cbiAgICAvLyBsb29wIG92ZXIgY2hhcmFjdGVyc1xuICAgIC8vIHBsYWNlIGludG8gbGluZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSAhPT0gbnVsbCAmJiB0aGlzLnN0eWxlW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudFN0eWxlID0gdGhpcy5zdHlsZVtpXTtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHN0eWxlIGNvbnRhaW5zIHByb3BlcnRpZXMgbmVlZGVkLlxuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnNpemUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuc2l6ZSA9IGRlZmF1bHRTdHlsZS5zaXplO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmZvbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuZm9udCA9IGRlZmF1bHRTdHlsZS5mb250O1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnRyYWNraW5nID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnRyYWNraW5nID0gZGVmYXVsdFN0eWxlLnRyYWNraW5nO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmNoYXJhY3RlckNhc2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuY2hhcmFjdGVyQ2FzZSA9IGRlZmF1bHRTdHlsZS5jaGFyYWN0ZXJDYXNlO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmZpbGxDb2xvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5maWxsQ29sb3IgPSBkZWZhdWx0U3R5bGUuZmlsbENvbG9yO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnN0cm9rZUNvbG9yID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnN0cm9rZUNvbG9yID0gZGVmYXVsdFN0eWxlLnN0cm9rZUNvbG9yO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnN0cm9rZVdpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnN0cm9rZVdpZHRoID0gZGVmYXVsdFN0eWxlLnN0cm9rZVdpZHRoO1xuICAgICAgfVxuXG4gICAgICAvLyBuZXdsaW5lXG4gICAgICAvLyBtYXJrIHdvcmQgYXMgaGF2aW5nIG5ld2xpbmVcbiAgICAgIC8vIGNyZWF0ZSBuZXcgd29yZFxuICAgICAgLy8gbmV3IGxpbmUgaGFzIG5vIGNoYXJhY3RlclxuICAgICAgaWYgKHRoaXMudGV4dC5jaGFyQXQoaSkgPT0gXCJcXG5cIiB8fCB0aGlzLnRleHQuY2hhckF0KGkpID09IFwiXFxyXCIpIHtcbiAgICAgICAgLy9vbmx5IGlmIG5vdCBsYXN0IGNoYXJcbiAgICAgICAgaWYgKGkgPCBsZW4gLSAxKSB7XG4gICAgICAgICAgaWYgKGZpcnN0TGluZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdlBvc2l0aW9uID0gY3VycmVudFN0eWxlLnNpemU7XG4gICAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZEhlaWdodCA9IGN1cnJlbnRTdHlsZS5zaXplO1xuICAgICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRXaWR0aCA9IGhQb3NpdGlvbjtcbiAgICAgICAgICAgIGxpbmVZID0gMDtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLnkgPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5saW5lSGVpZ2h0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdlBvc2l0aW9uID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoID0gaFBvc2l0aW9uO1xuICAgICAgICAgICAgbGluZVkgPSBsaW5lWSArIHZQb3NpdGlvbjtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLnkgPSBsaW5lWTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdlBvc2l0aW9uID0gY2hhci5tZWFzdXJlZEhlaWdodDtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkSGVpZ2h0ID0gdlBvc2l0aW9uO1xuICAgICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRXaWR0aCA9IGhQb3NpdGlvbjtcbiAgICAgICAgICAgIGxpbmVZID0gbGluZVkgKyB2UG9zaXRpb247XG4gICAgICAgICAgICBjdXJyZW50TGluZS55ID0gbGluZVk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlyc3RMaW5lID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudExpbmUgPSBuZXcgTGluZSgpO1xuICAgICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkSGVpZ2h0ID0gY3VycmVudFN0eWxlLnNpemU7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRXaWR0aCA9IDA7XG4gICAgICAgICAgdGhpcy5saW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcbiAgICAgICAgICB0aGlzLmJsb2NrLmFkZENoaWxkKGN1cnJlbnRMaW5lKTtcbiAgICAgICAgICB2UG9zaXRpb24gPSAwO1xuICAgICAgICAgIGhQb3NpdGlvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50ZXh0LmNoYXJBdChpKSA9PSBcIlxcclwiICYmIHRoaXMudGV4dC5jaGFyQXQoaSArIDEpID09IFwiXFxuXCIpIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy9ydW50aW1lIHRlc3QgZm9yIGZvbnRcbiAgICAgIGlmIChGb250TG9hZGVyLmlzTG9hZGVkKGN1cnJlbnRTdHlsZS5mb250KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgRm9udExvYWRlci5sb2FkKHRoaXMsIFtjdXJyZW50U3R5bGUuZm9udF0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBjaGFyYWN0ZXJcbiAgICAgIGNoYXIgPSBuZXcgQ2hhcmFjdGVyKHRoaXMudGV4dC5jaGFyQXQoaSksIGN1cnJlbnRTdHlsZSwgaSk7XG5cbiAgICAgIGlmICh0aGlzLm9yaWdpbmFsLmNoYXJhY3Rlcikge1xuICAgICAgICBhcHBseVNoYXBlRXZlbnRMaXN0ZW5lcnModGhpcy5vcmlnaW5hbC5jaGFyYWN0ZXIsIGNoYXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhci5taXNzaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm1pc3NpbmdHbHlwaHMgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubWlzc2luZ0dseXBocyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWlzc2luZ0dseXBocy5wdXNoKHtcbiAgICAgICAgICBwb3NpdGlvbjogaSxcbiAgICAgICAgICBjaGFyYWN0ZXI6IHRoaXMudGV4dC5jaGFyQXQoaSksXG4gICAgICAgICAgZm9udDogY3VycmVudFN0eWxlLmZvbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdExpbmUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHZQb3NpdGlvbiA8IGNoYXIuc2l6ZSkge1xuICAgICAgICAgIHZQb3NpdGlvbiA9IGNoYXIuc2l6ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpbmVIZWlnaHQgIT0gdW5kZWZpbmVkICYmIHRoaXMubGluZUhlaWdodCA+IDApIHtcbiAgICAgICAgaWYgKHZQb3NpdGlvbiA8IHRoaXMubGluZUhlaWdodCkge1xuICAgICAgICAgIHZQb3NpdGlvbiA9IHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGFyLm1lYXN1cmVkSGVpZ2h0ID4gdlBvc2l0aW9uKSB7XG4gICAgICAgIHZQb3NpdGlvbiA9IGNoYXIubWVhc3VyZWRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIC8vc3dhcCBjaGFyYWN0ZXIgaWYgbGlnYXR1cmVcbiAgICAgIC8vbGlnYXR1cmVzIHJlbW92ZWQgaWYgdHJhY2tpbmcgb3IgdGhpcy5saWdhdHVyZXMgaXMgZmFsc2VcbiAgICAgIGlmIChjdXJyZW50U3R5bGUudHJhY2tpbmcgPT0gMCAmJiB0aGlzLmxpZ2F0dXJlcyA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGxpZ1RhcmdldCA9IHRoaXMudGV4dC5zdWJzdHIoaSwgNCk7XG4gICAgICAgIGkgPSBpICsgdGhpcy5saWdhdHVyZVN3YXAoY2hhciwgbGlnVGFyZ2V0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3ZlcnNldCA9PSB0cnVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb25nZXJUaGFuV2lkdGggPSBoUG9zaXRpb24gKyBjaGFyLm1lYXN1cmVkV2lkdGggPiB0aGlzLndpZHRoO1xuICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZSA9PT0gZmFsc2UgJiYgbG9uZ2VyVGhhbldpZHRoKSB7XG4gICAgICAgIGNvbnN0IGxhc3RjaGFyOiBDaGFyYWN0ZXIgPSBjdXJyZW50TGluZS5jaGlsZHJlbltcbiAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGggLSAxXG4gICAgICAgIF0gYXMgQ2hhcmFjdGVyO1xuXG4gICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPVxuICAgICAgICAgIGhQb3NpdGlvbiAtXG4gICAgICAgICAgbGFzdGNoYXIudHJhY2tpbmdPZmZzZXQoKSAtXG4gICAgICAgICAgbGFzdGNoYXIuX2dseXBoLmdldEtlcm5pbmcodGhpcy5nZXRDaGFyQ29kZUF0KGkpLCBsYXN0Y2hhci5zaXplKTtcblxuICAgICAgICBpZiAobGFzdGNoYXIuY2hhcmFjdGVyQ29kZSA9PSBTUEFDRV9DSEFSX0NPREUpIHtcbiAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoIC09IGxhc3RjaGFyLm1lYXN1cmVkV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlyc3RMaW5lID09PSB0cnVlKSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICAgICAgY3VycmVudExpbmUueSA9IDA7XG4gICAgICAgICAgbGluZVkgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkSGVpZ2h0ID0gdlBvc2l0aW9uO1xuICAgICAgICAgIGxpbmVZID0gbGluZVkgKyB2UG9zaXRpb247XG4gICAgICAgICAgY3VycmVudExpbmUueSA9IGxpbmVZO1xuICAgICAgICB9XG4gICAgICAgIGZpcnN0TGluZSA9IGZhbHNlO1xuICAgICAgICBjdXJyZW50TGluZSA9IG5ldyBMaW5lKCk7XG4gICAgICAgIGN1cnJlbnRMaW5lLmFkZENoaWxkKGNoYXIpO1xuXG4gICAgICAgIGlmIChjaGFyLmNoYXJhY3RlckNvZGUgPT0gU1BBQ0VfQ0hBUl9DT0RFKSB7XG4gICAgICAgICAgaFBvc2l0aW9uID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoUG9zaXRpb24gPVxuICAgICAgICAgICAgY2hhci54ICtcbiAgICAgICAgICAgIGNoYXIuX2dseXBoLm9mZnNldCAqIGNoYXIuc2l6ZSArXG4gICAgICAgICAgICBjaGFyLmNoYXJhY3RlckNhc2VPZmZzZXQgK1xuICAgICAgICAgICAgY2hhci50cmFja2luZ09mZnNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcbiAgICAgICAgdGhpcy5ibG9jay5hZGRDaGlsZChjdXJyZW50TGluZSk7XG4gICAgICAgIHZQb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgLy9tZWFzdXJlZCBjYXNlXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLm1lYXN1cmVkID09IHRydWUgJiZcbiAgICAgICAgdGhpcy5zaW5nbGVMaW5lID09PSB0cnVlICYmXG4gICAgICAgIGxvbmdlclRoYW5XaWR0aCAmJlxuICAgICAgICB0aGlzLm92ZXJzZXRQb3RlbnRpYWwgPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub3ZlcnNldEluZGV4ID0gaTtcbiAgICAgICAgdGhpcy5vdmVyc2V0ID0gdHJ1ZTtcblxuICAgICAgICAvL25vdCBtZWFzdXJlZFxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5tZWFzdXJlZCA9PSBmYWxzZSAmJlxuICAgICAgICB0aGlzLnNpbmdsZUxpbmUgPT09IHRydWUgJiZcbiAgICAgICAgbG9uZ2VyVGhhbldpZHRoXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vdmVyc2V0SW5kZXggPSBpO1xuICAgICAgICB0aGlzLm92ZXJzZXQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhci54ID0gaFBvc2l0aW9uO1xuICAgICAgICAvLyBwdXNoIGNoYXJhY3RlciBpbnRvIHdvcmRcbiAgICAgICAgY3VycmVudExpbmUuYWRkQ2hpbGQoY2hhcik7XG4gICAgICAgIGhQb3NpdGlvbiA9XG4gICAgICAgICAgY2hhci54ICtcbiAgICAgICAgICBjaGFyLl9nbHlwaC5vZmZzZXQgKiBjaGFyLnNpemUgK1xuICAgICAgICAgIGNoYXIuY2hhcmFjdGVyQ2FzZU9mZnNldCArXG4gICAgICAgICAgY2hhci50cmFja2luZ09mZnNldCgpICtcbiAgICAgICAgICBjaGFyLl9nbHlwaC5nZXRLZXJuaW5nKHRoaXMuZ2V0Q2hhckNvZGVBdChpICsgMSksIGNoYXIuc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9jYXNlIG9mIGVtcHR5IHdvcmQgYXQgZW5kLlxuICAgIGlmIChjdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xuICAgICAgY3VycmVudExpbmUgPSB0aGlzLmxpbmVzW3RoaXMubGluZXMubGVuZ3RoIC0gMV07XG4gICAgICBoUG9zaXRpb24gPSBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoO1xuICAgICAgdlBvc2l0aW9uID0gY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQ7XG4gICAgfVxuICAgIGlmIChmaXJzdExpbmUgPT09IHRydWUpIHtcbiAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPSBoUG9zaXRpb247XG4gICAgICBjdXJyZW50TGluZS5tZWFzdXJlZEhlaWdodCA9IHZQb3NpdGlvbjtcbiAgICAgIGN1cnJlbnRMaW5lLnkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoID0gaFBvc2l0aW9uO1xuICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICBpZiAodlBvc2l0aW9uID09IDApIHtcbiAgICAgICAgaWYgKHRoaXMubGluZUhlaWdodCkge1xuICAgICAgICAgIHZQb3NpdGlvbiA9IHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2UG9zaXRpb24gPSBjdXJyZW50U3R5bGUuc2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3VycmVudExpbmUueSA9IGxpbmVZICsgdlBvc2l0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGxpbmVMYXlvdXQoKSB7XG4gICAgLy8gbG9vcCBvdmVyIGxpbmVzXG4gICAgLy8gcGxhY2UgaW50byB0ZXh0XG4gICAgbGV0IG1lYXN1cmVkSGVpZ2h0ID0gMDtcbiAgICBsZXQgbGluZTtcbiAgICBjb25zdCBhID0gQWxpZ247XG4gICAgY29uc3QgZm50OiBGb250ID0gRm9udExvYWRlci5nZXRGb250KHRoaXMuZm9udCk7XG5cbiAgICBjb25zdCBsZW4gPSB0aGlzLmxpbmVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsaW5lID0gdGhpcy5saW5lc1tpXTtcblxuICAgICAgLy9jb3JyZWN0IG1lYXN1cmVkV2lkdGggaWYgbGFzdCBsaW5lIGNoYXJhY3RlciBjb250YWlucyB0cmFja2luZ1xuICAgICAgaWYgKGxpbmUubGFzdENoYXJhY3RlcigpKSB7XG4gICAgICAgIGxpbmUubWVhc3VyZWRXaWR0aCAtPSBsaW5lLmxhc3RDaGFyYWN0ZXIoKS50cmFja2luZ09mZnNldCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcmlnaW5hbC5saW5lKSB7XG4gICAgICAgIGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyh0aGlzLm9yaWdpbmFsLmxpbmUsIGxpbmUpO1xuICAgICAgfVxuXG4gICAgICBtZWFzdXJlZEhlaWdodCArPSBsaW5lLm1lYXN1cmVkSGVpZ2h0O1xuXG4gICAgICBpZiAodGhpcy5hbGlnbiA9PT0gYS5UT1BfQ0VOVEVSKSB7XG4gICAgICAgIC8vbW92ZSB0byBjZW50ZXJcbiAgICAgICAgbGluZS54ID0gKHRoaXMud2lkdGggLSBsaW5lLm1lYXN1cmVkV2lkdGgpIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PT0gYS5UT1BfUklHSFQpIHtcbiAgICAgICAgLy9tb3ZlIHRvIHJpZ2h0XG4gICAgICAgIGxpbmUueCA9IHRoaXMud2lkdGggLSBsaW5lLm1lYXN1cmVkV2lkdGg7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT09IGEuTUlERExFX0NFTlRFUikge1xuICAgICAgICAvL21vdmUgdG8gY2VudGVyXG4gICAgICAgIGxpbmUueCA9ICh0aGlzLndpZHRoIC0gbGluZS5tZWFzdXJlZFdpZHRoKSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT09IGEuTUlERExFX1JJR0hUKSB7XG4gICAgICAgIC8vbW92ZSB0byByaWdodFxuICAgICAgICBsaW5lLnggPSB0aGlzLndpZHRoIC0gbGluZS5tZWFzdXJlZFdpZHRoO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09PSBhLkJPVFRPTV9DRU5URVIpIHtcbiAgICAgICAgLy9tb3ZlIHRvIGNlbnRlclxuICAgICAgICBsaW5lLnggPSAodGhpcy53aWR0aCAtIGxpbmUubWVhc3VyZWRXaWR0aCkgLyAyO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09PSBhLkJPVFRPTV9SSUdIVCkge1xuICAgICAgICAvL21vdmUgdG8gcmlnaHRcbiAgICAgICAgbGluZS54ID0gdGhpcy53aWR0aCAtIGxpbmUubWVhc3VyZWRXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1RPUCBBTElHTkVEXG4gICAgaWYgKFxuICAgICAgdGhpcy5hbGlnbiA9PT0gYS5UT1BfTEVGVCB8fFxuICAgICAgdGhpcy5hbGlnbiA9PT0gYS5UT1BfQ0VOVEVSIHx8XG4gICAgICB0aGlzLmFsaWduID09PSBhLlRPUF9SSUdIVFxuICAgICkge1xuICAgICAgaWYgKGZudC50b3AgPT0gMCkge1xuICAgICAgICB0aGlzLmJsb2NrLnkgPSAodGhpcy5saW5lc1swXS5tZWFzdXJlZEhlaWdodCAqIGZudC5hc2NlbnQpIC8gZm50LnVuaXRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ibG9jay55ID1cbiAgICAgICAgICAodGhpcy5saW5lc1swXS5tZWFzdXJlZEhlaWdodCAqIGZudC5hc2NlbnQpIC8gZm50LnVuaXRzICtcbiAgICAgICAgICAodGhpcy5saW5lc1swXS5tZWFzdXJlZEhlaWdodCAqIGZudC50b3ApIC8gZm50LnVuaXRzO1xuICAgICAgfVxuXG4gICAgICAvL01JRERMRSBBTElHTkVEXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuYWxpZ24gPT09IGEuTUlERExFX0xFRlQgfHxcbiAgICAgIHRoaXMuYWxpZ24gPT09IGEuTUlERExFX0NFTlRFUiB8fFxuICAgICAgdGhpcy5hbGlnbiA9PT0gYS5NSURETEVfUklHSFRcbiAgICApIHtcbiAgICAgIHRoaXMuYmxvY2sueSA9XG4gICAgICAgIHRoaXMubGluZXNbMF0ubWVhc3VyZWRIZWlnaHQgK1xuICAgICAgICAodGhpcy5oZWlnaHQgLSBtZWFzdXJlZEhlaWdodCkgLyAyICtcbiAgICAgICAgKHRoaXMubGluZXNbMF0ubWVhc3VyZWRIZWlnaHQgKiBmbnQubWlkZGxlKSAvIGZudC51bml0cztcblxuICAgICAgLy9CT1RUT00gQUxJR05FRFxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLmFsaWduID09PSBhLkJPVFRPTV9MRUZUIHx8XG4gICAgICB0aGlzLmFsaWduID09PSBhLkJPVFRPTV9DRU5URVIgfHxcbiAgICAgIHRoaXMuYWxpZ24gPT09IGEuQk9UVE9NX1JJR0hUXG4gICAgKSB7XG4gICAgICB0aGlzLmJsb2NrLnkgPVxuICAgICAgICB0aGlzLmhlaWdodCAtXG4gICAgICAgIHRoaXMubGluZXNbdGhpcy5saW5lcy5sZW5ndGggLSAxXS55ICtcbiAgICAgICAgKHRoaXMubGluZXNbMF0ubWVhc3VyZWRIZWlnaHQgKiBmbnQuYm90dG9tKSAvIGZudC51bml0cztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcmlnaW5hbC5ibG9jaykge1xuICAgICAgYXBwbHlTaGFwZUV2ZW50TGlzdGVuZXJzKHRoaXMub3JpZ2luYWwuYmxvY2ssIHRoaXMuYmxvY2spO1xuICAgIH1cbiAgfVxufVxuIl19