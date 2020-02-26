import pathGraphics from "./Graphics/pathGraphics";
import pathGraphics2 from "./Graphics/pathGraphics2";
import pathGraphics3 from "./Graphics/pathGraphics3";
import bounding_box from "./Graphics/bounding_box";

export const visual = {
  pathGraphics,
  pathGraphics2,
  pathGraphics3
};

export const nonVisual = {
  bounding_box
};

export default { ...visual, ...nonVisual };
