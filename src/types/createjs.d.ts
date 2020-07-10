// TODO: get this addded into the @types/easeljs package
declare namespace createjs {
  namespace Graphics {
    class StrokeDash {
      constructor(segments: Array<number>, offset?: number);
    }
  }
}
