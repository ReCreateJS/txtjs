function getBoundsOfCurve(x, y, x1, y1, x2, y2, tempX, tempY) {
  // TODO: implement getBoundsOfCurve
  return [];
}

function getBoundsOfArc(fx, fy, rx, ry, rot, large, sweep, tx, ty) {
  // TODO: implement getBoundsOfArc
  return [];
}

export default function pathBounds(path) {
  const aX = [],
    aY = [];
  let current, // current instruction
    previous = null,
    subpathStartX = 0,
    subpathStartY = 0,
    x = 0, // current x
    y = 0, // current y
    controlX = 0, // current control point x
    controlY = 0, // current control point y
    tempX,
    tempY,
    bounds;

  for (let i = 0, len = path.length; i < len; ++i) {
    current = path[i].points.flat();

    current.unshift(path[i].command);

    switch (
      path[i].command // first letter
    ) {
      case "l": // lineto, relative
        x += current[1];
        y += current[2];
        bounds = [];
        break;

      case "L": // lineto, absolute
        x = current[1];
        y = current[2];
        bounds = [];
        break;

      case "h": // horizontal lineto, relative
        x += current[1];
        bounds = [];
        break;

      case "H": // horizontal lineto, absolute
        x = current[1];
        bounds = [];
        break;

      case "v": // vertical lineto, relative
        y += current[1];
        bounds = [];
        break;

      case "V": // verical lineto, absolute
        y = current[1];
        bounds = [];
        break;

      case "m": // moveTo, relative
        x += current[1];
        y += current[2];
        subpathStartX = x;
        subpathStartY = y;
        bounds = [];
        break;

      case "M": // moveTo, absolute
        x = current[1];
        y = current[2];
        subpathStartX = x;
        subpathStartY = y;
        bounds = [];
        break;

      case "c": // bezierCurveTo, relative
        tempX = x + current[5];
        tempY = y + current[6];
        controlX = x + current[3];
        controlY = y + current[4];
        bounds = getBoundsOfCurve(
          x,
          y,
          x + current[1], // x1
          y + current[2], // y1
          controlX, // x2
          controlY, // y2
          tempX,
          tempY
        );
        x = tempX;
        y = tempY;
        break;

      case "C": // bezierCurveTo, absolute
        controlX = current[3];
        controlY = current[4];
        bounds = getBoundsOfCurve(
          x,
          y,
          current[1],
          current[2],
          controlX,
          controlY,
          current[5],
          current[6]
        );
        x = current[5];
        y = current[6];
        break;

      case "s": // shorthand cubic bezierCurveTo, relative
        // transform to absolute x,y
        tempX = x + current[3];
        tempY = y + current[4];

        if (previous[0].match(/[CcSs]/) === null) {
          // If there is no previous command or if the previous command was not a C, c, S, or s,
          // the control point is coincident with the current point
          controlX = x;
          controlY = y;
        } else {
          // calculate reflection of previous control points
          controlX = 2 * x - controlX;
          controlY = 2 * y - controlY;
        }

        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          x + current[1],
          y + current[2],
          tempX,
          tempY
        );
        // set control point to 2nd one of this command
        // "... the first control point is assumed to be
        // the reflection of the second control point on
        // the previous command relative to the current point."
        controlX = x + current[1];
        controlY = y + current[2];
        x = tempX;
        y = tempY;
        break;

      case "S": // shorthand cubic bezierCurveTo, absolute
        tempX = current[3];
        tempY = current[4];
        if (previous[0].match(/[CcSs]/) === null) {
          // If there is no previous command or if the previous command was not a C, c, S, or s,
          // the control point is coincident with the current point
          controlX = x;
          controlY = y;
        } else {
          // calculate reflection of previous control points
          controlX = 2 * x - controlX;
          controlY = 2 * y - controlY;
        }
        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          current[1],
          current[2],
          tempX,
          tempY
        );
        x = tempX;
        y = tempY;
        // set control point to 2nd one of this command
        // "... the first control point is assumed to be
        // the reflection of the second control point on
        // the previous command relative to the current point."
        controlX = current[1];
        controlY = current[2];
        break;

      case "q": // quadraticCurveTo, relative
        // transform to absolute x,y
        tempX = x + current[3];
        tempY = y + current[4];
        controlX = x + current[1];
        controlY = y + current[2];
        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          controlX,
          controlY,
          tempX,
          tempY
        );
        x = tempX;
        y = tempY;
        break;

      case "Q": // quadraticCurveTo, absolute
        controlX = current[1];
        controlY = current[2];
        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          controlX,
          controlY,
          current[3],
          current[4]
        );
        x = current[3];
        y = current[4];
        break;

      case "t": // shorthand quadraticCurveTo, relative
        // transform to absolute x,y
        tempX = x + current[1];
        tempY = y + current[2];
        if (previous[0].match(/[QqTt]/) === null) {
          // If there is no previous command or if the previous command was not a Q, q, T or t,
          // assume the control point is coincident with the current point
          controlX = x;
          controlY = y;
        } else {
          // calculate reflection of previous control point
          controlX = 2 * x - controlX;
          controlY = 2 * y - controlY;
        }

        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          controlX,
          controlY,
          tempX,
          tempY
        );
        x = tempX;
        y = tempY;

        break;

      case "T":
        tempX = current[1];
        tempY = current[2];

        if (previous[0].match(/[QqTt]/) === null) {
          // If there is no previous command or if the previous command was not a Q, q, T or t,
          // assume the control point is coincident with the current point
          controlX = x;
          controlY = y;
        } else {
          // calculate reflection of previous control point
          controlX = 2 * x - controlX;
          controlY = 2 * y - controlY;
        }
        bounds = getBoundsOfCurve(
          x,
          y,
          controlX,
          controlY,
          controlX,
          controlY,
          tempX,
          tempY
        );
        x = tempX;
        y = tempY;
        break;

      case "na": // TODO: implement getBoundsOfArc
        bounds = getBoundsOfArc(
          x,
          y,
          current[1],
          current[2],
          current[3],
          current[4],
          current[5],
          current[6] + x,
          current[7] + y
        );
        x += current[6];
        y += current[7];
        break;

      case "nA": // TODO: implement getBoundsOfArc absolute
        bounds = getBoundsOfArc(
          x,
          y,
          current[1],
          current[2],
          current[3],
          current[4],
          current[5],
          current[6],
          current[7]
        );
        x = current[6];
        y = current[7];
        break;

      case "z":
      case "Z":
        x = subpathStartX;
        y = subpathStartY;
        break;
    }
    previous = current;
    bounds.forEach(function(point) {
      aX.push(point.x);
      aY.push(point.y);
    });
    aX.push(x);
    aY.push(y);
  }

  const minX = Math.min(...aX) || 0,
    minY = Math.min(...aY) || 0,
    maxX = Math.max(...aX) || 0,
    maxY = Math.max(...aY) || 0,
    deltaX = maxX - minX,
    deltaY = maxY - minY;

  return {
    left: minX,
    top: minY,
    width: deltaX,
    height: deltaY
  };
}
