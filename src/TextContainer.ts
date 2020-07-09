import FontLoader from "./FontLoader";
import Case from "./Case";
import { ConstructObj, Style } from "./Interfaces";
import Accessibility from "./Accessibility";
import Character from "./Character";

/**
 * Common aspects of top-level Text classes
 */
export default abstract class TextContainer extends createjs.Container {
  text = "";
  original: ConstructObj = null;
  style: Style[] = null;
  font = "belinda";
  characterCase: Case = Case.NORMAL;

  //accessibility
  accessibilityText: string = null;
  accessibilityPriority = 2;
  accessibilityId: number = null;

  protected loadFonts() {
    const fonts = [this.font].concat(this.fontsFromCharacterStyles(this.style));
    FontLoader.load(this, fonts);
  }

  //called when text is rendered
  complete() {
    //placeholder
  }

  //called when font has loaded
  fontLoaded() {
    this.layout();
  }

  //call stage.update to render canvas
  //overload to support deferred rendering
  render() {
    this.stage.update();
  }

  abstract layout();

  addAccessibility() {
    Accessibility.set(this);
  }

  private fontsFromCharacterStyles(styles) {
    const styleFonts = [];
    if (styles) {
      for (let i = 0; i < styles.length; ++i) {
        if (styles[i] != undefined && styles[i].font != undefined) {
          styleFonts.push(styles[i].font);
        }
      }
    }
    return styleFonts;
  }

  getCharCodeAt(index: number): number {
    if (this.characterCase == Case.NORMAL) {
      return this.text.charAt(index).charCodeAt(0);
    } else if (this.characterCase == Case.UPPER) {
      return this.text
        .charAt(index)
        .toUpperCase()
        .charCodeAt(0);
    } else if (this.characterCase == Case.LOWER) {
      return this.text
        .charAt(index)
        .toLowerCase()
        .charCodeAt(0);
    } else if (this.characterCase == Case.SMALL_CAPS) {
      return this.text
        .charAt(index)
        .toUpperCase()
        .charCodeAt(0);
    } else {
      //fallback case for unknown.
      return this.text.charAt(index).charCodeAt(0);
    }
  }

  // TODO: this code needs unit tests before it gets changed any further
  /**
   * Figure out how many characters a ligature covers,
   * and swap character glyph
   * @param char
   * @param ligTarget
   */
  protected ligatureSwap(char: Character, ligTarget: string) {
    let advanceBy = 0;
    const firstChar = ligTarget.charAt(0);
    const firstLigature = char._font.ligatures[firstChar];
    //1 char match
    if (firstLigature) {
      //2 char match
      if (firstLigature[ligTarget.charAt(1)]) {
        //3 char match
        if (firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)]) {
          //4 char match
          if (
            firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][
              ligTarget.charAt(3)
            ]
          ) {
            //swap 4 char ligature
            char.setGlyph(
              firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][
                ligTarget.charAt(3)
              ].glyph
            );
            advanceBy = 3;
          } else {
            //swap 3 char ligature
            char.setGlyph(
              firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)].glyph
            );
            advanceBy = 2;
          }
        } else {
          //swap 2 char ligature
          char.setGlyph(firstLigature[ligTarget.charAt(1)].glyph);
          advanceBy = 1;
        }
      }
    }
    return advanceBy;
  }
}
