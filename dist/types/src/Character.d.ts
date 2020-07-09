/// <reference types="easeljs" />
import Case from "./Case";
import Glyph from "./Glyph";
import Font from "./Font";
/**
 * Represents a styled character
 */
export default class Character extends createjs.Shape {
    character: string;
    characterCode: number;
    font: string;
    tracking: number;
    characterCase: Case;
    characterCaseOffset: number;
    index: number;
    size: number;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    measuredWidth: number;
    measuredHeight: number;
    hPosition: number;
    missing: boolean;
    _glyph: Glyph;
    _font: Font;
    constructor(character: string, style: {}, index?: number);
    setGlyph(glyph: Glyph): void;
    trackingOffset(): number;
    draw(ctx: CanvasRenderingContext2D): boolean;
    getWidth(): number;
}
