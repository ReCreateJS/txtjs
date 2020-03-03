import Word from "./Word";
import Character from "./Character";

export default class Line extends createjs.Container {
  measuredWidth: number;
  measuredHeight: number;

  constructor() {
    super();
  }

  //Text support
  lastWord(): Word {
    return this.children[this.children.length - 1] as Word;
  }

  //CharacterText support
  lastCharacter(): Character {
    return this.children[this.children.length - 1] as Character;
  }
}
