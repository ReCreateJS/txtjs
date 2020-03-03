import Font from "./Font";
import Glyph from "./Glyph";

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
  static path = "/font/";

  static cache = false;

  static version = 0;

  static fonts: any = {};

  static loaders: any = [];

  static isLoaded(name: string): boolean {
    if (FontLoader.fonts.hasOwnProperty(name)) {
      return FontLoader.fonts[name].loaded;
    }
    return false;
  }

  static getFont(name: string): Font {
    if (FontLoader.fonts.hasOwnProperty(name)) {
      return FontLoader.fonts[name];
    }
    return null;
  }

  static load(target: any, fonts: string[]) {
    //no loaderId implies no loading for this txt field
    let loader: any;
    if (target.loaderId == null) {
      loader = {};
      target.loaderId = FontLoader.loaders.push(loader) - 1;
      loader._id = target.loaderId;
      loader._target = target;
    } else {
      loader = FontLoader.loaders[target.loaderId];
    }
    const fontCount = fonts.length;
    for (let i = 0; i < fontCount; ++i) {
      //mark loader for font loading
      loader[fonts[i]] = false;
    }
    for (const prop in loader) {
      if (prop.charAt(0) != "_") {
        FontLoader.loadFont(prop, loader);
      }
    }
  }

  static check(id: number) {
    const loader = FontLoader.loaders[id];
    //determine if all fonts are loaded
    for (const prop in loader) {
      if (prop.charAt(0) != "_") {
        loader[prop] = FontLoader.isLoaded(prop);
        if (loader[prop] == false) return;
      }
    }
    window.setTimeout(function() {
      loader._target.fontLoaded();
    }, 1);
  }

  static loadFont(fontName: string, loader: any) {
    //determine if font exists in memory
    if (FontLoader.fonts.hasOwnProperty(fontName)) {
      //loading complete
      if (FontLoader.fonts[fontName].loaded === true) {
        FontLoader.check(loader._id);

        //loading not complete
      } else {
        //add loader id to font
        FontLoader.fonts[fontName].targets.push(loader._id);
      }
      //load from scratch
    } else {
      const font: Font = (FontLoader.fonts[fontName] = new Font());
      font.targets.push(loader._id);

      //TODO localstorage check & get
      const req: any = new XMLHttpRequest();

      if (localStorage && FontLoader.cache) {
        const local = JSON.parse(
          localStorage.getItem("txt_font_" + fontName.split(" ").join("_"))
        );
        if (local != null) {
          if (local.version === FontLoader.version) {
            req.cacheResponseText = local.font;
            req.cacheFont = true;
          }
        }
      }

      req.onload = function() {
        //localstorage set
        if (localStorage && FontLoader.cache && this.cacheFont == undefined) {
          localStorage.setItem(
            "txt_font_" + fontName.split(" ").join("_"),
            JSON.stringify({
              font: this.responseText,
              version: FontLoader.version
            })
          );
        }

        let lines = this.responseText.split("\n");
        //use cacheResponseText as responseText is readonly via XHR
        if (this.cacheResponseText) {
          lines = this.cacheResponseText.split("\n");
        }
        const len = lines.length;
        let i = 0;
        let line: string[];
        let glyph: Glyph;
        let lineLen;
        while (i < len) {
          line = lines[i].split("|");
          switch (line[0]) {
            case "0":
              //properties
              if (
                line[1] == "id" ||
                line[1] == "panose" ||
                line[1] == "family" ||
                line[1] == "font-style" ||
                line[1] == "font-stretch"
              ) {
                font[line[1]] = line[2];
              } else {
                font[line[1]] = parseInt(line[2]);
              }
              break;

            case "1":
              //glyphs

              glyph = new Glyph();
              glyph.offset = parseInt(line[2]) / font.units;
              glyph.path = line[3];
              font.glyphs[line[1]] = glyph;
              break;

            case "2":
              //kerning
              if (font.kerning[line[1]] == undefined) {
                font.kerning[line[1]] = {};
              }
              if (font.glyphs[line[1]] == undefined) {
                glyph = new Glyph();
                glyph.offset = font.default / font.units;
                glyph.path = "";
                font.glyphs[line[1]] = glyph;
              }
              font.glyphs[line[1]].kerning[line[2]] =
                parseInt(line[3]) / font.units;
              font.kerning[line[1]][line[2]] = parseInt(line[3]) / font.units;
              break;

            case "3":
              line.shift();
              lineLen = line.length;
              for (let j = 0; j < lineLen; j++) {
                const path = line[j].split("");
                const pathLength = path.length;
                let target = font.ligatures;
                for (let k = 0; k < pathLength; k++) {
                  if (target[path[k]] == undefined) {
                    target[path[k]] = {};
                  }
                  if (k == pathLength - 1) {
                    target[path[k]].glyph = font.glyphs[line[j]];
                  }

                  target = target[path[k]];
                }
                //font.ligatures[ line[ j ] ] = font.glyphs[ line[j] ]
              }
              break;
          }
          i++;
        }
        //character cloning
        //clone bullet into multiple areas
        font.cloneGlyph(183, 8226);
        font.cloneGlyph(8729, 8226);
        font.cloneGlyph(12539, 8226);
        font.cloneGlyph(9702, 8226);
        font.cloneGlyph(9679, 8226);
        font.cloneGlyph(9675, 8226);

        //define font adjustment values for font.top, font.middle, font.bottom
        if (font.top == undefined) {
          font.top = 0;
        }
        if (font.middle == undefined) {
          font.middle = 0;
        }
        if (font.bottom == undefined) {
          font.bottom = 0;
        }

        //level the font metadata
        const lLen = font.targets.length;
        font.loaded = true;
        for (let l = 0; l < lLen; ++l) {
          FontLoader.check(font.targets[l]);
        }
        font.targets = [];
      };
      //check if cached
      if (req.cacheFont == true) {
        req.onload();
      } else {
        req.open(
          "get",
          FontLoader.path + fontName.split(" ").join("_") + ".txt",
          true
        );
        req.send();
      }
    }
  }
}
