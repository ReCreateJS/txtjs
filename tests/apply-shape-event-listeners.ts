import * as txt from "txt";

describe("Unit tests", function() {
  it("Util: applyShapeEventListeners", function() {
    const knownEvents = [
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

    const shapeEvents = knownEvents.reduce((prev, cur) => {
      prev[cur] = () => {};
      return prev;
    }, {});

    shapeEvents["unknown"] = function() {};

    const eventDispatcher = new createjs.EventDispatcher();

    knownEvents.forEach(eventName => {
      expect(eventDispatcher.hasEventListener(eventName)).toBe(
        false,
        "has " + eventName
      );
    });

    txt.Util.copyEventListeners(shapeEvents, eventDispatcher);

    knownEvents.forEach(eventName => {
      expect(eventDispatcher.hasEventListener(eventName)).toBe(
        true,
        "has " + eventName
      );
    });
    expect(eventDispatcher.hasEventListener("unknown")).toBe(false);
  });
});
