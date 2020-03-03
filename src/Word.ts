import Character from "./Character";

export default class Word extends createjs.Container {
  hasNewLine = false;
  hasHyphen = false;
  hasSpace = false;
  measuredWidth: number;
  measuredHeight: number;
  spaceOffset = 0;

  constructor() {
    super();
  }

  //CharacterText support
  lastCharacter(): Character {
    return <Character>this.children[this.children.length - 1];
  }
}
