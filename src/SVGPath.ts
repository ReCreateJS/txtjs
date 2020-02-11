import pathBounds from "./PathBounds";

/**
 * Useful SVG path tutorial on MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
 * @param data
 */

export function svgPathBoundingBox(svgpath: string) {
  // TODO: access a cached array?
  const ca = parsePathData(svgpath);
  const bounds = pathBounds(ca);
  return new createjs.Rectangle(
    bounds.left,
    bounds.top,
    bounds.width,
    bounds.height
  );
}

/**
 * Adapted from KineticJS
 * @see https://github.com/ericdrowell/KineticJS/blob/master/src/plugins/Path.js#L210
 */
export function parsePathData(data: string) {
  if (!data) {
    return [];
  }
  // command string
  let cs = data;

  // command chars
  const cc = [
    // Path Data Segment must begin with a moveTo
    "m", //m (x y)+  Relative moveTo (subsequent points are treated as lineTo)
    "M", //M (x y)+  Absolute moveTo (subsequent points are treated as lineTo)
    "l", //l (x y)+  Relative lineTo
    "L", //L (x y)+  Absolute LineTo
    "v", //v (y)+    Relative vertical lineTo
    "V", //V (y)+    Absolute vertical lineTo
    "h", //h (x)+    Relative horizontal lineTo
    "H", //H (x)+    Absolute horizontal lineTo
    "z", //z (closepath)
    "Z", //Z (closepath)
    "c", //c (x1 y1 x2 y2 x y)+ Relative Bezier curve
    "C", //C (x1 y1 x2 y2 x y)+ Absolute Bezier curve
    "q", //q (x1 y1 x y)+       Relative Quadratic Bezier
    "Q", //Q (x1 y1 x y)+       Absolute Quadratic Bezier
    "t", //t (x y)+    Shorthand/Smooth Relative Quadratic Bezier
    "T", //T (x y)+    Shorthand/Smooth Absolute Quadratic Bezier
    "s", //s (x2 y2 x y)+       Shorthand/Smooth Relative Bezier curve
    "S", //S (x2 y2 x y)+       Shorthand/Smooth Absolute Bezier curve
    "a", //a (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+     Relative Elliptical Arc
    "A" //A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  Absolute Elliptical Arc
  ];
  // convert white spaces to commas
  cs = cs.replace(new RegExp(" ", "g"), ",");
  // create pipes so that we can split the data
  for (let n = 0; n < cc.length; n++) {
    cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
  }
  // create array
  const arr = cs.split("|");
  const ca = [];
  // init context point
  let cpx = 0;
  let cpy = 0;
  const arrLength = arr.length;
  let startPoint = null;
  for (let n = 1; n < arrLength; n++) {
    let str = arr[n];
    let c = str.charAt(0);
    str = str.slice(1);
    // remove ,- for consistency
    str = str.replace(new RegExp(",-", "g"), "-");
    // add commas so that it's easy to split
    str = str.replace(new RegExp("-", "g"), ",-");
    str = str.replace(new RegExp("e,-", "g"), "e-");
    const segments = str.split(",");
    if (segments.length > 0 && segments[0] === "") {
      segments.shift();
    }
    let p = [];

    // convert strings to floats
    for (let i = 0; i < segments.length; i++) {
      p[i] = parseFloat(segments[i]);
    }
    if (c === "z" || c === "Z") {
      p = [true];
    }

    while (p.length > 0) {
      if (isNaN(p[0])) {
        // case for a trailing comma before next command
        break;
      }
      let cmd = null;
      let points = [];
      const startX = cpx,
        startY = cpy;
      // Move var from within the switch to up here (jshint)
      let prevCmd, ctlPtx, ctlPty; // Ss, Tt
      let rx, ry, psi, fa, fs, x1, y1; // Aa
      let dx, dy;

      // convert l, H, h, V, and v to L
      switch (c) {
        // Note: Keep the lineTo's above the moveTo's in this switch
        case "l":
          cpx += p.shift();
          cpy += p.shift();
          cmd = "L";
          points.push(cpx, cpy);
          break;

        case "L":
          cpx = p.shift();
          cpy = p.shift();
          points.push(cpx, cpy);
          break;
        // Note: lineTo handlers need to be above this point
        case "m":
          dx = p.shift();
          dy = p.shift();
          cpx += dx;
          cpy += dy;
          if (startPoint == null) {
            startPoint = [cpx, cpy];
          }
          cmd = "M";
          points.push(cpx, cpy);
          c = "l";
          // subsequent points are treated as relative lineTo
          break;

        case "M":
          cpx = p.shift();
          cpy = p.shift();
          cmd = "M";
          if (startPoint == null) {
            startPoint = [cpx, cpy];
          }
          points.push(cpx, cpy);
          // subsequent points are treated as absolute lineTo
          c = "L";
          break;

        case "h":
          cpx += p.shift();
          cmd = "L";
          points.push(cpx, cpy);
          break;

        case "H":
          cpx = p.shift();
          cmd = "L";
          points.push(cpx, cpy);
          break;

        case "v":
          cpy += p.shift();
          cmd = "L";
          points.push(cpx, cpy);
          break;

        case "V":
          cpy = p.shift();
          cmd = "L";
          points.push(cpx, cpy);
          break;

        case "C":
          points.push(p.shift(), p.shift(), p.shift(), p.shift());
          cpx = p.shift();
          cpy = p.shift();
          points.push(cpx, cpy);
          break;

        case "c":
          points.push(
            cpx + p.shift(),
            cpy + p.shift(),
            cpx + p.shift(),
            cpy + p.shift()
          );
          cpx += p.shift();
          cpy += p.shift();
          cmd = "C";
          points.push(cpx, cpy);
          break;

        case "S":
          ctlPtx = cpx;
          ctlPty = cpy;
          prevCmd = ca[ca.length - 1];
          if (prevCmd.command === "C") {
            ctlPtx = cpx + (cpx - prevCmd.points[2]);
            ctlPty = cpy + (cpy - prevCmd.points[3]);
          }
          points.push(ctlPtx, ctlPty, p.shift(), p.shift());
          cpx = p.shift();
          cpy = p.shift();
          cmd = "C";
          points.push(cpx, cpy);
          break;

        case "s":
          ctlPtx = cpx;
          ctlPty = cpy;
          prevCmd = ca[ca.length - 1];
          if (prevCmd.command === "C") {
            ctlPtx = cpx + (cpx - prevCmd.points[2]);
            ctlPty = cpy + (cpy - prevCmd.points[3]);
          }
          points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
          cpx += p.shift();
          cpy += p.shift();
          cmd = "C";
          points.push(cpx, cpy);
          break;

        case "Q":
          points.push(p.shift(), p.shift());
          cpx = p.shift();
          cpy = p.shift();
          points.push(cpx, cpy);
          break;

        case "q":
          points.push(cpx + p.shift(), cpy + p.shift());
          cpx += p.shift();
          cpy += p.shift();
          cmd = "Q";
          points.push(cpx, cpy);
          break;

        case "T":
          ctlPtx = cpx;
          ctlPty = cpy;
          prevCmd = ca[ca.length - 1];
          if (prevCmd.command === "Q") {
            ctlPtx = cpx + (cpx - prevCmd.points[0]);
            ctlPty = cpy + (cpy - prevCmd.points[1]);
          }
          cpx = p.shift();
          cpy = p.shift();
          cmd = "Q";
          points.push(ctlPtx, ctlPty, cpx, cpy);
          break;

        case "t":
          ctlPtx = cpx;
          ctlPty = cpy;
          prevCmd = ca[ca.length - 1];
          if (prevCmd.command === "Q") {
            ctlPtx = cpx + (cpx - prevCmd.points[0]);
            ctlPty = cpy + (cpy - prevCmd.points[1]);
          }
          cpx += p.shift();
          cpy += p.shift();
          cmd = "Q";
          points.push(ctlPtx, ctlPty, cpx, cpy);
          break;

        case "A":
          rx = p.shift();
          ry = p.shift();
          psi = p.shift();
          fa = p.shift();
          fs = p.shift();
          x1 = cpx;
          y1 = cpy;
          cpx = p.shift();
          cpy = p.shift();
          cmd = "A";
          points = [[x1, y1], rx, ry, psi, fa, fs, [cpx, cpy]];
          break;

        case "a":
          rx = p.shift();
          ry = p.shift();
          psi = p.shift();
          fa = p.shift();
          fs = p.shift();
          x1 = cpx;
          y1 = cpy;
          cpx += p.shift();
          cpy += p.shift();
          cmd = "A";
          points = [[x1, y1], rx, ry, psi, fa, fs, [cpx, cpy]];
          break;

        case "z":
          cmd = "Z";
          if (startPoint) {
            cpx = startPoint[0];
            cpy = startPoint[1];
            startPoint = null;
          } else {
            cpx = 0;
            cpy = 0;
          }
          p.shift();
          points = [cpx, cpy];
          break;

        case "Z":
          cmd = "Z";
          if (startPoint) {
            cpx = startPoint[0];
            cpy = startPoint[1];
            startPoint = null;
          } else {
            cpx = 0;
            cpy = 0;
          }
          p.shift();
          points = [cpx, cpy];
          break;
      }

      ca.push({
        command: cmd || c,
        points: points,
        start: {
          x: startX,
          y: startY
        }
      });
    }
  }
  return ca;
}
