/// <reference types="easeljs" />
import Case from "./Case";
import { ConstructObj, Style } from "./Interfaces";
import Character from "./Character";
/**
 * Common aspects of top-level Text classes
 */
export default abstract class TextContainer extends createjs.Container {
    text: string;
    original: ConstructObj;
    style: Style[];
    font: string;
    characterCase: Case;
    accessibilityText: string;
    accessibilityPriority: number;
    accessibilityId: number;
    protected loadFonts(): void;
    complete(): void;
    fontLoaded(): void;
    render(): void;
    abstract layout(): any;
    addAccessibility(): void;
    private fontsFromCharacterStyles;
    getCharCodeAt(index: number): number;
    /**
     * Figure out how many characters a ligature covers,
     * and swap character glyph
     * @param char
     * @param ligTarget
     */
    protected ligatureSwap(char: Character, ligTarget: string): number;
}
