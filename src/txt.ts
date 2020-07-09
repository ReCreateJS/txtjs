import "./GraphicsMixin";

import { default as Accessibility } from "./Accessibility";
import { default as Align } from "./Align";
import { default as Case } from "./Case";
import { default as Character } from "./Character";
import { default as CharacterText } from "./CharacterText";
import { default as Font } from "./Font";
import { default as FontLoader } from "./FontLoader";
import { default as Glyph } from "./Glyph";
import { default as Graphics } from "./Graphics";
import { default as Info } from "./Info";
import { default as Line } from "./Line";
import { default as Text } from "./Text";
import { default as Path, PathAlign, PathFit } from "./Path";
import { default as PathText } from "./PathText";
import { default as VerticalAlign } from "./VerticalAlign";
import { default as Word } from "./Word";

import copyEventListeners from "./utils/apply-shape-event-listeners";

export const Util = {
  copyEventListeners
};

globalThis.txt = {
  Accessibility,
  Align,
  Case,
  Character,
  CharacterText,
  Font,
  FontLoader,
  Glyph,
  Graphics,
  Info,
  Line,
  Text,
  Path,
  PathAlign,
  PathFit,
  PathText,
  VerticalAlign,
  Word
};
