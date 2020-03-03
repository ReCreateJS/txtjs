export function parsePathData(data) {
  if (!data) {
    return [];
  }
  let cs = data;
  const cc = [
    "m",
    "M",
    "l",
    "L",
    "v",
    "V",
    "h",
    "H",
    "z",
    "Z",
    "c",
    "C",
    "q",
    "Q",
    "t",
    "T",
    "s",
    "S",
    "a",
    "A"
  ];
  cs = cs.replace(new RegExp(" ", "g"), ",");
  for (let n = 0; n < cc.length; n++) {
    cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
  }
  const arr = cs.split("|");
  const ca = [];
  let cpx = 0;
  let cpy = 0;
  const arrLength = arr.length;
  let startPoint = null;
  for (let n = 1; n < arrLength; n++) {
    let str = arr[n];
    let c = str.charAt(0);
    str = str.slice(1);
    str = str.replace(new RegExp(",-", "g"), "-");
    str = str.replace(new RegExp("-", "g"), ",-");
    str = str.replace(new RegExp("e,-", "g"), "e-");
    let p = str.split(",");
    if (p.length > 0 && p[0] === "") {
      p.shift();
    }
    const pLength = p.length;
    for (let i = 0; i < pLength; i++) {
      p[i] = parseFloat(p[i]);
    }
    if (c === "z" || c === "Z") {
      p = [true];
    }

    while (p.length > 0) {
      if (isNaN(p[0])) {
        break;
      }
      let cmd = null;
      let points = [];
      const startX = cpx,
        startY = cpy;
      let prevCmd, ctlPtx, ctlPty;
      let rx, ry, psi, fa, fs, x1, y1;
      let dx, dy;

      switch (c) {
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
          break;

        case "M":
          cpx = p.shift();
          cpy = p.shift();
          cmd = "M";
          if (startPoint == null) {
            startPoint = [cpx, cpy];
          }
          points.push(cpx, cpy);
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
