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
    mag(v: any): number;
    meanVec(u: any, v: any): number[];
    dot(u: any, v: any): number;
    ratio(u: any, v: any): number;
    rotClockwise(v: any, angle: any): number[];
    pointMul(u: any, v: any): number[];
    scale(c: any, v: any): number[];
    sum(u: any, v: any): any[];
    angle(u: any, v: any): number;
    rotCounterClockwise(v: any, angle: any): number[];
    midPoint(u: any, v: any): number[];
    constructor(x1: number[], rx: number, ry: number, phiarg: number, fA: boolean, fS: boolean, x2: number[]);
    exec(ctx: CanvasRenderingContext2D): void;
}
