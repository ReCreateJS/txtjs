import { VerticalAlign } from "./index";
import Case from "./Case";

export interface Style {
  size?: number;
  font?: string;
  tracking?: number;
  characterCase?: Case;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

// TODO: convert these into separate interfaces for each TextContainer class
export interface ConstructObj {
  text: string;
  style?: Style[];
  align?: number;
  size?: number;
  height?: number;
  width?: number;
  lineHeight?: number;
  font?: string;
  tracking?: number;
  characterCase?: Case;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  debug?: boolean;
  character?: ShapeEvents;
  word?: ShapeEvents;
  line?: ShapeEvents;
  block?: ShapeEvents;
  x?: number;
  y?: number;
  flipped?: boolean;
  rotation?: number;
  start?: number;
  end?: number;
  path?: string;
  accessibilityPriority?: number;
  accessibilityText?: string;
  valign?: VerticalAlign;
  valignPercent?: number;
  initialTracking?: number;
  ligatures?: boolean;
  singleLine?: boolean;
  autoExpand?: boolean;
  autoReduce?: boolean;
  maxTracking?: number;
  minSize?: number;
  maxSize?: number;
  complete?: Function;
}

export interface ShapeEvents {
  added?: EventCallback;
  click?: EventCallback;
  dblclick?: EventCallback;
  mousedown?: EventCallback;
  mouseout?: EventCallback;
  mouseover?: EventCallback;
  pressmove?: EventCallback;
  pressup?: EventCallback;
  removed?: EventCallback;
  rollout?: EventCallback;
  rollover?: EventCallback;
  tick?: EventCallback;
}

export interface EventCallback {
  (value: any): void;
}

export interface Point {
  x: number;
  y: number;
}
