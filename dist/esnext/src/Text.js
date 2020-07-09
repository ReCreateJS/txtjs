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
import Word from "./Word";
import Line from "./Line";
import Character from "./Character";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this) || this;
        _this.lineHeight = null;
        _this.width = 100;
        _this.height = 20;
        _this.align = Align.TOP_LEFT;
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
                applyShapeEventListeners(this.original.word, currentWord);
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
        var a = Align;
        var fnt = FontLoader.getFont(this.font);
        var len = this.lines.length;
        for (var i = 0; i < len; i++) {
            line = this.lines[i];
            if (this.original.line) {
                applyShapeEventListeners(this.original.line, line);
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
            applyShapeEventListeners(this.original.block, this.block);
        }
    };
    return Text;
}(TextContainer));
export default Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxRQUFRLENBQUM7QUFHMUIsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sd0JBQXdCLE1BQU0scUNBQXFDLENBQUM7QUFFM0U7SUFBa0Msd0JBQWE7SUFtQjdDLGNBQVksS0FBMEI7UUFBMUIsc0JBQUEsRUFBQSxZQUEwQjtRQUF0QyxZQUNFLGlCQUFPLFNBTVI7UUF6QkQsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsV0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNaLFlBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixXQUFLLEdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUMvQixVQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLFdBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxXQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFdBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsbUJBQWEsR0FBVSxJQUFJLENBQUM7UUFDNUIsaUJBQVcsR0FBRyxJQUFJLENBQUM7UUFJakIsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FB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QUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFH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VGV4dENvbnRhaW5lciBmcm9tIFwiLi9UZXh0Q29udGFpbmVyXCI7XG5pbXBvcnQgQWxpZ24gZnJvbSBcIi4vQWxpZ25cIjtcbmltcG9ydCBGb250TG9hZGVyIGZyb20gXCIuL0ZvbnRMb2FkZXJcIjtcbmltcG9ydCBXb3JkIGZyb20gXCIuL1dvcmRcIjtcbmltcG9ydCBMaW5lIGZyb20gXCIuL0xpbmVcIjtcbmltcG9ydCBGb250IGZyb20gXCIuL0ZvbnRcIjtcbmltcG9ydCB7IENvbnN0cnVjdE9iaiwgU3R5bGUgfSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gXCIuL0NoYXJhY3RlclwiO1xuaW1wb3J0IGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyBmcm9tIFwiLi91dGlscy9hcHBseS1zaGFwZS1ldmVudC1saXN0ZW5lcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFRleHRDb250YWluZXIge1xuICBsaW5lSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICB3aWR0aCA9IDEwMDtcbiAgaGVpZ2h0ID0gMjA7XG4gIGFsaWduOiBudW1iZXIgPSBBbGlnbi5UT1BfTEVGVDtcbiAgc2l6ZSA9IDEyO1xuICB0cmFja2luZyA9IDA7XG4gIGxpZ2F0dXJlcyA9IGZhbHNlO1xuICBmaWxsQ29sb3IgPSBcIiMwMDBcIjtcbiAgc3Ryb2tlQ29sb3I6IHN0cmluZyA9IG51bGw7XG4gIHN0cm9rZVdpZHRoOiBudW1iZXIgPSBudWxsO1xuICBsb2FkZXJJZDogbnVtYmVyID0gbnVsbDtcbiAgZGVidWcgPSBmYWxzZTtcbiAgd29yZHM6IFdvcmRbXSA9IFtdO1xuICBsaW5lczogTGluZVtdID0gW107XG4gIGJsb2NrOiBjcmVhdGVqcy5Db250YWluZXI7XG4gIG1pc3NpbmdHbHlwaHM6IGFueVtdID0gbnVsbDtcbiAgcmVuZGVyQ3ljbGUgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBDb25zdHJ1Y3RPYmogPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMub3JpZ2luYWwgPSBwcm9wcztcbiAgICAgIHRoaXMuc2V0KHByb3BzKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkRm9udHMoKTtcbiAgfVxuXG4gIGdldEJvdW5kcygpOiBjcmVhdGVqcy5SZWN0YW5nbGUge1xuICAgIC8vIFRPRE86IG9idGFpbiBpbnRlcnNlY3RlZCBib3VuZHMgb2YgdGhlIGNoYXJhY3RlcnMvd29yZHMgaW4gaGVyZVxuXG4gICAgcmV0dXJuIG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICB0aGlzLmFkZEFjY2Vzc2liaWxpdHkoKTtcbiAgICB0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZSgvKFtcXG5dWyBcXHRdKykvZywgXCJcXG5cIik7XG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIHRoaXMubGluZXMgPSBbXTtcbiAgICB0aGlzLm1pc3NpbmdHbHlwaHMgPSBudWxsO1xuICAgIC8vIFRPRE8gLSByZW1vdmUgY29tcG9zaXRlIGxheW91dFxuICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcblxuICAgIHRoaXMuYmxvY2sgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJsb2NrKTtcblxuICAgIGlmICh0aGlzLmRlYnVnID09IHRydWUpIHtcbiAgICAgIHRoaXMuYWRkRGVidWdMYXlvdXQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50ZXh0ID09PSBcIlwiIHx8IHRoaXMudGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXJhY3RlckxheW91dCgpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlbmRlckN5Y2xlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMud29yZExheW91dCgpO1xuICAgIHRoaXMubGluZUxheW91dCgpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBiYXNlbGluZSwgYXNjZW50LCBhc2NlbmRlciwgYW5kIGRlc2NlbmRlciBsaW5lc1xuICAgKi9cbiAgcHJpdmF0ZSBhZGREZWJ1Z0xheW91dCgpIHtcbiAgICBjb25zdCBmb250OiBGb250ID0gRm9udExvYWRlci5nZXRGb250KHRoaXMuZm9udCk7XG4gICAgLy9vdXRsaW5lXG4gICAgbGV0IHMgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBzLmdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiI0ZGMDAwMFwiKTtcbiAgICBzLmdyYXBoaWNzLnNldFN0cm9rZVN0eWxlKDEuMik7XG4gICAgcy5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5hZGRDaGlsZChzKTtcbiAgICAvL2Jhc2VsaW5lXG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzAwMFwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIHRoaXMud2lkdGgsIDAuMik7XG4gICAgcy54ID0gMDtcbiAgICBzLnkgPSAwO1xuICAgIHRoaXMuYmxvY2suYWRkQ2hpbGQocyk7XG4gICAgcyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHMuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI0YwMFwiKTtcbiAgICBzLmdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIHRoaXMud2lkdGgsIDAuMik7XG4gICAgcy54ID0gMDtcbiAgICBzLnkgPSAoLWZvbnRbXCJjYXAtaGVpZ2h0XCJdIC8gZm9udC51bml0cykgKiB0aGlzLnNpemU7XG4gICAgdGhpcy5ibG9jay5hZGRDaGlsZChzKTtcbiAgICBzID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgcy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMEYwXCIpO1xuICAgIHMuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgdGhpcy53aWR0aCwgMC4yKTtcbiAgICBzLnggPSAwO1xuICAgIHMueSA9ICgtZm9udC5hc2NlbnQgLyBmb250LnVuaXRzKSAqIHRoaXMuc2l6ZTtcbiAgICB0aGlzLmJsb2NrLmFkZENoaWxkKHMpO1xuICAgIHMgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBzLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMwMEZcIik7XG4gICAgcy5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB0aGlzLndpZHRoLCAwLjIpO1xuICAgIHMueCA9IDA7XG4gICAgcy55ID0gKC1mb250LmRlc2NlbnQgLyBmb250LnVuaXRzKSAqIHRoaXMuc2l6ZTtcbiAgICB0aGlzLmJsb2NrLmFkZENoaWxkKHMpO1xuICB9XG5cbiAgLy9wbGFjZSBjaGFyYWN0ZXJzIGluIHdvcmRzXG4gIGNoYXJhY3RlckxheW91dCgpOiBib29sZWFuIHtcbiAgICAvL2NoYXJhY3RlcmxheW91dCBhZGRzIENoYXJjdGVycyB0byB3b3JkcyBhbmQgbWVhc3VyZXMgdHJ1ZSBoZWlnaHQuIExpbmVIZWlnaHQgaXMgbm90IGEgZmFjdG9yIHRpbCBMaW5lIGxheW91dC5cblxuICAgIC8vY2hhciBsYXlvdXRcbiAgICBjb25zdCBsZW4gPSB0aGlzLnRleHQubGVuZ3RoO1xuICAgIGxldCBjaGFyOiBDaGFyYWN0ZXI7XG4gICAgY29uc3QgZGVmYXVsdFN0eWxlOiBTdHlsZSA9IHtcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSxcbiAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICAgIHRyYWNraW5nOiB0aGlzLnRyYWNraW5nLFxuICAgICAgY2hhcmFjdGVyQ2FzZTogdGhpcy5jaGFyYWN0ZXJDYXNlLFxuICAgICAgZmlsbENvbG9yOiB0aGlzLmZpbGxDb2xvcixcbiAgICAgIHN0cm9rZUNvbG9yOiB0aGlzLnN0cm9rZUNvbG9yLFxuICAgICAgc3Ryb2tlV2lkdGg6IHRoaXMuc3Ryb2tlV2lkdGhcbiAgICB9O1xuICAgIGxldCBjdXJyZW50U3R5bGUgPSBkZWZhdWx0U3R5bGU7XG4gICAgbGV0IGhQb3NpdGlvbiA9IDA7XG4gICAgbGV0IHZQb3NpdGlvbiA9IDA7XG5cbiAgICBsZXQgY3VycmVudFdvcmQ6IFdvcmQgPSBuZXcgV29yZCgpO1xuICAgIC8vIHB1c2ggYSBuZXcgd29yZCB0byBjYXB0dXJlIGNoYXJhY3RlcnNcbiAgICB0aGlzLndvcmRzLnB1c2goY3VycmVudFdvcmQpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGNoYXJhY3RlcnNcbiAgICAvLyBwbGFjZSBpbnRvIHdvcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuc3R5bGUgIT09IG51bGwgJiYgdGhpcy5zdHlsZVtpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGN1cnJlbnRTdHlsZSA9IHRoaXMuc3R5bGVbaV07XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBzdHlsZSBjb250YWlucyBwcm9wZXJ0aWVzIG5lZWRlZC5cbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5zaXplID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLnNpemUgPSBkZWZhdWx0U3R5bGUuc2l6ZTtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5mb250ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLmZvbnQgPSBkZWZhdWx0U3R5bGUuZm9udDtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS50cmFja2luZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS50cmFja2luZyA9IGRlZmF1bHRTdHlsZS50cmFja2luZztcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5jaGFyYWN0ZXJDYXNlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3VycmVudFN0eWxlLmNoYXJhY3RlckNhc2UgPSBkZWZhdWx0U3R5bGUuY2hhcmFjdGVyQ2FzZTtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5maWxsQ29sb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjdXJyZW50U3R5bGUuZmlsbENvbG9yID0gZGVmYXVsdFN0eWxlLmZpbGxDb2xvcjtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5zdHJva2VDb2xvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5zdHJva2VDb2xvciA9IGRlZmF1bHRTdHlsZS5zdHJva2VDb2xvcjtcbiAgICAgICAgaWYgKGN1cnJlbnRTdHlsZS5zdHJva2VXaWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN1cnJlbnRTdHlsZS5zdHJva2VXaWR0aCA9IGRlZmF1bHRTdHlsZS5zdHJva2VXaWR0aDtcbiAgICAgIH1cblxuICAgICAgLy8gbmV3bGluZVxuICAgICAgLy8gbWFyayB3b3JkIGFzIGhhdmluZyBuZXdsaW5lXG4gICAgICAvLyBjcmVhdGUgbmV3IHdvcmRcbiAgICAgIC8vIG5ldyBsaW5lIGhhcyBubyBjaGFyYWN0ZXJcbiAgICAgIGlmICh0aGlzLnRleHQuY2hhckF0KGkpID09IFwiXFxuXCIpIHtcbiAgICAgICAgLy9vbmx5IGlmIG5vdCBsYXN0IGNoYXJcbiAgICAgICAgaWYgKGkgPCBsZW4gLSAxKSB7XG4gICAgICAgICAgY3VycmVudFdvcmQubWVhc3VyZWRXaWR0aCA9IGhQb3NpdGlvbjtcbiAgICAgICAgICBjdXJyZW50V29yZC5tZWFzdXJlZEhlaWdodCA9IHZQb3NpdGlvbjtcbiAgICAgICAgICBpZiAoY3VycmVudFdvcmQubWVhc3VyZWRIZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgY3VycmVudFdvcmQubWVhc3VyZWRIZWlnaHQgPSBjdXJyZW50U3R5bGUuc2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudFdvcmQuaGFzTmV3TGluZSA9IHRydWU7XG4gICAgICAgICAgY3VycmVudFdvcmQgPSBuZXcgV29yZCgpO1xuICAgICAgICAgIHRoaXMud29yZHMucHVzaChjdXJyZW50V29yZCk7XG4gICAgICAgICAgdlBvc2l0aW9uID0gMDtcbiAgICAgICAgICBoUG9zaXRpb24gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vcnVudGltZSB0ZXN0IGZvciBmb250XG4gICAgICBpZiAoRm9udExvYWRlci5pc0xvYWRlZChjdXJyZW50U3R5bGUuZm9udCkgPT09IGZhbHNlKSB7XG4gICAgICAgIEZvbnRMb2FkZXIubG9hZCh0aGlzLCBbY3VycmVudFN0eWxlLmZvbnRdKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgY2hhcmFjdGVyXG4gICAgICBjaGFyID0gbmV3IENoYXJhY3Rlcih0aGlzLnRleHQuY2hhckF0KGkpLCBjdXJyZW50U3R5bGUsIGkpO1xuXG4gICAgICBpZiAodGhpcy5vcmlnaW5hbC5jaGFyYWN0ZXIpIHtcbiAgICAgICAgYXBwbHlTaGFwZUV2ZW50TGlzdGVuZXJzKHRoaXMub3JpZ2luYWwuY2hhcmFjdGVyLCBjaGFyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIubWlzc2luZykge1xuICAgICAgICBpZiAodGhpcy5taXNzaW5nR2x5cGhzID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLm1pc3NpbmdHbHlwaHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pc3NpbmdHbHlwaHMucHVzaCh7XG4gICAgICAgICAgcG9zaXRpb246IGksXG4gICAgICAgICAgY2hhcmFjdGVyOiB0aGlzLnRleHQuY2hhckF0KGkpLFxuICAgICAgICAgIGZvbnQ6IGN1cnJlbnRTdHlsZS5mb250XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhci5tZWFzdXJlZEhlaWdodCA+IHZQb3NpdGlvbikge1xuICAgICAgICB2UG9zaXRpb24gPSBjaGFyLm1lYXN1cmVkSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICAvL3N3YXAgY2hhcmFjdGVyIGlmIGxpZ2F0dXJlXG4gICAgICAvL2xpZ2F0dXJlcyByZW1vdmVkIGlmIHRyYWNraW5nIG9yIHRoaXMubGlnYXR1cmVzIGlzIGZhbHNlXG4gICAgICBpZiAoY3VycmVudFN0eWxlLnRyYWNraW5nID09IDAgJiYgdGhpcy5saWdhdHVyZXMgPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBsaWdUYXJnZXQgPSB0aGlzLnRleHQuc3Vic3RyKGksIDQpO1xuICAgICAgICBpID0gaSArIHRoaXMubGlnYXR1cmVTd2FwKGNoYXIsIGxpZ1RhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIGNoYXIueCA9IGhQb3NpdGlvbjtcblxuICAgICAgLy8gcHVzaCBjaGFyYWN0ZXIgaW50byB3b3JkXG4gICAgICBjdXJyZW50V29yZC5hZGRDaGlsZChjaGFyKTtcblxuICAgICAgLy8gc3BhY2VcbiAgICAgIC8vIG1hcmsgd29yZCBhcyBoYXZpbmcgc3BhY2VcbiAgICAgIC8vIGNyZWF0ZSBuZXcgd29yZFxuICAgICAgLy8gc3BhY2UgY2hhcmFjdGVyXG4gICAgICBpZiAodGhpcy50ZXh0LmNoYXJBdChpKSA9PSBcIiBcIikge1xuICAgICAgICBjdXJyZW50V29yZC5oYXNTcGFjZSA9IHRydWU7XG4gICAgICAgIGN1cnJlbnRXb3JkLnNwYWNlT2Zmc2V0ID0gY2hhci5fZ2x5cGgub2Zmc2V0ICogY2hhci5zaXplO1xuICAgICAgICBoUG9zaXRpb24gPVxuICAgICAgICAgIGNoYXIueCArXG4gICAgICAgICAgY2hhci5fZ2x5cGgub2Zmc2V0ICogY2hhci5zaXplICtcbiAgICAgICAgICBjaGFyLmNoYXJhY3RlckNhc2VPZmZzZXQgK1xuICAgICAgICAgIGNoYXIudHJhY2tpbmdPZmZzZXQoKSArXG4gICAgICAgICAgY2hhci5fZ2x5cGguZ2V0S2VybmluZyh0aGlzLnRleHQuY2hhckNvZGVBdChpICsgMSksIGNoYXIuc2l6ZSk7XG4gICAgICAgIGN1cnJlbnRXb3JkLm1lYXN1cmVkV2lkdGggPSBoUG9zaXRpb247XG4gICAgICAgIGN1cnJlbnRXb3JkLm1lYXN1cmVkSGVpZ2h0ID0gdlBvc2l0aW9uO1xuICAgICAgICBoUG9zaXRpb24gPSAwO1xuICAgICAgICB2UG9zaXRpb24gPSAwO1xuICAgICAgICBjdXJyZW50V29yZCA9IG5ldyBXb3JkKCk7XG4gICAgICAgIHRoaXMud29yZHMucHVzaChjdXJyZW50V29yZCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBoeXBoZW5cbiAgICAgIC8vIG1hcmsgd29yZCBhcyBoYXZpbmcgaHlwaGVuXG4gICAgICAvLyBjcmVhdGUgbmV3IHdvcmRcbiAgICAgIC8vIHNwYWNlIGNoYXJhY3RlclxuICAgICAgaWYgKHRoaXMudGV4dC5jaGFyQXQoaSkgPT0gXCItXCIpIHtcbiAgICAgICAgY3VycmVudFdvcmQuaGFzSHlwaGVuID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaFBvc2l0aW9uID1cbiAgICAgICAgY2hhci54ICtcbiAgICAgICAgY2hhci5fZ2x5cGgub2Zmc2V0ICogY2hhci5zaXplICtcbiAgICAgICAgY2hhci5jaGFyYWN0ZXJDYXNlT2Zmc2V0ICtcbiAgICAgICAgY2hhci50cmFja2luZ09mZnNldCgpICtcbiAgICAgICAgY2hhci5fZ2x5cGguZ2V0S2VybmluZyh0aGlzLnRleHQuY2hhckNvZGVBdChpICsgMSksIGNoYXIuc2l6ZSk7XG4gICAgfVxuICAgIC8vY2FzZSBvZiBlbXB0eSB3b3JkIGF0IGVuZC5cbiAgICBpZiAoY3VycmVudFdvcmQuY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcbiAgICAgIGN1cnJlbnRXb3JkID0gdGhpcy53b3Jkc1t0aGlzLndvcmRzLmxlbmd0aCAtIDFdO1xuICAgICAgaFBvc2l0aW9uID0gY3VycmVudFdvcmQubWVhc3VyZWRXaWR0aDtcbiAgICAgIHZQb3NpdGlvbiA9IGN1cnJlbnRXb3JkLm1lYXN1cmVkSGVpZ2h0O1xuICAgIH1cbiAgICBjdXJyZW50V29yZC5tZWFzdXJlZFdpZHRoID0gaFBvc2l0aW9uO1xuICAgIGN1cnJlbnRXb3JkLm1lYXN1cmVkSGVpZ2h0ID0gdlBvc2l0aW9uO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvL3BsYWNlIHdvcmRzIGluIGxpbmVzXG4gIHdvcmRMYXlvdXQoKSB7XG4gICAgLy8gbG9vcCBvdmVyIHdvcmRzXG4gICAgLy8gcGxhY2UgaW50byBsaW5lc1xuICAgIGNvbnN0IGxlbiA9IHRoaXMud29yZHMubGVuZ3RoO1xuICAgIGxldCBjdXJyZW50TGluZSA9IG5ldyBMaW5lKCk7XG4gICAgdGhpcy5saW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcblxuICAgIGN1cnJlbnRMaW5lLnkgPSAwO1xuXG4gICAgbGV0IGN1cnJlbnRXb3JkOiBXb3JkO1xuICAgIGxldCBsYXN0SGVpZ2h0OiBudW1iZXI7XG5cbiAgICB0aGlzLmJsb2NrLmFkZENoaWxkKGN1cnJlbnRMaW5lKTtcbiAgICBsZXQgaFBvc2l0aW9uID0gMDtcbiAgICBsZXQgdlBvc2l0aW9uID0gMDtcbiAgICBsZXQgZmlyc3RMaW5lID0gdHJ1ZTtcblxuICAgIGxldCBsYXN0TGluZVdvcmQ6IFdvcmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjdXJyZW50V29yZCA9IHRoaXMud29yZHNbaV07XG4gICAgICBjdXJyZW50V29yZC54ID0gaFBvc2l0aW9uO1xuXG4gICAgICBpZiAodGhpcy5vcmlnaW5hbC53b3JkKSB7XG4gICAgICAgIGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyh0aGlzLm9yaWdpbmFsLndvcmQsIGN1cnJlbnRXb3JkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0TGluZSkge1xuICAgICAgICB2UG9zaXRpb24gPSBjdXJyZW50V29yZC5tZWFzdXJlZEhlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5saW5lSGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgdlBvc2l0aW9uID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50V29yZC5tZWFzdXJlZEhlaWdodCA+IHZQb3NpdGlvbikge1xuICAgICAgICB2UG9zaXRpb24gPSBjdXJyZW50V29yZC5tZWFzdXJlZEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgLy9leGNlZWRzIGxpbmUgd2lkdGggJiYgaGFzIG5ldyBsaW5lXG4gICAgICBpZiAoXG4gICAgICAgIGhQb3NpdGlvbiArIGN1cnJlbnRXb3JkLm1lYXN1cmVkV2lkdGggPiB0aGlzLndpZHRoICYmXG4gICAgICAgIGN1cnJlbnRXb3JkLmhhc05ld0xpbmUgPT0gdHJ1ZSAmJlxuICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMubGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgbGFzdEhlaWdodCA9IGN1cnJlbnRMaW5lLnkgKyB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdEhlaWdodCA9IGN1cnJlbnRMaW5lLnkgKyB2UG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoID0gaFBvc2l0aW9uO1xuICAgICAgICBsYXN0TGluZVdvcmQgPSB0aGlzLndvcmRzW2kgLSAxXTtcblxuICAgICAgICBpZiAobGFzdExpbmVXb3JkICE9IHVuZGVmaW5lZCAmJiBsYXN0TGluZVdvcmQuaGFzU3BhY2UpIHtcbiAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoIC09IGxhc3RMaW5lV29yZC5zcGFjZU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RMaW5lID09IGZhbHNlICYmIHRoaXMubGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBmaXJzdExpbmUgPSBmYWxzZTtcbiAgICAgICAgY3VycmVudExpbmUgPSBuZXcgTGluZSgpO1xuICAgICAgICB0aGlzLmxpbmVzLnB1c2goY3VycmVudExpbmUpO1xuICAgICAgICBjdXJyZW50TGluZS55ID0gbGFzdEhlaWdodDtcbiAgICAgICAgaFBvc2l0aW9uID0gMDtcbiAgICAgICAgY3VycmVudFdvcmQueCA9IDA7XG4gICAgICAgIHRoaXMuYmxvY2suYWRkQ2hpbGQoY3VycmVudExpbmUpO1xuICAgICAgICAvL2FkZCB3b3JkXG4gICAgICAgIGNvbnN0IHN3YXBXb3JkID0gdGhpcy53b3Jkc1tpXTtcbiAgICAgICAgY3VycmVudExpbmUuYWRkQ2hpbGQoc3dhcFdvcmQpO1xuICAgICAgICBpZiAodGhpcy5saW5lSGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZEhlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZEhlaWdodCA9IHN3YXBXb3JkLm1lYXN1cmVkSGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPSBzd2FwV29yZC5tZWFzdXJlZFdpZHRoO1xuXG4gICAgICAgIC8vYWRkIG5ldyBsaW5lXG4gICAgICAgIGN1cnJlbnRMaW5lID0gbmV3IExpbmUoKTtcbiAgICAgICAgdGhpcy5saW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcbiAgICAgICAgaWYgKHRoaXMubGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudExpbmUueSA9IGxhc3RIZWlnaHQgKyB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudExpbmUueSA9IGxhc3RIZWlnaHQgKyB2UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ibG9jay5hZGRDaGlsZChjdXJyZW50TGluZSk7XG4gICAgICAgIGlmIChpIDwgbGVuIC0gMSkge1xuICAgICAgICAgIHZQb3NpdGlvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy93cmFwIHdvcmQgdG8gbmV3IGxpbmUgaWYgbGVuZ3RoXG4gICAgICBlbHNlIGlmIChcbiAgICAgICAgaFBvc2l0aW9uICsgY3VycmVudFdvcmQubWVhc3VyZWRXaWR0aCA+IHRoaXMud2lkdGggJiZcbiAgICAgICAgaSA+IDAgJiZcbiAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmVIZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgIGxhc3RIZWlnaHQgPSBjdXJyZW50TGluZS55ICsgdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3RIZWlnaHQgPSBjdXJyZW50TGluZS55ICsgdlBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPSBoUG9zaXRpb247XG4gICAgICAgIGxhc3RMaW5lV29yZCA9IHRoaXMud29yZHNbaSAtIDFdO1xuICAgICAgICBpZiAobGFzdExpbmVXb3JkICE9IHVuZGVmaW5lZCAmJiBsYXN0TGluZVdvcmQuaGFzU3BhY2UpIHtcbiAgICAgICAgICBjdXJyZW50TGluZS5tZWFzdXJlZFdpZHRoIC09IGxhc3RMaW5lV29yZC5zcGFjZU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RMaW5lID09IGZhbHNlICYmIHRoaXMubGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBmaXJzdExpbmUgPSBmYWxzZTtcbiAgICAgICAgY3VycmVudExpbmUgPSBuZXcgTGluZSgpO1xuICAgICAgICB0aGlzLmxpbmVzLnB1c2goY3VycmVudExpbmUpO1xuICAgICAgICBjdXJyZW50TGluZS55ID0gbGFzdEhlaWdodDtcbiAgICAgICAgaWYgKGkgPCBsZW4gLSAxKSB7XG4gICAgICAgICAgdlBvc2l0aW9uID0gMDtcbiAgICAgICAgfVxuICAgICAgICBoUG9zaXRpb24gPSAwO1xuICAgICAgICBjdXJyZW50V29yZC54ID0gaFBvc2l0aW9uO1xuICAgICAgICB0aGlzLmJsb2NrLmFkZENoaWxkKGN1cnJlbnRMaW5lKTtcbiAgICAgIH1cblxuICAgICAgLy93cmFwIHdvcmQgdG8gbmV3IGxpbmUgaWYgbmV3bGluZVxuICAgICAgZWxzZSBpZiAoY3VycmVudFdvcmQuaGFzTmV3TGluZSA9PSB0cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmVIZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgIGxhc3RIZWlnaHQgPSBjdXJyZW50TGluZS55ICsgdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3RIZWlnaHQgPSBjdXJyZW50TGluZS55ICsgdlBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPSBoUG9zaXRpb24gKyBjdXJyZW50V29yZC5tZWFzdXJlZFdpZHRoO1xuICAgICAgICBpZiAoZmlyc3RMaW5lID09IGZhbHNlICYmIHRoaXMubGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudExpbmUuYWRkQ2hpbGQodGhpcy53b3Jkc1tpXSk7XG5cbiAgICAgICAgZmlyc3RMaW5lID0gZmFsc2U7XG4gICAgICAgIGN1cnJlbnRMaW5lID0gbmV3IExpbmUoKTtcbiAgICAgICAgdGhpcy5saW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcbiAgICAgICAgY3VycmVudExpbmUueSA9IGxhc3RIZWlnaHQ7XG4gICAgICAgIGlmIChpIDwgbGVuIC0gMSkge1xuICAgICAgICAgIHZQb3NpdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaFBvc2l0aW9uID0gMDtcblxuICAgICAgICB0aGlzLmJsb2NrLmFkZENoaWxkKGN1cnJlbnRMaW5lKTtcblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaFBvc2l0aW9uID0gaFBvc2l0aW9uICsgY3VycmVudFdvcmQubWVhc3VyZWRXaWR0aDtcbiAgICAgIGN1cnJlbnRMaW5lLmFkZENoaWxkKHRoaXMud29yZHNbaV0pO1xuICAgIH1cblxuICAgIC8vY2FzZSBvZiBlbXB0eSB3b3JkIGF0IGVuZC5cbiAgICBpZiAoY3VycmVudExpbmUuY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcbiAgICAgIGN1cnJlbnRMaW5lID0gdGhpcy5saW5lc1t0aGlzLmxpbmVzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGN1cnJlbnRMaW5lLm1lYXN1cmVkV2lkdGggPSBoUG9zaXRpb247XG4gICAgY3VycmVudExpbmUubWVhc3VyZWRIZWlnaHQgPSB2UG9zaXRpb247XG4gIH1cblxuICBsaW5lTGF5b3V0KCkge1xuICAgIC8vIGxvb3Agb3ZlciBsaW5lc1xuICAgIC8vIHBsYWNlIGludG8gdGV4dFxuICAgIGxldCBtZWFzdXJlZEhlaWdodCA9IDA7XG4gICAgbGV0IGxpbmU7XG4gICAgY29uc3QgYSA9IEFsaWduO1xuICAgIGNvbnN0IGZudDogRm9udCA9IEZvbnRMb2FkZXIuZ2V0Rm9udCh0aGlzLmZvbnQpO1xuXG4gICAgY29uc3QgbGVuID0gdGhpcy5saW5lcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGluZSA9IHRoaXMubGluZXNbaV07XG5cbiAgICAgIGlmICh0aGlzLm9yaWdpbmFsLmxpbmUpIHtcbiAgICAgICAgYXBwbHlTaGFwZUV2ZW50TGlzdGVuZXJzKHRoaXMub3JpZ2luYWwubGluZSwgbGluZSk7XG4gICAgICB9XG5cbiAgICAgIC8vY29ycmVjdCBtZWFzdXJlZFdpZHRoIGlmIGxhc3QgbGluZSBjaGFyYWN0ZXIgY29udGFpbnMgdHJhY2tpbmdcbiAgICAgIGlmIChsaW5lLmxhc3RXb3JkKCkgIT0gdW5kZWZpbmVkICYmIGxpbmUubGFzdFdvcmQoKS5sYXN0Q2hhcmFjdGVyKCkpIHtcbiAgICAgICAgbGluZS5tZWFzdXJlZFdpZHRoIC09IGxpbmVcbiAgICAgICAgICAubGFzdFdvcmQoKVxuICAgICAgICAgIC5sYXN0Q2hhcmFjdGVyKClcbiAgICAgICAgICAudHJhY2tpbmdPZmZzZXQoKTtcbiAgICAgIH1cblxuICAgICAgbWVhc3VyZWRIZWlnaHQgKz0gbGluZS5tZWFzdXJlZEhlaWdodDtcbiAgICAgIGlmICh0aGlzLmFsaWduID09PSBhLlRPUF9DRU5URVIpIHtcbiAgICAgICAgLy9tb3ZlIHRvIGNlbnRlclxuICAgICAgICBsaW5lLnggPSAodGhpcy53aWR0aCAtIGxpbmUubWVhc3VyZWRXaWR0aCkgLyAyO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09PSBhLlRPUF9SSUdIVCkge1xuICAgICAgICAvL21vdmUgdG8gcmlnaHRcbiAgICAgICAgbGluZS54ID0gdGhpcy53aWR0aCAtIGxpbmUubWVhc3VyZWRXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PT0gYS5NSURETEVfQ0VOVEVSKSB7XG4gICAgICAgIC8vbW92ZSB0byBjZW50ZXJcbiAgICAgICAgbGluZS54ID0gKHRoaXMud2lkdGggLSBsaW5lLm1lYXN1cmVkV2lkdGgpIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PT0gYS5NSURETEVfUklHSFQpIHtcbiAgICAgICAgLy9tb3ZlIHRvIHJpZ2h0XG4gICAgICAgIGxpbmUueCA9IHRoaXMud2lkdGggLSBsaW5lLm1lYXN1cmVkV2lkdGg7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT09IGEuQk9UVE9NX0NFTlRFUikge1xuICAgICAgICAvL21vdmUgdG8gY2VudGVyXG4gICAgICAgIGxpbmUueCA9ICh0aGlzLndpZHRoIC0gbGluZS5tZWFzdXJlZFdpZHRoKSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT09IGEuQk9UVE9NX1JJR0hUKSB7XG4gICAgICAgIC8vbW92ZSB0byByaWdodFxuICAgICAgICBsaW5lLnggPSB0aGlzLndpZHRoIC0gbGluZS5tZWFzdXJlZFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vVE9QIEFMSUdORURcbiAgICBpZiAoXG4gICAgICB0aGlzLmFsaWduID09PSBhLlRPUF9MRUZUIHx8XG4gICAgICB0aGlzLmFsaWduID09PSBhLlRPUF9DRU5URVIgfHxcbiAgICAgIHRoaXMuYWxpZ24gPT09IGEuVE9QX1JJR0hUXG4gICAgKSB7XG4gICAgICB0aGlzLmJsb2NrLnkgPVxuICAgICAgICAodGhpcy5saW5lc1swXS5tZWFzdXJlZEhlaWdodCAqIGZudC5hc2NlbnQpIC8gZm50LnVuaXRzICtcbiAgICAgICAgKHRoaXMubGluZXNbMF0ubWVhc3VyZWRIZWlnaHQgKiBmbnQudG9wKSAvIGZudC51bml0cztcblxuICAgICAgLy9NSURETEUgQUxJR05FRFxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLmFsaWduID09PSBhLk1JRERMRV9MRUZUIHx8XG4gICAgICB0aGlzLmFsaWduID09PSBhLk1JRERMRV9DRU5URVIgfHxcbiAgICAgIHRoaXMuYWxpZ24gPT09IGEuTUlERExFX1JJR0hUXG4gICAgKSB7XG4gICAgICB0aGlzLmJsb2NrLnkgPVxuICAgICAgICB0aGlzLmxpbmVzWzBdLm1lYXN1cmVkSGVpZ2h0ICtcbiAgICAgICAgKHRoaXMuaGVpZ2h0IC0gbWVhc3VyZWRIZWlnaHQpIC8gMiArXG4gICAgICAgICh0aGlzLmxpbmVzWzBdLm1lYXN1cmVkSGVpZ2h0ICogZm50Lm1pZGRsZSkgLyBmbnQudW5pdHM7XG5cbiAgICAgIC8vQk9UVE9NIEFMSUdORURcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5hbGlnbiA9PT0gYS5CT1RUT01fTEVGVCB8fFxuICAgICAgdGhpcy5hbGlnbiA9PT0gYS5CT1RUT01fQ0VOVEVSIHx8XG4gICAgICB0aGlzLmFsaWduID09PSBhLkJPVFRPTV9SSUdIVFxuICAgICkge1xuICAgICAgdGhpcy5ibG9jay55ID1cbiAgICAgICAgdGhpcy5oZWlnaHQgLVxuICAgICAgICB0aGlzLmxpbmVzW3RoaXMubGluZXMubGVuZ3RoIC0gMV0ueSArXG4gICAgICAgICh0aGlzLmxpbmVzWzBdLm1lYXN1cmVkSGVpZ2h0ICogZm50LmJvdHRvbSkgLyBmbnQudW5pdHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3JpZ2luYWwuYmxvY2spIHtcbiAgICAgIGFwcGx5U2hhcGVFdmVudExpc3RlbmVycyh0aGlzLm9yaWdpbmFsLmJsb2NrLCB0aGlzLmJsb2NrKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==