/// <reference types="easeljs" />
import Word from "./Word";
import Character from "./Character";
export default class Line extends createjs.Container {
    measuredWidth: number;
    measuredHeight: number;
    constructor();
    lastWord(): Word;
    lastCharacter(): Character;
}
