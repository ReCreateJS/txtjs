import { svgPathBoundingBox } from "./SVGPath";

/**
 * Represents a single Glyph within a Font.
 */
export default class Glyph {
  /** SVG path data */
  path = "";
  private _bounds: createjs.Rectangle = null;
  offset: number;
  kerning: any = {};

  private _graphic: createjs.Graphics = null;
  private _boundaryLine: createjs.Graphics = null;
  _fill: createjs.Graphics.Fill;
  _stroke: createjs.Graphics.Stroke;
  _strokeStyle: createjs.Graphics.StrokeStyle;

  static debug: false;

  graphic() {
    if (this._graphic == null) {
      this._graphic = new createjs.Graphics();

      //append fill/stroke/stokeStyle
      //Character instances populate properties before draw
      this._stroke = new createjs.Graphics.Stroke(null, true);

      this._strokeStyle = new createjs.Graphics.StrokeStyle(
        0,
        null,
        null,
        null
      );

      this._fill = new createjs.Graphics.Fill(null);

      //convert SVG to drawing paths
      this._graphic.decodeSVGPath(this.path);

      this._graphic.append(this._fill);
      this._graphic.append(this._strokeStyle);
      this._graphic.append(this._stroke);
    }
    return this._graphic;
  }

  getBounds() {
    if (!this._bounds) {
      this._bounds = svgPathBoundingBox(this.path);
    }
    return this._bounds;
  }

  boundingLine() {
    if (this._boundaryLine == null) {
      this._boundaryLine = new createjs.Graphics();
      const bounds = this.getBounds();
      this._boundaryLine.append(
        new createjs.Graphics.Rect(
          bounds.x,
          bounds.y,
          bounds.width,
          bounds.height
        )
      );
      this._boundaryLine.append(new createjs.Graphics.StrokeDash([10, 4]));
      this._boundaryLine.append(new createjs.Graphics.Stroke("#FF00FF", true));
    }
  }

  draw(ctx: CanvasRenderingContext2D): boolean {
    this._graphic.draw(ctx);
    if (Glyph.debug) {
      this._boundaryLine.draw(ctx);
    }
    return true;
  }

  getKerning(characterCode: number, size: number) {
    const out = -(this.kerning[characterCode] * size);
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
  }
}
