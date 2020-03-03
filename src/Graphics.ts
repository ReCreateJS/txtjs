import SVGArc from "./SVGArc";
import { parsePathData } from "./SVGPath";

export default class Graphics {
  /**
   * Build up createjs Graphics commands based on path data.
   */
  static init(target, svgpath: string) {
    const ca = parsePathData(svgpath);
    const G = createjs.Graphics;

    for (let n = 0; n < ca.length; n++) {
      const c = ca[n].command;
      const p = ca[n].points;
      switch (c) {
        case "L":
          target.append(new G.LineTo(p[0], p[1]));
          break;

        case "M":
          target.append(new G.MoveTo(p[0], p[1]));
          break;

        case "C":
          target.append(
            new G.BezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5])
          );
          break;

        case "Q":
          target.append(new G.QuadraticCurveTo(p[0], p[1], p[2], p[3]));
          break;

        case "A":
          target.append(new SVGArc(p[0], p[1], p[2], p[3], p[4], p[5], p[6]));
          break;

        case "Z":
          target.append(new G.ClosePath());
          target.append(new G.MoveTo(p[0], p[1]));
          break;
      }
    }
  }
}
