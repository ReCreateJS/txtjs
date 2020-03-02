describe("Unit tests", function() {
  it("Util: applyShapeEventListeners", function() {
    let knownEvents = [
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

    let shapeEvents = knownEvents.reduce((prev, cur) => {
      prev[cur] = function() {};
      return prev;
    }, {});

    shapeEvents["unknown"] = function() {};

    let eventDispatcher = new createjs.EventDispatcher();

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
