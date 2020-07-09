/// <reference types="easeljs" />
import Character from "./Character";
export default class Word extends createjs.Container {
    hasNewLine: boolean;
    hasHyphen: boolean;
    hasSpace: boolean;
    measuredWidth: number;
    measuredHeight: number;
    spaceOffset: number;
    constructor();
    lastCharacter(): Character;
}
