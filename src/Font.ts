export default class Font {
  glyphs: any = {};
  kerning: any = {};
  missing: number;
  offset: number;
  default: number;
  descent: number;
  ascent: number;
  top = 0;
  middle = 0;
  bottom = 0;
  units = 1000;
  id: string;
  ligatures: any = {};
  panose: string;
  alphabetic: string;
  loaded = false;
  targets: number[] = [];
  loader: XMLHttpRequest;

  cloneGlyph(target: number, from: number) {
    if (this.glyphs[target] == undefined && this.glyphs[from] != undefined) {
      this.glyphs[target] = this.glyphs[from];
      this.kerning[target] = this.kerning[from];
    }
  }
}
