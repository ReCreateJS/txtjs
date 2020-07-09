import TextContainer from "./TextContainer";
import Align from "./Align";
import FontLoader from "./FontLoader";
import { ConstructObj, Style } from "./Interfaces";
import Font from "./Font";
import Character from "./Character";
import Line from "./Line";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";

const SPACE_CHAR_CODE = 32;

export default class CharacterText extends TextContainer {
  lineHeight: number = null;
  width = 100;
  height = 20;
  align: number = Align.TOP_LEFT;
  size = 12;
  minSize: number = null;
  maxTracking: number = null;
  tracking = 0;
  ligatures = false;
  fillColor = "#000";
  strokeColor: string = null;
  strokeWidth: number = null;
  singleLine = false;
  autoExpand = false;
  autoReduce = false;
  overset = false;
  oversetIndex: number = null;
  loaderId: number = null;
  debug = false;
  lines: Line[] = [];
  block: createjs.Container;
  missingGlyphs: any[] = null;
  renderCycle = true;
  measured = false;
  oversetPotential = false;

  constructor(props: ConstructObj = null) {
    super();

    if (props) {
      this.original = props;
      this.set(props);
      this.original.tracking = this.tracking;
    }
    this.loadFonts();
  }

  //layout text
  layout() {
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
    if (
      this.singleLine === true &&
      (this.autoExpand === true || this.autoReduce === true)
    ) {
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
  }

  /**
   * Draw baseline, ascent, ascender, and descender lines
   */
  private addDebugLayout() {
    const font: Font = FontLoader.getFont(this.font);
    //outline
    let s = new createjs.Shape();
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
  }

  measure(): boolean {
    this.measured = true;
    //Extract origin sizing from this.original to preserve
    //metrics. autoMeasure will change style properties
    //directly. Change this.original to re-render.

    let len = this.text.length;
    const defaultStyle = {
      size: this.original.size,
      font: this.original.font,
      tracking: this.original.tracking,
      characterCase: this.original.characterCase
    };
    let currentStyle: any;
    let charCode: number = null;
    let font: Font;
    const charMetrics = [];
    let largestFontSize = defaultStyle.size;
    for (let i = 0; i < len; i++) {
      charCode = this.text.charCodeAt(i);

      currentStyle = defaultStyle;
      if (
        this.original.style !== undefined &&
        this.original.style[i] !== undefined
      ) {
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
        tracking: this.trackingOffset(
          currentStyle.tracking,
          currentStyle.size,
          font.units
        ),
        kerning: font.glyphs[charCode].getKerning(this.getCharCodeAt(i + 1), 1)
      });
    }

    //save space char using last known width/height
    const space: any = {
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
    let metricBaseWidth = 0;
    //measured at size
    let metricRealWidth = 0;
    //measured at size with tracking
    let metricRealWidthTracking = 0;

    let current = null;
    for (let i = 0; i < len; i++) {
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
    } else {
      let trackMetric = this.offsetTracking(
        (this.width - metricRealWidth) / len,
        current.size,
        current.units
      );
      if (trackMetric < 0) {
        trackMetric = 0;
      }
      //auto expand case
      if (trackMetric > this.original.tracking && this.autoExpand) {
        if (this.maxTracking != null && trackMetric > this.maxTracking) {
          this.tracking = this.maxTracking;
        } else {
          this.tracking = trackMetric;
        }
        this.size = this.original.size;
        return true;
      }
      //auto reduce tracking case
      if (trackMetric < this.original.tracking && this.autoReduce) {
        if (this.maxTracking != null && trackMetric > this.maxTracking) {
          this.tracking = this.maxTracking;
        } else {
          this.tracking = trackMetric;
        }
        this.size = this.original.size;
        return true;
      }
    }
    return true;
  }

  trackingOffset(tracking: number, size: number, units: number): number {
    return size * (2.5 / units + 1 / 900 + tracking / 990);
  }

  offsetTracking(offset: number, size: number, units: number): number {
    return Math.floor(((offset - 2.5 / units - 1 / 900) * 990) / size);
  }

  getWidth(): number {
    return this.width;
  }

  /**
   * Place characters in lines
   * adds Characters to lines. LineHeight IS a factor given lack of Words.
   */
  characterLayout(): boolean {
    //char layout
    const len = this.text.length;
    let char: Character;
    const defaultStyle: Style = {
      size: this.size,
      font: this.font,
      tracking: this.tracking,
      characterCase: this.characterCase,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth
    };
    let currentStyle = defaultStyle;
    let hPosition = 0;
    let vPosition = 0;
    let lineY = 0;
    let firstLine = true;

    let currentLine: Line = new Line();

    this.lines.push(currentLine);
    this.block.addChild(currentLine);

    // loop over characters
    // place into lines
    for (let i = 0; i < len; i++) {
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
          } else if (this.lineHeight != undefined) {
            vPosition = this.lineHeight;
            currentLine.measuredHeight = vPosition;
            currentLine.measuredWidth = hPosition;
            lineY = lineY + vPosition;
            currentLine.y = lineY;
          } else {
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
      } else if (this.lineHeight != undefined && this.lineHeight > 0) {
        if (vPosition < this.lineHeight) {
          vPosition = this.lineHeight;
        }
      } else if (char.measuredHeight > vPosition) {
        vPosition = char.measuredHeight;
      }

      //swap character if ligature
      //ligatures removed if tracking or this.ligatures is false
      if (currentStyle.tracking == 0 && this.ligatures == true) {
        const ligTarget = this.text.substr(i, 4);
        i = i + this.ligatureSwap(char, ligTarget);
      }

      if (this.overset == true) {
        break;
      }

      const longerThanWidth = hPosition + char.measuredWidth > this.width;
      if (this.singleLine === false && longerThanWidth) {
        const lastchar: Character = currentLine.children[
          currentLine.children.length - 1
        ] as Character;

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
        } else {
          currentLine.measuredHeight = vPosition;
          lineY = lineY + vPosition;
          currentLine.y = lineY;
        }
        firstLine = false;
        currentLine = new Line();
        currentLine.addChild(char);

        if (char.characterCode == SPACE_CHAR_CODE) {
          hPosition = 0;
        } else {
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
      } else if (
        this.measured == true &&
        this.singleLine === true &&
        longerThanWidth &&
        this.oversetPotential == true
      ) {
        this.oversetIndex = i;
        this.overset = true;

        //not measured
      } else if (
        this.measured == false &&
        this.singleLine === true &&
        longerThanWidth
      ) {
        this.oversetIndex = i;
        this.overset = true;
      } else {
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
    } else {
      currentLine.measuredWidth = hPosition;
      currentLine.measuredHeight = vPosition;
      if (vPosition == 0) {
        if (this.lineHeight) {
          vPosition = this.lineHeight;
        } else {
          vPosition = currentStyle.size;
        }
      }
      currentLine.y = lineY + vPosition;
    }
    return true;
  }

  lineLayout() {
    // loop over lines
    // place into text
    let measuredHeight = 0;
    let line;
    const a = Align;
    const fnt: Font = FontLoader.getFont(this.font);

    const len = this.lines.length;
    for (let i = 0; i < len; i++) {
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
      } else if (this.align === a.TOP_RIGHT) {
        //move to right
        line.x = this.width - line.measuredWidth;
      } else if (this.align === a.MIDDLE_CENTER) {
        //move to center
        line.x = (this.width - line.measuredWidth) / 2;
      } else if (this.align === a.MIDDLE_RIGHT) {
        //move to right
        line.x = this.width - line.measuredWidth;
      } else if (this.align === a.BOTTOM_CENTER) {
        //move to center
        line.x = (this.width - line.measuredWidth) / 2;
      } else if (this.align === a.BOTTOM_RIGHT) {
        //move to right
        line.x = this.width - line.measuredWidth;
      }
    }

    //TOP ALIGNED
    if (
      this.align === a.TOP_LEFT ||
      this.align === a.TOP_CENTER ||
      this.align === a.TOP_RIGHT
    ) {
      if (fnt.top == 0) {
        this.block.y = (this.lines[0].measuredHeight * fnt.ascent) / fnt.units;
      } else {
        this.block.y =
          (this.lines[0].measuredHeight * fnt.ascent) / fnt.units +
          (this.lines[0].measuredHeight * fnt.top) / fnt.units;
      }

      //MIDDLE ALIGNED
    } else if (
      this.align === a.MIDDLE_LEFT ||
      this.align === a.MIDDLE_CENTER ||
      this.align === a.MIDDLE_RIGHT
    ) {
      this.block.y =
        this.lines[0].measuredHeight +
        (this.height - measuredHeight) / 2 +
        (this.lines[0].measuredHeight * fnt.middle) / fnt.units;

      //BOTTOM ALIGNED
    } else if (
      this.align === a.BOTTOM_LEFT ||
      this.align === a.BOTTOM_CENTER ||
      this.align === a.BOTTOM_RIGHT
    ) {
      this.block.y =
        this.height -
        this.lines[this.lines.length - 1].y +
        (this.lines[0].measuredHeight * fnt.bottom) / fnt.units;
    }

    if (this.original.block) {
      applyShapeEventListeners(this.original.block, this.block);
    }
  }
}
