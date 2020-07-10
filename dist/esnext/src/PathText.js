import { __extends } from "tslib";
import TextContainer from "./TextContainer";
import Path, { PathFit, PathAlign } from "./Path";
import VerticalAlign from "./VerticalAlign";
import FontLoader from "./FontLoader";
import Character from "./Character";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";
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
        _this.fit = PathFit.Rainbow;
        _this.align = PathAlign.Center;
        _this.valign = VerticalAlign.BaseLine;
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
        if (fit === void 0) { fit = PathFit.Rainbow; }
        this.fit = fit;
        this.pathPoints.fit = this.fit;
        this.pathPoints.update();
    };
    PathText.prototype.setAlign = function (align) {
        if (align === void 0) { align = PathAlign.Center; }
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
            if (this.valign == VerticalAlign.BaseLine) {
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
                if (this.valign == VerticalAlign.Top) {
                    char.y = char.size;
                }
                else if (this.valign == VerticalAlign.Bottom) {
                    char.y = (char._font.descent / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign.CapHeight) {
                    char.y = (char._font["cap-height"] / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign.XHeight) {
                    char.y = (char._font["x-height"] / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign.Ascent) {
                    char.y = (char._font.ascent / char._font.units) * char.size;
                }
                else if (this.valign == VerticalAlign.Center) {
                    char.y =
                        ((char._font["cap-height"] / char._font.units) * char.size) / 2;
                }
                else if (this.valign == VerticalAlign.Percent) {
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
            applyShapeEventListeners(this.original.block, this.block);
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
export default PathText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aFRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUGF0aFRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBRTVDLE9BQU8sSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsRCxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBRXBDLE9BQU8sd0JBQXdCLE1BQU0scUNBQXFDLENBQUM7QUFFM0U7SUFBc0MsNEJBQWE7SUFpQ2pELGtCQUFZLEtBQTBCO1FBQTFCLHNCQUFBLEVBQUEsWUFBMEI7UUFBdEMsWUFDRSxpQkFBTyxTQWdCUjtRQWpERCxVQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBTyxHQUFXLElBQUksQ0FBQztRQUN2QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixlQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLFdBQUssR0FBRyxLQUFLLENBQUM7UUFHZCxjQUFRLEdBQWlCLElBQUksQ0FBQztRQUM5QixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBQ3hCLFVBQUksR0FBRyxFQUFFLENBQUM7UUFDVixXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBRyxHQUFXLElBQUksQ0FBQztRQUNuQixhQUFP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RSxLQUFhO1FBQzFELE9BQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLE1BQWMsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFsa0JELENBQXNDLGFBQWEsR0Fra0JsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0Q29udGFpbmVyIGZyb20gXCIuL1RleHRDb250YWluZXJcIjtcbmltcG9ydCB7IENvbnN0cnVjdE9iaiwgU3R5bGUgfSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgUGF0aCwgeyBQYXRoRml0LCBQYXRoQWxpZ24gfSBmcm9tIFwiLi9QYXRoXCI7XG5pbXBvcnQgVmVydGljYWxBbGlnbiBmcm9tIFwiLi9WZXJ0aWNhbEFsaWduXCI7XG5pbXBvcnQgRm9udExvYWRlciBmcm9tIFwiLi9Gb250TG9hZGVyXCI7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gXCIuL0NoYXJhY3RlclwiO1xuaW1wb3J0IEZvbnQgZnJvbSBcIi4vRm9udFwiO1xuaW1wb3J0IGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyBmcm9tIFwiLi91dGlscy9hcHBseS1zaGFwZS1ldmVudC1saXN0ZW5lcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aFRleHQgZXh0ZW5kcyBUZXh0Q29udGFpbmVyIHtcbiAgc2l6ZSA9IDEyO1xuICB0cmFja2luZyA9IDA7XG4gIGxpZ2F0dXJlcyA9IGZhbHNlO1xuICBtaW5TaXplOiBudW1iZXIgPSBudWxsO1xuICBtYXhUcmFja2luZzogbnVtYmVyID0gbnVsbDtcbiAgZmlsbENvbG9yID0gXCIjMDAwXCI7XG4gIHN0cm9rZUNvbG9yOiBzdHJpbmcgPSBudWxsO1xuICBzdHJva2VXaWR0aDogbnVtYmVyID0gbnVsbDtcbiAgZGVidWcgPSBmYWxzZTtcbiAgY2hhcmFjdGVyczogQ2hhcmFjdGVyW107XG4gIGJsb2NrOiBjcmVhdGVqcy5Db250YWluZXI7XG4gIG9yaWdpbmFsOiBDb25zdHJ1Y3RPYmogPSBudWxsO1xuICBhdXRvRXhwYW5kID0gZmFsc2U7XG4gIGF1dG9SZWR1Y2UgPSBmYWxzZTtcbiAgb3ZlcnNldCA9IGZhbHNlO1xuICBvdmVyc2V0SW5kZXg6IG51bWJlciA9IG51bGw7XG4gIHBhdGhQb2ludHM6IFBhdGggPSBudWxsO1xuICBwYXRoID0gXCJcIjtcbiAgc3RhcnQgPSAwO1xuICBlbmQ6IG51bWJlciA9IG51bGw7XG4gIGZsaXBwZWQgPSBmYWxzZTtcbiAgZml0OiBQYXRoRml0ID0gUGF0aEZpdC5SYWluYm93O1xuICBhbGlnbjogUGF0aEFsaWduID0gUGF0aEFsaWduLkNlbnRlcjtcbiAgdmFsaWduOiBWZXJ0aWNhbEFsaWduID0gVmVydGljYWxBbGlnbi5CYXNlTGluZTtcbiAgbWlzc2luZ0dseXBoczogYW55W10gPSBudWxsO1xuICByZW5kZXJDeWNsZSA9IHRydWU7XG4gIHZhbGlnblBlcmNlbnQgPSAxO1xuICBpbml0aWFsVHJhY2tpbmcgPSAwO1xuICBpbml0aWFsT2Zmc2V0ID0gMDtcbiAgbWVhc3VyZWQgPSBmYWxzZTtcbiAgb3ZlcnNldFBvdGVudGlhbCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBDb25zdHJ1Y3RPYmogPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5vcmlnaW5hbCA9IHByb3BzO1xuICAgICAgdGhpcy5zZXQocHJvcHMpO1xuICAgICAgdGhpcy5vcmlnaW5hbC50cmFja2luZyA9IHRoaXMudHJhY2tpbmc7XG4gICAgfVxuICAgIHRoaXMubG9hZEZvbnRzKCk7XG4gICAgdGhpcy5wYXRoUG9pbnRzID0gbmV3IFBhdGgoXG4gICAgICB0aGlzLnBhdGgsXG4gICAgICB0aGlzLnN0YXJ0LFxuICAgICAgdGhpcy5lbmQsXG4gICAgICB0aGlzLmZsaXBwZWQsXG4gICAgICB0aGlzLmZpdCxcbiAgICAgIHRoaXMuYWxpZ25cbiAgICApO1xuICB9XG5cbiAgc2V0UGF0aChwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMucGF0aFBvaW50cy5wYXRoID0gdGhpcy5wYXRoO1xuICAgIHRoaXMucGF0aFBvaW50cy51cGRhdGUoKTtcbiAgfVxuXG4gIHNldFN0YXJ0KHN0YXJ0OiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5wYXRoUG9pbnRzLnN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICB0aGlzLnBhdGhQb2ludHMudXBkYXRlKCk7XG4gIH1cblxuICBzZXRFbmQoZW5kOiBudW1iZXIpIHtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICB0aGlzLnBhdGhQb2ludHMuZW5kID0gdGhpcy5lbmQ7XG4gICAgdGhpcy5wYXRoUG9pbnRzLnVwZGF0ZSgpO1xuICB9XG5cbiAgc2V0RmxpcHBlZChmbGlwcGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5mbGlwcGVkID0gZmxpcHBlZDtcbiAgICB0aGlzLnBhdGhQb2ludHMuZmxpcHBlZCA9IHRoaXMuZmxpcHBlZDtcbiAgICB0aGlzLnBhdGhQb2ludHMudXBkYXRlKCk7XG4gIH1cblxuICBzZXRGaXQoZml0OiBQYXRoRml0ID0gUGF0aEZpdC5SYWluYm93KSB7XG4gICAgdGhpcy5maXQgPSBmaXQ7XG4gICAgdGhpcy5wYXRoUG9pbnRzLmZpdCA9IHRoaXMuZml0O1xuICAgIHRoaXMucGF0aFBvaW50cy51cGRhdGUoKTtcbiAgfVxuXG4gIHNldEFsaWduKGFsaWduOiBQYXRoQWxpZ24gPSBQYXRoQWxpZ24uQ2VudGVyKSB7XG4gICAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICAgIHRoaXMucGF0aFBvaW50cy5hbGlnbiA9IHRoaXMuYWxpZ247XG4gICAgdGhpcy5wYXRoUG9pbnRzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYXRoUG9pbnRzLnJlYWxMZW5ndGg7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5hZGRBY2Nlc3NpYmlsaXR5KCk7XG4gICAgdGhpcy5vdmVyc2V0ID0gZmFsc2U7XG4gICAgdGhpcy5vdmVyc2V0SW5kZXggPSBudWxsO1xuICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB0aGlzLmNoYXJhY3RlcnMgPSBbXTtcbiAgICB0aGlzLm1pc3NpbmdHbHlwaHMgPSBudWxsO1xuICAgIHRoaXMubWVhc3VyZWQgPSBmYWxzZTtcbiAgICB0aGlzLm92ZXJzZXRQb3RlbnRpYWwgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5kZWJ1ZyA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFkZERlYnVnTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGV4dCA9PT0gXCJcIiB8fCB0aGlzLnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5ibG9jayk7XG5cbiAgICBpZiAodGhpcy5hdXRvRXhwYW5kID09PSB0cnVlIHx8IHRoaXMuYXV0b1JlZHVjZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMubWVhc3VyZSgpID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZW5kZXJDeWNsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFyYWN0ZXJMYXlvdXQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGFkZERlYnVnTGF5b3V0KCkge1xuICAgIGxldCBzID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgcy5ncmFwaGljcy5iZWdpblN0cm9rZShcIiNGRjAwMDBcIik7XG4gICAgcy5ncmFwaGljcy5zZXRTdHJva2VTdHlsZSgwLjEpO1xuICAgIHMuZ3JhcGhpY3MuZGVjb2RlU1ZHUGF0aCh0aGlzLnBhdGgpO1xuICAgIHMuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHMuZ3JhcGhpY3MuZW5kU3Ryb2tlKCk7XG4gICAgdGhpcy5hZGRDaGlsZChzKTtcbiAgICBzID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgbGV0IHBwID0gdGhpcy5wYXRoUG9pbnRzLmdldFJlYWxQYXRoUG9pbnQoMCk7XG4gICAgcy54ID0gcHAueDtcbiAgICBzLnkgPSBwcC55O1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiYmxhY2tcIik7XG4gICAgcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIDIpO1xuICAgIHRoaXMuYWRkQ2hpbGQocyk7XG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHBwID0gdGhpcy5wYXRoUG9pbnRzLmdldFJlYWxQYXRoUG9pbnQodGhpcy5wYXRoUG9pbnRzLnN0YXJ0KTtcbiAgICBzLnggPSBwcC54O1xuICAgIHMueSA9IHBwLnk7XG4gICAgcy5ncmFwaGljcy5iZWdpbkZpbGwoXCJncmVlblwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgMik7XG4gICAgdGhpcy5hZGRDaGlsZChzKTtcbiAgICBzID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgcHAgPSB0aGlzLnBhdGhQb2ludHMuZ2V0UmVhbFBhdGhQb2ludCh0aGlzLnBhdGhQb2ludHMuZW5kKTtcbiAgICBzLnggPSBwcC54O1xuICAgIHMueSA9IHBwLnk7XG4gICAgcy5ncmFwaGljcy5iZWdpbkZpbGwoXCJyZWRcIik7XG4gICAgcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIDIpO1xuICAgIHRoaXMuYWRkQ2hpbGQocyk7XG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHBwID0gdGhpcy5wYXRoUG9pbnRzLmdldFJlYWxQYXRoUG9pbnQodGhpcy5wYXRoUG9pbnRzLmNlbnRlcik7XG4gICAgcy54ID0gcHAueDtcbiAgICBzLnkgPSBwcC55O1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiYmx1ZVwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgMik7XG4gICAgdGhpcy5hZGRDaGlsZChzKTtcbiAgfVxuXG4gIG1lYXN1cmUoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5tZWFzdXJlZCA9IHRydWU7XG4gICAgLy9FeHRyYWN0IG9yZ2luIHNpemluZyBmcm9tIHRoaXMub3JpZ2luYWwgdG8gcHJlc2VydmVcbiAgICAvL21ldHJpY3MuIGF1dG9NZWFzdXJlIHdpbGwgY2hhbmdlIHN0eWxlIHByb3BlcnRpZXNcbiAgICAvL2RpcmVjdGx5LiBDaGFuZ2UgdGhpcy5vcmlnaW5hbCB0byByZXJlbmRlci5cblxuICAgIGxldCBsZW4gPSB0aGlzLnRleHQubGVuZ3RoO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgICAgIHNpemU6IHRoaXMub3JpZ2luYWwuc2l6ZSxcbiAgICAgIGZvbnQ6IHRoaXMub3JpZ2luYWwuZm9udCxcbiAgICAgIHRyYWNraW5nOiB0aGlzLm9yaWdpbmFsLnRyYWNraW5nLFxuICAgICAgY2hhcmFjdGVyQ2FzZTogdGhpcy5vcmlnaW5hbC5jaGFyYWN0ZXJDYXNlXG4gICAgfTtcbiAgICBsZXQgY3VycmVudFN0eWxlOiBhbnk7XG4gICAgbGV0IGNoYXJDb2RlOiBudW1iZXIgPSBudWxsO1xuICAgIGxldCBmb250OiBGb250O1xuICAgIGNvbnN0IGNoYXJNZXRyaWNzID0gW107XG4gICAgbGV0IGxhcmdlc3RGb250U2l6ZSA9IGRlZmF1bHRTdHlsZS5zaXplO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNoYXJDb2RlID0gdGhpcy50ZXh0LmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIGN1cnJlbnRTdHlsZSA9IGRlZmF1bHRTdHlsZTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5vcmlnaW5hbC5zdHlsZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHRoaXMub3JpZ2luYWwuc3R5bGVbaV0gIT09IHVuZGVmaW5lZFxuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRTdHlsZSA9IHRoaXMub3JpZ2luYWwuc3R5bGVbaV07XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBzdHlsZSBjb250YWlucyBwcm9wZXJ0aWVzIG5lZWRlZC5cbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5zaXplID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnNpemUgPSBkZWZhdWx0U3R5bGUuc2l6ZTtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5mb250ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLmZvbnQgPSBkZWZhdWx0U3R5bGUuZm9udDtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS50cmFja2luZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS50cmFja2luZyA9IGRlZmF1bHRTdHlsZS50cmFja2luZztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3R5bGUuc2l6ZSA+IGxhcmdlc3RGb250U2l6ZSkge1xuICAgICAgICBsYXJnZXN0Rm9udFNpemUgPSBjdXJyZW50U3R5bGUuc2l6ZTtcbiAgICAgIH1cbiAgICAgIGZvbnQgPSBGb250TG9hZGVyLmZvbnRzW2N1cnJlbnRTdHlsZS5mb250XTtcbiAgICAgIGNoYXJNZXRyaWNzLnB1c2goe1xuICAgICAgICBjaGFyOiB0aGlzLnRleHRbaV0sXG4gICAgICAgIHNpemU6IGN1cnJlbnRTdHlsZS5zaXplLFxuICAgICAgICBjaGFyQ29kZTogY2hhckNvZGUsXG4gICAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250LFxuICAgICAgICBvZmZzZXQ6IGZvbnQuZ2x5cGhzW2NoYXJDb2RlXS5vZmZzZXQsXG4gICAgICAgIHVuaXRzOiBmb250LnVuaXRzLFxuICAgICAgICB0cmFja2luZzogdGhpcy50cmFja2luZ09mZnNldChcbiAgICAgICAgICBjdXJyZW50U3R5bGUudHJhY2tpbmcsXG4gICAgICAgICAgY3VycmVudFN0eWxlLnNpemUsXG4gICAgICAgICAgZm9udC51bml0c1xuICAgICAgICApLFxuICAgICAgICBrZXJuaW5nOiBmb250LmdseXBoc1tjaGFyQ29kZV0uZ2V0S2VybmluZyh0aGlzLmdldENoYXJDb2RlQXQoaSArIDEpLCAxKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9zYXZlIHNwYWNlIGNoYXIgdXNpbmcgbGFzdCBrbm93biB3aWR0aC9oZWlnaHRcbiAgICBjb25zdCBzcGFjZTogYW55ID0ge1xuICAgICAgY2hhcjogXCIgXCIsXG4gICAgICBzaXplOiBjdXJyZW50U3R5bGUuc2l6ZSxcbiAgICAgIGNoYXJDb2RlOiAzMixcbiAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250LFxuICAgICAgb2Zmc2V0OiBmb250LmdseXBoc1szMl0ub2Zmc2V0LFxuICAgICAgdW5pdHM6IGZvbnQudW5pdHMsXG4gICAgICB0cmFja2luZzogMCxcbiAgICAgIGtlcm5pbmc6IDBcbiAgICB9O1xuXG4gICAgY2hhck1ldHJpY3NbY2hhck1ldHJpY3MubGVuZ3RoIC0gMV0udHJhY2tpbmcgPSAwO1xuICAgIC8vY2hhck1ldHJpY3NbIGNoYXJNZXRyaWNzLmxlbmd0aC0xIF0ua2VybmluZz0wO1xuXG4gICAgbGVuID0gY2hhck1ldHJpY3MubGVuZ3RoO1xuXG4gICAgLy9tZWFzdXJlZCB3aXRob3V0IHNpemVcbiAgICBsZXQgbWV0cmljQmFzZVdpZHRoID0gMDtcbiAgICAvL21lYXN1cmVkIGF0IHNpemVcbiAgICBsZXQgbWV0cmljUmVhbFdpZHRoID0gMDtcbiAgICAvL21lYXN1cmVkIGF0IHNpemUgd2l0aCB0cmFja2luZ1xuICAgIGxldCBtZXRyaWNSZWFsV2lkdGhUcmFja2luZyA9IDA7XG5cbiAgICBsZXQgY3VycmVudCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY3VycmVudCA9IGNoYXJNZXRyaWNzW2ldO1xuICAgICAgbWV0cmljQmFzZVdpZHRoID0gbWV0cmljQmFzZVdpZHRoICsgY3VycmVudC5vZmZzZXQgKyBjdXJyZW50Lmtlcm5pbmc7XG4gICAgICBtZXRyaWNSZWFsV2lkdGggPVxuICAgICAgICBtZXRyaWNSZWFsV2lkdGggKyAoY3VycmVudC5vZmZzZXQgKyBjdXJyZW50Lmtlcm5pbmcpICogY3VycmVudC5zaXplO1xuICAgICAgbWV0cmljUmVhbFdpZHRoVHJhY2tpbmcgPVxuICAgICAgICBtZXRyaWNSZWFsV2lkdGhUcmFja2luZyArXG4gICAgICAgIChjdXJyZW50Lm9mZnNldCArIGN1cnJlbnQua2VybmluZyArIGN1cnJlbnQudHJhY2tpbmcpICogY3VycmVudC5zaXplO1xuICAgIH1cblxuICAgIC8vc2l6ZSBjYXNlc1xuICAgIGlmIChtZXRyaWNSZWFsV2lkdGggPiB3aWR0aCkge1xuICAgICAgaWYgKHRoaXMuYXV0b1JlZHVjZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnRyYWNraW5nID0gMDtcbiAgICAgICAgdGhpcy5zaXplID1cbiAgICAgICAgICAodGhpcy5vcmlnaW5hbC5zaXplICogd2lkdGgpIC9cbiAgICAgICAgICAobWV0cmljUmVhbFdpZHRoICsgc3BhY2Uub2Zmc2V0ICogc3BhY2Uuc2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm1pblNpemUgIT0gbnVsbCAmJiB0aGlzLnNpemUgPCB0aGlzLm1pblNpemUpIHtcbiAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLm1pblNpemU7XG4gICAgICAgICAgaWYgKHRoaXMucmVuZGVyQ3ljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJzZXQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJzZXRQb3RlbnRpYWwgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vdHJhY2tpbmcgY2FzZXNcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRyYWNrTWV0cmljID0gdGhpcy5vZmZzZXRUcmFja2luZyhcbiAgICAgICAgKHdpZHRoIC0gbWV0cmljUmVhbFdpZHRoKSAvIGxlbixcbiAgICAgICAgY3VycmVudC5zaXplLFxuICAgICAgICBjdXJyZW50LnVuaXRzXG4gICAgICApO1xuICAgICAgaWYgKHRyYWNrTWV0cmljIDwgMCkge1xuICAgICAgICB0cmFja01ldHJpYyA9IDA7XG4gICAgICB9XG4gICAgICAvL2F1dG9leHBhbmQgY2FzZVxuICAgICAgaWYgKHRyYWNrTWV0cmljID4gdGhpcy5vcmlnaW5hbC50cmFja2luZyAmJiB0aGlzLmF1dG9FeHBhbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4VHJhY2tpbmcgIT0gbnVsbCAmJiB0cmFja01ldHJpYyA+IHRoaXMubWF4VHJhY2tpbmcpIHtcbiAgICAgICAgICB0aGlzLnRyYWNraW5nID0gdGhpcy5tYXhUcmFja2luZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRyYWNraW5nID0gdHJhY2tNZXRyaWM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5vcmlnaW5hbC5zaXplO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vYXV0b3JlZHVjZSB0cmFja2luZyBjYXNlXG4gICAgICBpZiAodHJhY2tNZXRyaWMgPCB0aGlzLm9yaWdpbmFsLnRyYWNraW5nICYmIHRoaXMuYXV0b1JlZHVjZSkge1xuICAgICAgICBpZiAodGhpcy5tYXhUcmFja2luZyAhPSBudWxsICYmIHRyYWNrTWV0cmljID4gdGhpcy5tYXhUcmFja2luZykge1xuICAgICAgICAgIHRoaXMudHJhY2tpbmcgPSB0aGlzLm1heFRyYWNraW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudHJhY2tpbmcgPSB0cmFja01ldHJpYztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLm9yaWdpbmFsLnNpemU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vcGxhY2UgY2hhcmFjdGVycyBpbiB3b3Jkc1xuICBjaGFyYWN0ZXJMYXlvdXQoKTogYm9vbGVhbiB7XG4gICAgLy9jaGFyIGxheW91dFxuICAgIGxldCBsZW4gPSB0aGlzLnRleHQubGVuZ3RoO1xuICAgIGxldCBjaGFyOiBDaGFyYWN0ZXI7XG4gICAgY29uc3QgZGVmYXVsdFN0eWxlOiBTdHlsZSA9IHtcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSxcbiAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICAgIHRyYWNraW5nOiB0aGlzLnRyYWNraW5nLFxuICAgICAgY2hhcmFjdGVyQ2FzZTogdGhpcy5jaGFyYWN0ZXJDYXNlLFxuICAgICAgZmlsbENvbG9yOiB0aGlzLmZpbGxDb2xvcixcbiAgICAgIHN0cm9rZUNvbG9yOiB0aGlzLnN0cm9rZUNvbG9yLFxuICAgICAgc3Ryb2tlV2lkdGg6IHRoaXMuc3Ryb2tlV2lkdGhcbiAgICB9O1xuICAgIGxldCBjdXJyZW50U3R5bGUgPSBkZWZhdWx0U3R5bGU7XG4gICAgbGV0IGhQb3NpdGlvbiA9IDA7XG5cbiAgICAvLyBsb29wIG92ZXIgY2hhcmFjdGVyc1xuICAgIC8vIHBsYWNlIGludG8gbGluZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSAhPT0gbnVsbCAmJiB0aGlzLnN0eWxlW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudFN0eWxlID0gdGhpcy5zdHlsZVtpXTtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHN0eWxlIGNvbnRhaW5zIHByb3BlcnRpZXMgbmVlZGVkLlxuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnNpemUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuc2l6ZSA9IGRlZmF1bHRTdHlsZS5zaXplO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmZvbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuZm9udCA9IGRlZmF1bHRTdHlsZS5mb250O1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnRyYWNraW5nID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnRyYWNraW5nID0gZGVmYXVsdFN0eWxlLnRyYWNraW5nO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmNoYXJhY3RlckNhc2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuY2hhcmFjdGVyQ2FzZSA9IGRlZmF1bHRTdHlsZS5jaGFyYWN0ZXJDYXNlO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLmZpbGxDb2xvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5maWxsQ29sb3IgPSBkZWZhdWx0U3R5bGUuZmlsbENvbG9yO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnN0cm9rZUNvbG9yID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnN0cm9rZUNvbG9yID0gZGVmYXVsdFN0eWxlLnN0cm9rZUNvbG9yO1xuICAgICAgICBpZiAoY3VycmVudFN0eWxlLnN0cm9rZVdpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnN0cm9rZVdpZHRoID0gZGVmYXVsdFN0eWxlLnN0cm9rZVdpZHRoO1xuICAgICAgfVxuXG4gICAgICAvLyBuZXdsaW5lXG4gICAgICBpZiAodGhpcy50ZXh0LmNoYXJBdChpKSA9PSBcIlxcblwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvL3J1bnRpbWUgdGVzdCBmb3IgZm9udFxuICAgICAgaWYgKEZvbnRMb2FkZXIuaXNMb2FkZWQoY3VycmVudFN0eWxlLmZvbnQpID09PSBmYWxzZSkge1xuICAgICAgICBGb250TG9hZGVyLmxvYWQodGhpcywgW2N1cnJlbnRTdHlsZS5mb250XSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy9pbml0YWxpemUgd2l0aCBpbml0aWFsVHJhY2tpbmcgYW5kIGluaXRpYWxPZmZzZXQ7XG4gICAgICBpZiAoaFBvc2l0aW9uID09IDApIHtcbiAgICAgICAgaFBvc2l0aW9uID1cbiAgICAgICAgICB0aGlzLmluaXRpYWxPZmZzZXQgK1xuICAgICAgICAgIHRoaXMudHJhY2tpbmdPZmZzZXQoXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxUcmFja2luZyxcbiAgICAgICAgICAgIGN1cnJlbnRTdHlsZS5zaXplLFxuICAgICAgICAgICAgRm9udExvYWRlci5nZXRGb250KGN1cnJlbnRTdHlsZS5mb250KS51bml0c1xuICAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBjaGFyYWN0ZXJcbiAgICAgIGNoYXIgPSBuZXcgQ2hhcmFjdGVyKHRoaXMudGV4dC5jaGFyQXQoaSksIGN1cnJlbnRTdHlsZSwgaSk7XG4gICAgICBpZiAodGhpcy5vcmlnaW5hbC5jaGFyYWN0ZXIpIHtcbiAgICAgICAgYXBwbHlTaGFwZUV2ZW50TGlzdGVuZXJzKHRoaXMub3JpZ2luYWwuY2hhcmFjdGVyLCBjaGFyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIubWlzc2luZykge1xuICAgICAgICBpZiAodGhpcy5taXNzaW5nR2x5cGhzID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLm1pc3NpbmdHbHlwaHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pc3NpbmdHbHlwaHMucHVzaCh7XG4gICAgICAgICAgcG9zaXRpb246IGksXG4gICAgICAgICAgY2hhcmFjdGVyOiB0aGlzLnRleHQuY2hhckF0KGkpLFxuICAgICAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvL3N3YXAgY2hhcmFjdGVyIGlmIGxpZ2F0dXJlXG4gICAgICAvL2xpZ2F0dXJlcyByZW1vdmVkIGlmIHRyYWNraW5nIG9yIHRoaXMubGlnYXR1cmVzIGlzIGZhbHNlXG4gICAgICBpZiAoY3VycmVudFN0eWxlLnRyYWNraW5nID09IDAgJiYgdGhpcy5saWdhdHVyZXMgPT0gdHJ1ZSkge1xuICAgICAgICAvLzEgY2hhciBtYXRjaFxuICAgICAgICBjb25zdCBsaWdUYXJnZXQgPSB0aGlzLnRleHQuc3Vic3RyKGksIDQpO1xuICAgICAgICBpZiAoY2hhci5fZm9udC5saWdhdHVyZXNbbGlnVGFyZ2V0LmNoYXJBdCgwKV0pIHtcbiAgICAgICAgICAvLzIgY2hhciBtYXRjaFxuICAgICAgICAgIGlmIChjaGFyLl9mb250LmxpZ2F0dXJlc1tsaWdUYXJnZXQuY2hhckF0KDApXVtsaWdUYXJnZXQuY2hhckF0KDEpXSkge1xuICAgICAgICAgICAgLy8zIGNoYXIgbWF0Y2hcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2hhci5fZm9udC5saWdhdHVyZXNbbGlnVGFyZ2V0LmNoYXJBdCgwKV1bbGlnVGFyZ2V0LmNoYXJBdCgxKV1bXG4gICAgICAgICAgICAgICAgbGlnVGFyZ2V0LmNoYXJBdCgyKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgLy80IGNoYXIgbWF0Y2hcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNoYXIuX2ZvbnQubGlnYXR1cmVzW2xpZ1RhcmdldC5jaGFyQXQoMCldW2xpZ1RhcmdldC5jaGFyQXQoMSldW1xuICAgICAgICAgICAgICAgICAgbGlnVGFyZ2V0LmNoYXJBdCgyKVxuICAgICAgICAgICAgICAgIF1bbGlnVGFyZ2V0LmNoYXJBdCgzKV1cbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy9zd2FwIDQgY2hhciBsaWdhdHVyZVxuICAgICAgICAgICAgICAgIGNoYXIuc2V0R2x5cGgoXG4gICAgICAgICAgICAgICAgICBjaGFyLl9mb250LmxpZ2F0dXJlc1tsaWdUYXJnZXQuY2hhckF0KDApXVtcbiAgICAgICAgICAgICAgICAgICAgbGlnVGFyZ2V0LmNoYXJBdCgxKVxuICAgICAgICAgICAgICAgICAgXVtsaWdUYXJnZXQuY2hhckF0KDIpXVtsaWdUYXJnZXQuY2hhckF0KDMpXS5nbHlwaFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaSA9IGkgKyAzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vc3dhcCAzIGNoYXIgbGlnYXR1cmVcbiAgICAgICAgICAgICAgICBjaGFyLnNldEdseXBoKFxuICAgICAgICAgICAgICAgICAgY2hhci5fZm9udC5saWdhdHVyZXNbbGlnVGFyZ2V0LmNoYXJBdCgwKV1bXG4gICAgICAgICAgICAgICAgICAgIGxpZ1RhcmdldC5jaGFyQXQoMSlcbiAgICAgICAgICAgICAgICAgIF1bbGlnVGFyZ2V0LmNoYXJBdCgyKV0uZ2x5cGhcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGkgPSBpICsgMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9zd2FwIDIgY2hhciBsaWdhdHVyZVxuICAgICAgICAgICAgICBjaGFyLnNldEdseXBoKFxuICAgICAgICAgICAgICAgIGNoYXIuX2ZvbnQubGlnYXR1cmVzW2xpZ1RhcmdldC5jaGFyQXQoMCldW2xpZ1RhcmdldC5jaGFyQXQoMSldXG4gICAgICAgICAgICAgICAgICAuZ2x5cGhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaSA9IGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2NoYXIuaFBvc2l0aW9uID0gaFBvc2l0aW9uO1xuXG4gICAgICAvLyBwdXNoIGNoYXJhY3RlciBpbnRvIGJsb2NrXG4gICAgICAvL3RoaXMuY2hhcmFjdGVycy5wdXNoKCBjaGFyICk7XG4gICAgICAvL3RoaXMuYmxvY2suYWRkQ2hpbGQoIGNoYXIgKTtcblxuICAgICAgaWYgKHRoaXMub3ZlcnNldCA9PSB0cnVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5tZWFzdXJlZCA9PSB0cnVlICYmXG4gICAgICAgIGhQb3NpdGlvbiArIGNoYXIubWVhc3VyZWRXaWR0aCA+IHRoaXMuZ2V0V2lkdGgoKSAmJlxuICAgICAgICB0aGlzLm92ZXJzZXRQb3RlbnRpYWwgPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIC8vY2hhci5oUG9zaXRpb24gPSBoUG9zaXRpb247XG4gICAgICAgIC8vdGhpcy5jaGFyYWN0ZXJzLnB1c2goIGNoYXIgKTtcbiAgICAgICAgLy90aGlzLmJsb2NrLmFkZENoaWxkKCBjaGFyICk7XG5cbiAgICAgICAgLy90aGlzLmJsb2NrLnJlbW92ZUNoaWxkKHRoaXMuY2hhcmFjdGVycy5wb3AoKSApO1xuICAgICAgICB0aGlzLm92ZXJzZXRJbmRleCA9IGk7XG4gICAgICAgIHRoaXMub3ZlcnNldCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5tZWFzdXJlZCA9PSBmYWxzZSAmJlxuICAgICAgICBoUG9zaXRpb24gKyBjaGFyLm1lYXN1cmVkV2lkdGggPiB0aGlzLmdldFdpZHRoKClcbiAgICAgICkge1xuICAgICAgICAvL2NoYXIuaFBvc2l0aW9uID0gaFBvc2l0aW9uO1xuICAgICAgICAvL3RoaXMuY2hhcmFjdGVycy5wdXNoKCBjaGFyICk7XG4gICAgICAgIC8vdGhpcy5ibG9jay5hZGRDaGlsZCggY2hhciApO1xuXG4gICAgICAgIC8vdGhpcy5ibG9jay5yZW1vdmVDaGlsZCh0aGlzLmNoYXJhY3RlcnMucG9wKCkgKTtcbiAgICAgICAgdGhpcy5vdmVyc2V0SW5kZXggPSBpO1xuICAgICAgICB0aGlzLm92ZXJzZXQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYXIuaFBvc2l0aW9uID0gaFBvc2l0aW9uO1xuICAgICAgICB0aGlzLmNoYXJhY3RlcnMucHVzaChjaGFyKTtcbiAgICAgICAgdGhpcy5ibG9jay5hZGRDaGlsZChjaGFyKTtcbiAgICAgIH1cblxuICAgICAgLy9jaGFyLnggPSBoUG9zaXRpb247XG4gICAgICBoUG9zaXRpb24gPVxuICAgICAgICBoUG9zaXRpb24gK1xuICAgICAgICBjaGFyLl9nbHlwaC5vZmZzZXQgKiBjaGFyLnNpemUgK1xuICAgICAgICBjaGFyLmNoYXJhY3RlckNhc2VPZmZzZXQgK1xuICAgICAgICBjaGFyLnRyYWNraW5nT2Zmc2V0KCkgK1xuICAgICAgICBjaGFyLl9nbHlwaC5nZXRLZXJuaW5nKHRoaXMuZ2V0Q2hhckNvZGVBdChpICsgMSksIGNoYXIuc2l6ZSk7XG4gICAgfVxuXG4gICAgbGVuID0gdGhpcy5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBsZXQgcGF0aFBvaW50OiBhbnk7XG4gICAgbGV0IG5leHRSb3RhdGlvbiA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNoYXIgPSB0aGlzLmNoYXJhY3RlcnNbaV0gYXMgQ2hhcmFjdGVyO1xuICAgICAgcGF0aFBvaW50ID0gdGhpcy5wYXRoUG9pbnRzLmdldFBhdGhQb2ludChcbiAgICAgICAgY2hhci5oUG9zaXRpb24sXG4gICAgICAgIGhQb3NpdGlvbixcbiAgICAgICAgY2hhci5fZ2x5cGgub2Zmc2V0ICogY2hhci5zaXplXG4gICAgICApO1xuICAgICAgLy9jb3JyZWN0IHJvdGF0aW9uIGFyb3VuZCBsaW5lc2VnbWVudHNcbiAgICAgIGlmIChuZXh0Um90YXRpb24gPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNoYXJhY3RlcnNbaSAtIDFdLnBhcmVudC5yb3RhdGlvbiA9IHBhdGhQb2ludC5yb3RhdGlvbjtcbiAgICAgICAgbmV4dFJvdGF0aW9uID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGF0aFBvaW50Lm5leHQgPT0gdHJ1ZSkge1xuICAgICAgICBuZXh0Um90YXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjaGFyLnJvdGF0aW9uID0gcGF0aFBvaW50LnJvdGF0aW9uO1xuXG4gICAgICAvL0Jhc2VsaW5lXG4gICAgICBpZiAodGhpcy52YWxpZ24gPT0gVmVydGljYWxBbGlnbi5CYXNlTGluZSkge1xuICAgICAgICBjaGFyLnggPSBwYXRoUG9pbnQueDtcbiAgICAgICAgY2hhci55ID0gcGF0aFBvaW50Lnk7XG5cbiAgICAgICAgLy9yZXBhcmVudCBjaGlsZCBpbnRvIG9mZnNldCBjb250YWluZXJcbiAgICAgICAgaWYgKHBhdGhQb2ludC5vZmZzZXRYKSB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0Q2hpbGQgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgICAgICAgb2Zmc2V0Q2hpbGQueCA9IHBhdGhQb2ludC54O1xuICAgICAgICAgIG9mZnNldENoaWxkLnkgPSBwYXRoUG9pbnQueTtcbiAgICAgICAgICBvZmZzZXRDaGlsZC5yb3RhdGlvbiA9IHBhdGhQb2ludC5yb3RhdGlvbjtcbiAgICAgICAgICBjaGFyLnBhcmVudC5yZW1vdmVDaGlsZChjaGFyKTtcbiAgICAgICAgICBvZmZzZXRDaGlsZC5hZGRDaGlsZChjaGFyKTtcbiAgICAgICAgICBjaGFyLnggPSBwYXRoUG9pbnQub2Zmc2V0WDtcbiAgICAgICAgICBjaGFyLnkgPSAwO1xuICAgICAgICAgIGNoYXIucm90YXRpb24gPSAwO1xuICAgICAgICAgIHRoaXMuYWRkQ2hpbGQob2Zmc2V0Q2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYXIueCA9IHBhdGhQb2ludC54O1xuICAgICAgICAgIGNoYXIueSA9IHBhdGhQb2ludC55O1xuICAgICAgICAgIGNoYXIucm90YXRpb24gPSBwYXRoUG9pbnQucm90YXRpb247XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9mZnNldENoaWxkID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgICAgICBvZmZzZXRDaGlsZC54ID0gcGF0aFBvaW50Lng7XG4gICAgICAgIG9mZnNldENoaWxkLnkgPSBwYXRoUG9pbnQueTtcbiAgICAgICAgb2Zmc2V0Q2hpbGQucm90YXRpb24gPSBwYXRoUG9pbnQucm90YXRpb247XG4gICAgICAgIGNoYXIucGFyZW50LnJlbW92ZUNoaWxkKGNoYXIpO1xuICAgICAgICBvZmZzZXRDaGlsZC5hZGRDaGlsZChjaGFyKTtcbiAgICAgICAgY2hhci54ID0gMDtcblxuICAgICAgICAvL3ZlcnRpY2FsIGFsaWdubWVudFxuICAgICAgICBpZiAodGhpcy52YWxpZ24gPT0gVmVydGljYWxBbGlnbi5Ub3ApIHtcbiAgICAgICAgICBjaGFyLnkgPSBjaGFyLnNpemU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWxpZ24gPT0gVmVydGljYWxBbGlnbi5Cb3R0b20pIHtcbiAgICAgICAgICBjaGFyLnkgPSAoY2hhci5fZm9udC5kZXNjZW50IC8gY2hhci5fZm9udC51bml0cykgKiBjaGFyLnNpemU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWxpZ24gPT0gVmVydGljYWxBbGlnbi5DYXBIZWlnaHQpIHtcbiAgICAgICAgICBjaGFyLnkgPSAoY2hhci5fZm9udFtcImNhcC1oZWlnaHRcIl0gLyBjaGFyLl9mb250LnVuaXRzKSAqIGNoYXIuc2l6ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbGlnbiA9PSBWZXJ0aWNhbEFsaWduLlhIZWlnaHQpIHtcbiAgICAgICAgICBjaGFyLnkgPSAoY2hhci5fZm9udFtcIngtaGVpZ2h0XCJdIC8gY2hhci5fZm9udC51bml0cykgKiBjaGFyLnNpemU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWxpZ24gPT0gVmVydGljYWxBbGlnbi5Bc2NlbnQpIHtcbiAgICAgICAgICBjaGFyLnkgPSAoY2hhci5fZm9udC5hc2NlbnQgLyBjaGFyLl9mb250LnVuaXRzKSAqIGNoYXIuc2l6ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbGlnbiA9PSBWZXJ0aWNhbEFsaWduLkNlbnRlcikge1xuICAgICAgICAgIGNoYXIueSA9XG4gICAgICAgICAgICAoKGNoYXIuX2ZvbnRbXCJjYXAtaGVpZ2h0XCJdIC8gY2hhci5fZm9udC51bml0cykgKiBjaGFyLnNpemUpIC8gMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbGlnbiA9PSBWZXJ0aWNhbEFsaWduLlBlcmNlbnQpIHtcbiAgICAgICAgICBjaGFyLnkgPSB0aGlzLnZhbGlnblBlcmNlbnQgKiBjaGFyLnNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhci55ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjaGFyLnJvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChvZmZzZXRDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3JpZ2luYWwuYmxvY2spIHtcbiAgICAgIGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyh0aGlzLm9yaWdpbmFsLmJsb2NrLCB0aGlzLmJsb2NrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRyYWNraW5nT2Zmc2V0KHRyYWNraW5nOiBudW1iZXIsIHNpemU6IG51bWJlciwgdW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHNpemUgKiAoMi41IC8gdW5pdHMgKyAxIC8gOTAwICsgdHJhY2tpbmcgLyA5OTApO1xuICB9XG5cbiAgb2Zmc2V0VHJhY2tpbmcob2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlciwgdW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKChvZmZzZXQgLSAyLjUgLyB1bml0cyAtIDEgLyA5MDApICogOTkwKSAvIHNpemUpO1xuICB9XG59XG4iXX0=