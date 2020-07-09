import Font from "./Font";
/**
 * Fetches font files via AJAX request, and
 * parses the font into glyphs, and stores it.
 * Local storage is optionally used for caching.
 *
 * Font files store font data, grouped by categories:
 *
 *  * `0` = Font properties: `0|property name|property value`
 *  * `1` = Glyph SVG shape data: `1|?|?|SVGPath data`
 *  * `2` = Kerning spacing: `2|?|?|?`
 *  * `3` = Ligatures: `3`
 *
 * Each line in a category of data is delineated with pipe characters "|".
 *
 * Partial example:
 *
 * ```
 * 0|id|Abel-Regular
 * 0|family|Abel
 * 1|33|428|M250 434h-72l-55 1000h182zM137 0v154h154v-154h-154z
 * 1|34|645|M225 993h-51l-51 441h153zM471 993h-51l-51 441h153z
 * 2|34|197|123
 * 2|47|100|102
 * 3
 * ```
 *
 * @todo This class should be split into FontLoader (AJAX fetch), FontParser (deserialisation), and probably a FontStorage class.
 */
export default class FontLoader {
    /**
     * Server path to load font files from.
     */
    static path: string;
    static cache: boolean;
    static version: number;
    static fonts: any;
    static loaders: any;
    static isLoaded(name: string): boolean;
    static getFont(name: string): Font;
    static load(target: any, fonts: string[]): void;
    static check(id: number): void;
    static loadFont(fontName: string, loader: any): void;
}
