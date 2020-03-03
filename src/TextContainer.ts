import FontLoader from "./FontLoader";
import Case from "./Case";
import { ConstructObj, Style } from "./Interfaces";
import Accessibility from "./Accessibility";

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

  constructor(props: ConstructObj = null) {
    super();
  }

  protected loadFonts() {
    let fonts = [this.font].concat(this.fontsFromCharacterStyles(this.style));
    FontLoader.load(this, fonts);
  }

  //called when text is rendered
  complete() {}

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
    let styleFonts = [];
    if (styles) {
      for (var i = 0; i < styles.length; ++i) {
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
}
