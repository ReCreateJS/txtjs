import * as txt from "txt";
describe("Unit tests", function () {
    it("Util: applyShapeEventListeners", function () {
        var knownEvents = [
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
        var shapeEvents = knownEvents.reduce(function (prev, cur) {
            prev[cur] = function () { };
            return prev;
        }, {});
        shapeEvents["unknown"] = function () { };
        var eventDispatcher = new createjs.EventDispatcher();
        knownEvents.forEach(function (eventName) {
            expect(eventDispatcher.hasEventListener(eventName)).toBe(false, "has " + eventName);
        });
        txt.Util.copyEventListeners(shapeEvents, eventDispatcher);
        knownEvents.forEach(function (eventName) {
            expect(eventDispatcher.hasEventListener(eventName)).toBe(true, "has " + eventName);
        });
        expect(eventDispatcher.hasEventListener("unknown")).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktc2hhcGUtZXZlbnQtbGlzdGVuZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvYXBwbHktc2hhcGUtZXZlbnQtbGlzdGVuZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDckIsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ25DLElBQU0sV0FBVyxHQUFHO1lBQ2xCLE9BQU87WUFDUCxVQUFVO1lBQ1YsV0FBVztZQUNYLFVBQVU7WUFDVixXQUFXO1lBQ1gsV0FBVztZQUNYLFNBQVM7WUFDVCxTQUFTO1lBQ1QsVUFBVTtZQUNWLE9BQU87WUFDUCxTQUFTO1lBQ1QsTUFBTTtTQUNQLENBQUM7UUFFRixJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUc7WUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQU8sQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGNBQVksQ0FBQyxDQUFDO1FBRXZDLElBQU0sZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO1lBQzNCLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RELEtBQUssRUFDTCxNQUFNLEdBQUcsU0FBUyxDQUNuQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUxRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztZQUMzQixNQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN0RCxJQUFJLEVBQ0osTUFBTSxHQUFHLFNBQVMsQ0FDbkIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0IGZyb20gXCJ0eHRcIjtcblxuZGVzY3JpYmUoXCJVbml0IHRlc3RzXCIsIGZ1bmN0aW9uKCkge1xuICBpdChcIlV0aWw6IGFwcGx5U2hhcGVFdmVudExpc3RlbmVyc1wiLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBrbm93bkV2ZW50cyA9IFtcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIFwiZGJsY2xpY2tcIixcbiAgICAgIFwibW91c2Vkb3duXCIsXG4gICAgICBcIm1vdXNlb3V0XCIsXG4gICAgICBcIm1vdXNlb3ZlclwiLFxuICAgICAgXCJwcmVzc21vdmVcIixcbiAgICAgIFwicHJlc3N1cFwiLFxuICAgICAgXCJyb2xsb3V0XCIsXG4gICAgICBcInJvbGxvdmVyXCIsXG4gICAgICBcImFkZGVkXCIsXG4gICAgICBcInJlbW92ZWRcIixcbiAgICAgIFwidGlja1wiXG4gICAgXTtcblxuICAgIGNvbnN0IHNoYXBlRXZlbnRzID0ga25vd25FdmVudHMucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcbiAgICAgIHByZXZbY3VyXSA9ICgpID0+IHt9O1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgc2hhcGVFdmVudHNbXCJ1bmtub3duXCJdID0gZnVuY3Rpb24oKSB7fTtcblxuICAgIGNvbnN0IGV2ZW50RGlzcGF0Y2hlciA9IG5ldyBjcmVhdGVqcy5FdmVudERpc3BhdGNoZXIoKTtcblxuICAgIGtub3duRXZlbnRzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIGV4cGVjdChldmVudERpc3BhdGNoZXIuaGFzRXZlbnRMaXN0ZW5lcihldmVudE5hbWUpKS50b0JlKFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgXCJoYXMgXCIgKyBldmVudE5hbWVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0eHQuVXRpbC5jb3B5RXZlbnRMaXN0ZW5lcnMoc2hhcGVFdmVudHMsIGV2ZW50RGlzcGF0Y2hlcik7XG5cbiAgICBrbm93bkV2ZW50cy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICBleHBlY3QoZXZlbnREaXNwYXRjaGVyLmhhc0V2ZW50TGlzdGVuZXIoZXZlbnROYW1lKSkudG9CZShcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgXCJoYXMgXCIgKyBldmVudE5hbWVcbiAgICAgICk7XG4gICAgfSk7XG4gICAgZXhwZWN0KGV2ZW50RGlzcGF0Y2hlci5oYXNFdmVudExpc3RlbmVyKFwidW5rbm93blwiKSkudG9CZShmYWxzZSk7XG4gIH0pO1xufSk7XG4iXX0=