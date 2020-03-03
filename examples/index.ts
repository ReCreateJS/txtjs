txt.FontLoader.path = "../font/";

import { visual as CharacterTextVisual } from "./character-text";
import { visual as TextVisual } from "./text";
import { visual as PathTextVisual } from "./path-text";
import Graphics from "./graphics";

import { nonVisual as CharacterTextNonVisual } from "./character-text";
import { nonVisual as TextNonVisual } from "./text";
import { nonVisual as PathTextNonVisual } from "./path-text";
import { default as GraphicsNonVisual } from "./graphics";

export const visualExamples = {
  CharacterText: CharacterTextVisual,
  Text: TextVisual,
  PathText: PathTextVisual,
  Graphics
};

export const nonVisualExamples = {
  CharacterText: CharacterTextNonVisual,
  Text: TextNonVisual,
  PathText: PathTextNonVisual,
  Graphics: GraphicsNonVisual
};

export { default as CharacterText } from "./character-text";
export { default as Graphics } from "./graphics";
export { default as PathText } from "./path-text";
export { default as Text } from "./text";

export { default as createHiDPICanvas } from "../lib/hidpi-canvas";

export { clearExample } from "../lib/example-loader";
