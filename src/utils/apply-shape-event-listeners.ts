import { ShapeEvents } from "../Interfaces";

export const EventNames = [
  "click",
  "dblclick",
  "mousedown",
  "mouseout",
  "mouseover",
  "pressmove",
  "pressup",
  "rollout",
  "rollover",
  "added",
  "removed",
  "tick"
];

/**
 *
 * @param source
 * @param shape
 *
 * @todo: simplify with a loop
 */
export default function(
  original: ShapeEvents,
  shape: createjs.EventDispatcher
) {
  EventNames.forEach(eventName => {
    if (original[eventName]) {
      shape.on(eventName, original[eventName]);
    }
  });
}
