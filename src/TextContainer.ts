import FontLoader from "./FontLoader";

/**
 * Common aspects of top-level Text classes
 */
export default abstract class TextContainer extends createjs.Container {
  text: string = "";
  original: ConstructObj = null;
  style: Style[] = null;
  font: string = "belinda";

  constructor(props: ConstructObj = null) {
    super();
  }

  protected loadFonts() {
    let fonts = [this.font].concat(this.fontsFromCharacterStyles(this.style));
    FontLoader.load(this, fonts);
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
}
