import "./GraphicsMixin";

export { default as Accessibility } from "./Accessibility";
export { default as Align } from "./Align";
export { default as Case } from "./Case";
export { default as Character } from "./Character";
export { default as CharacterText } from "./CharacterText";
export { default as Font } from "./Font";
export { default as FontLoader } from "./FontLoader";
export { default as Glyph } from "./Glyph";
export { default as Graphics } from "./Graphics";
export { default as Info } from "./Info";
export { default as Line } from "./Line";
export { default as Text } from "./Text";
export { default as Path, PathAlign, PathFit } from "./Path";
export { default as PathText } from "./PathText";
export { default as VerticalAlign } from "./VerticalAlign";
export { default as Word } from "./Word";

import copyEventListeners from "./utils/apply-shape-event-listeners";

export const Util = {
  copyEventListeners
};
