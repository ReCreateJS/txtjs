/// <reference types="easeljs" />
import TextContainer from "./TextContainer";
import Word from "./Word";
import Line from "./Line";
import { ConstructObj } from "./Interfaces";
export default class Text extends TextContainer {
    lineHeight: number;
    width: number;
    height: number;
    align: number;
    size: number;
    tracking: number;
    ligatures: boolean;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    loaderId: number;
    debug: boolean;
    words: Word[];
    lines: Line[];
    block: createjs.Container;
    missingGlyphs: any[];
    renderCycle: boolean;
    constructor(props?: ConstructObj);
    getBounds(): createjs.Rectangle;
    layout(): void;
    /**
     * Draw baseline, ascent, ascender, and descender lines
     */
    private addDebugLayout;
    characterLayout(): boolean;
    wordLayout(): void;
    lineLayout(): void;
}
