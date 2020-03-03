import Case from "./Case";
import Glyph from "./Glyph";
import FontLoader from "./FontLoader";
import Font from "./Font";

/**
 * Represents a styled character
 */
export default class Character extends createjs.Shape {
  character = "";
  characterCode: number = null;
  font: string = null;
  tracking: number = null;
  characterCase: Case = null;
  characterCaseOffset = 0;
  index: number = null;
  size: number = null;
  fillColor: string = null;
  strokeColor: string = null;
  strokeWidth: number = null;
  measuredWidth: number = null;
  measuredHeight: number = null;
  hPosition: number = null;
  missing = false;

  _glyph: Glyph;
  _font: Font;

  constructor(character: string, style: {}, index: number = null) {
    super();
    this.set(style);
    this.index = index;

    let upperSmall;

    // flip case depending on characterCase property
    if (this.characterCase == Case.NORMAL) {
      this.character = character;
    } else if (this.characterCase == Case.UPPER) {
      this.character = character.toUpperCase();
    } else if (this.characterCase == Case.LOWER) {
      this.character = character.toLowerCase();
    } else if (this.characterCase == Case.SMALL_CAPS) {
      this.character = character.toUpperCase();
      upperSmall = !(character === this.character);
    } else {
      //fallback case for unknown.
      this.character = character;
    }
    this.characterCode = this.character.charCodeAt(0);

    this._font = FontLoader.getFont(this.font);

    if (this._font.glyphs[this.characterCode]) {
      this._glyph = this._font.glyphs[this.characterCode];

      //flip lower
    } else if (
      this._font.glyphs[
        String.fromCharCode(this.characterCode)
          .toLowerCase()
          .charCodeAt(0)
      ]
    ) {
      this._glyph = this._font.glyphs[
        String.fromCharCode(this.characterCode)
          .toLowerCase()
          .charCodeAt(0)
      ];

      //flip upper
    } else if (
      this._font.glyphs[
        String.fromCharCode(this.characterCode)
          .toUpperCase()
          .charCodeAt(0)
      ]
    ) {
      this._glyph = this._font.glyphs[
        String.fromCharCode(this.characterCode)
          .toUpperCase()
          .charCodeAt(0)
      ];
    }

    //missing glyph
    if (this._glyph === undefined) {
      console.log("MISSING GLYPH:" + this.character);
      this._glyph = this._font.glyphs[42];
      this.missing = true;
    }
    this.graphics = this._glyph.graphic();

    // scale x
    if (this.characterCase === Case.SMALL_CAPS) {
      if (upperSmall) {
        this.scaleX = (this.size / this._font.units) * 0.8;
        this.characterCaseOffset = -0.2 * (this._glyph.offset * this.size);
      } else {
        this.scaleX = this.size / this._font.units;
      }
    } else {
      this.scaleX = this.size / this._font.units;
    }

    this.scaleY = -this.scaleX;

    this.measuredHeight =
      (this._font.ascent - this._font.descent) * this.scaleX;
    this.measuredWidth = this.scaleX * this._glyph.offset * this._font.units;

    const ha = new createjs.Shape();
    ha.graphics
      .beginFill("#000")
      .drawRect(
        0,
        this._font.descent,
        this._glyph.offset * this._font.units,
        this._font.ascent - this._font.descent
      );
    this.hitArea = ha;
  }

  setGlyph(glyph: Glyph) {
    this._glyph = glyph;
    this.graphics = this._glyph.graphic();
  }

  trackingOffset(): number {
    return this.size * (2.5 / this._font.units + 1 / 900 + this.tracking / 990);
  }

  draw(ctx: CanvasRenderingContext2D): boolean {
    this._glyph._fill.style = this.fillColor;
    this._glyph._fill.matrix = null;
    this._glyph._stroke.style = this.strokeColor;
    this._glyph._strokeStyle.width = this.strokeWidth;
    return this._glyph.draw(ctx);
  }

  getWidth() {
    return this.size * this._glyph.offset;
  }
}
