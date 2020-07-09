export declare enum PathFit {
    Rainbow = 0,
    Stairstep = 1
}
export interface PathPoint {
    x: number;
    y: number;
    rotation?: number;
    offsetX?: number;
}
export declare enum PathAlign {
    Center = 0,
    Right = 1,
    Left = 2
}
export default class Path {
    private pathElement;
    path: string;
    start: number;
    center: number;
    end: number;
    angles: any[];
    flipped: boolean;
    fit: PathFit;
    align: PathAlign;
    length: number;
    realLength: number;
    closed: boolean;
    clockwise: boolean;
    constructor(path: string, start?: number, end?: number, flipped?: boolean, fit?: PathFit, align?: PathAlign);
    update(): void;
    getRealPathPoint(distance: number): PathPoint;
    getPathPoint(distance: number, characterLength?: number, charOffset?: number): PathPoint;
}
