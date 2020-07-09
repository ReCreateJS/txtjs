/// <reference types="easeljs" />
import TextContainer from "./TextContainer";
import { ConstructObj } from "./Interfaces";
import Line from "./Line";
export default class CharacterText extends TextContainer {
    lineHeight: number;
    width: number;
    height: number;
    align: number;
    size: number;
    minSize: number;
    maxTracking: number;
    tracking: number;
    ligatures: boolean;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    singleLine: boolean;
    autoExpand: boolean;
    autoReduce: boolean;
    overset: boolean;
    oversetIndex: number;
    loaderId: number;
    debug: boolean;
    lines: Line[];
    block: createjs.Container;
    missingGlyphs: any[];
    renderCycle: boolean;
    measured: boolean;
    oversetPotential: boolean;
    constructor(props?: ConstructObj);
    layout(): void;
    /**
     * Draw baseline, ascent, ascender, and descender lines
     */
    private addDebugLayout;
    measure(): boolean;
    trackingOffset(tracking: number, size: number, units: number): number;
    offsetTracking(offset: number, size: number, units: number): number;
    getWidth(): number;
    /**
     * Place characters in lines
     * adds Characters to lines. LineHeight IS a factor given lack of Words.
     */
    characterLayout(): boolean;
    lineLayout(): void;
}
