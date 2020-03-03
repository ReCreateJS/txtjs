export default class SVGArc {
  r0: number;
  r1: number;
  cx: number;
  cy: number;
  phi: number;
  rx: number;
  ry: number;
  start: number;
  end: number;
  fS: boolean;
  x2: number[];

  mag(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
  }

  meanVec(u, v) {
    return [(u[0] + v[0]) / 2.0, (u[1] + v[1]) / 2.0];
  }

  dot(u, v) {
    return u[0] * v[0] + u[1] * v[1];
  }

  ratio(u, v) {
    return this.dot(u, v) / (this.mag(u) * this.mag(v));
  }

  rotClockwise(v, angle) {
    const cost = Math.cos(angle);
    const sint = Math.sin(angle);
    return [cost * v[0] + sint * v[1], -1 * sint * v[0] + cost * v[1]];
  }

  pointMul(u, v) {
    return [u[0] * v[0], u[1] * v[1]];
  }

  scale(c, v) {
    return [c * v[0], c * v[1]];
  }

  sum(u, v) {
    return [u[0] + v[0], u[1] + v[1]];
  }

  angle(u, v) {
    let sign = 1.0;
    if (u[0] * v[1] - u[1] * v[0] < 0) {
      sign = -1.0;
    }
    return sign * Math.acos(this.ratio(u, v));
  }

  rotCounterClockwise(v, angle) {
    const cost = Math.cos(angle);
    const sint = Math.sin(angle);
    return [cost * v[0] - sint * v[1], sint * v[0] + cost * v[1]];
  }

  midPoint(u, v) {
    return [(u[0] - v[0]) / 2.0, (u[1] - v[1]) / 2.0];
  }

  constructor(
    x1: number[],
    rx: number,
    ry: number,
    phiarg: number,
    fA: boolean,
    fS: boolean,
    x2: number[]
  ) {
    this.rx = rx;
    this.ry = ry;
    this.x2 = x2;
    if (rx == 0 || ry == 0) {
      return;
    }
    const phi = phiarg * (Math.PI / 180.0);
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const xPrime = this.rotClockwise(this.midPoint(x1, x2), phi); // F.6.5.1
    const xPrime2 = this.pointMul(xPrime, xPrime);
    let rx2 = Math.pow(rx, 2);
    let ry2 = Math.pow(ry, 2);

    const lambda = Math.sqrt(xPrime2[0] / rx2 + xPrime2[1] / ry2);
    if (lambda > 1) {
      rx *= lambda;
      ry *= lambda;
      rx2 = Math.pow(rx, 2);
      ry2 = Math.pow(ry, 2);
    }
    let t = rx2 * ry2 - rx2 * xPrime2[1] - ry2 * xPrime2[0];
    if (t > -0.000001 && t < 0.000001) {
      t = 0;
    }
    let b = rx2 * xPrime2[1] + ry2 * xPrime2[0];
    if (b > -0.000001 && b < 0.000001) {
      b = 0;
    }
    let factor = Math.sqrt(t / b);
    if (fA == fS) {
      factor *= -1.0;
    }
    const cPrime = this.scale(factor, [
      (rx * xPrime[1]) / ry,
      (-ry * xPrime[0]) / rx
    ]);
    const c = this.sum(
      this.rotCounterClockwise(cPrime, phi),
      this.meanVec(x1, x2)
    );
    const x1UnitVector = [
      (xPrime[0] - cPrime[0]) / rx,
      (xPrime[1] - cPrime[1]) / ry
    ];
    const x2UnitVector = [
      (-1.0 * xPrime[0] - cPrime[0]) / rx,
      (-1.0 * xPrime[1] - cPrime[1]) / ry
    ];
    const theta = this.angle([1, 0], x1UnitVector);
    let deltaTheta = this.angle(x1UnitVector, x2UnitVector);
    if (isNaN(deltaTheta)) {
      deltaTheta = Math.PI;
    }
    const start = theta;
    const end = theta + deltaTheta;
    this.cx = c[0];
    this.cy = c[1];
    this.phi = phi;
    this.rx = rx;
    this.ry = ry;
    this.start = start;
    this.end = end;
    this.fS = !fS;
  }

  exec(ctx: CanvasRenderingContext2D) {
    if (this.rx == 0 || this.ry == 0) {
      ctx.lineTo(this.x2[0], this.x2[1]);
      return;
    }
    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.phi);
    ctx.scale(this.rx, this.ry);
    ctx.arc(0, 0, 1, this.start, this.end, this.fS);
    ctx.scale(1 / this.rx, 1 / this.ry);
    ctx.rotate(-this.phi);
    ctx.translate(-this.cx, -this.cy);
  }
}
