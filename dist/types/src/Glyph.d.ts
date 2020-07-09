/**
 * Represents a single Glyph within a Font.
 */
/// <reference types="easeljs" />
export default class Glyph {
    /** SVG path data */
    path: string;
    offset: number;
    kerning: any;
    private _graphic;
    _fill: createjs.Graphics.Fill;
    _stroke: createjs.Graphics.Stroke;
    _strokeStyle: createjs.Graphics.StrokeStyle;
    graphic(): createjs.Graphics;
    draw(ctx: CanvasRenderingContext2D): boolean;
    getKerning(characterCode: number, size: number): number;
}
