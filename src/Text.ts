import TextContainer from "./TextContainer";
import Align from "./Align";
import FontLoader from "./FontLoader";
import Word from "./Word";
import Line from "./Line";
import Font from "./Font";
import { ConstructObj, Style } from "./Interfaces";
import Character from "./Character";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";

export default class Text extends TextContainer {
  lineHeight: number = null;
  width = 100;
  height = 20;
  align: number = Align.TOP_LEFT;
  size = 12;
  tracking = 0;
  ligatures = false;
  fillColor = "#000";
  strokeColor: string = null;
  strokeWidth: number = null;
  loaderId: number = null;
  debug = false;
  words: Word[] = [];
  lines: Line[] = [];
  block: createjs.Container;
  missingGlyphs: any[] = null;
  renderCycle = true;

  constructor(props: ConstructObj = null) {
    super();
    if (props) {
      this.original = props;
      this.set(props);
    }
    this.loadFonts();
  }

  getBounds(): createjs.Rectangle {
    // TODO: obtain intersected bounds of the characters/words in here

    return new createjs.Rectangle(this.x, this.y, this.width, this.height);
  }

  layout() {
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

  //place characters in words
  characterLayout(): boolean {
    //characterlayout adds Charcters to words and measures true height. LineHeight is not a factor til Line layout.

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

    let currentWord: Word = new Word();
    // push a new word to capture characters
    this.words.push(currentWord);

    // loop over characters
    // place into words
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
        const ligTarget = this.text.substr(i, 4);
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
  }

  //place words in lines
  wordLayout() {
    // loop over words
    // place into lines
    const len = this.words.length;
    let currentLine = new Line();
    this.lines.push(currentLine);

    currentLine.y = 0;

    let currentWord: Word;
    let lastHeight: number;

    this.block.addChild(currentLine);
    let hPosition = 0;
    let vPosition = 0;
    let firstLine = true;

    let lastLineWord: Word;

    for (let i = 0; i < len; i++) {
      currentWord = this.words[i];
      currentWord.x = hPosition;

      if (this.original.word) {
        applyShapeEventListeners(this.original.word, currentWord);
      }

      if (firstLine) {
        vPosition = currentWord.measuredHeight;
      } else if (this.lineHeight != null) {
        vPosition = this.lineHeight;
      } else if (currentWord.measuredHeight > vPosition) {
        vPosition = currentWord.measuredHeight;
      }

      //exceeds line width && has new line
      if (
        hPosition + currentWord.measuredWidth > this.width &&
        currentWord.hasNewLine == true &&
        currentLine.children.length > 0
      ) {
        if (this.lineHeight != null) {
          lastHeight = currentLine.y + this.lineHeight;
        } else {
          lastHeight = currentLine.y + vPosition;
        }

        currentLine.measuredWidth = hPosition;
        lastLineWord = this.words[i - 1];

        if (lastLineWord != undefined && lastLineWord.hasSpace) {
          currentLine.measuredWidth -= lastLineWord.spaceOffset;
        }
        if (firstLine == false && this.lineHeight != null) {
          currentLine.measuredHeight = this.lineHeight;
        } else {
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
        const swapWord = this.words[i];
        currentLine.addChild(swapWord);
        if (this.lineHeight != null) {
          currentLine.measuredHeight = this.lineHeight;
        } else {
          currentLine.measuredHeight = swapWord.measuredHeight;
        }
        currentLine.measuredWidth = swapWord.measuredWidth;

        //add new line
        currentLine = new Line();
        this.lines.push(currentLine);
        if (this.lineHeight != null) {
          currentLine.y = lastHeight + this.lineHeight;
        } else {
          currentLine.y = lastHeight + vPosition;
        }
        this.block.addChild(currentLine);
        if (i < len - 1) {
          vPosition = 0;
        }

        continue;
      }

      //wrap word to new line if length
      else if (
        hPosition + currentWord.measuredWidth > this.width &&
        i > 0 &&
        currentLine.children.length > 0
      ) {
        if (this.lineHeight != null) {
          lastHeight = currentLine.y + this.lineHeight;
        } else {
          lastHeight = currentLine.y + vPosition;
        }
        currentLine.measuredWidth = hPosition;
        lastLineWord = this.words[i - 1];
        if (lastLineWord != undefined && lastLineWord.hasSpace) {
          currentLine.measuredWidth -= lastLineWord.spaceOffset;
        }
        if (firstLine == false && this.lineHeight != null) {
          currentLine.measuredHeight = this.lineHeight;
        } else {
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
        } else {
          lastHeight = currentLine.y + vPosition;
        }
        currentLine.measuredWidth = hPosition + currentWord.measuredWidth;
        if (firstLine == false && this.lineHeight != null) {
          currentLine.measuredHeight = this.lineHeight;
        } else {
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
      this.block.y =
        (this.lines[0].measuredHeight * fnt.ascent) / fnt.units +
        (this.lines[0].measuredHeight * fnt.top) / fnt.units;

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
