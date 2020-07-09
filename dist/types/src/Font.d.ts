export default class Font {
    glyphs: any;
    kerning: any;
    missing: number;
    offset: number;
    default: number;
    descent: number;
    ascent: number;
    top: number;
    middle: number;
    bottom: number;
    units: number;
    id: string;
    ligatures: any;
    panose: string;
    alphabetic: string;
    loaded: boolean;
    targets: number[];
    loader: XMLHttpRequest;
    cloneGlyph(target: number, from: number): void;
}
