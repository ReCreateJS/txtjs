/// <reference types="createjs-lib" />
import { ShapeEvents } from "../Interfaces";
export declare const EventNames: string[];
/**
 *
 * @param source
 * @param shape
 *
 * @todo: simplify with a loop
 */
export default function (original: ShapeEvents, shape: createjs.EventDispatcher): void;
