import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(320, 290, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    var text = new txt.Text({
        text: "The fox jumped over the log.",
        font: "raleway",
        align: txt.Align.TOP_RIGHT,
        tracking: -4,
        lineHeight: 120,
        width: 600,
        height: 360,
        size: 120,
        x: 10,
        y: 10
    });
    stage.addChild(text);
    stage.update();
    window.setTimeout(function () {
        text.font = "lobster";
        text.layout();
    }, 2000);
    return stage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dF9jaGFuZ2VfZm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2V4YW1wbGVzL1RleHQvdGV4dF9jaGFuZ2VfZm9udC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGlCQUFpQixNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSTtJQUMxQixJQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QyxJQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxFQUFFLDhCQUE4QjtRQUNwQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDMUIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNaLFVBQVUsRUFBRSxHQUFHO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtLQUNOLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWYsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRVQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0IGZyb20gXCJ0eHRcIjtcbmltcG9ydCBjcmVhdGVIaURQSUNhbnZhcyBmcm9tIFwiLi4vLi4vbGliL2hpZHBpLWNhbnZhc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgY2FudmFzID0gY3JlYXRlSGlEUElDYW52YXMoMzIwLCAyOTAsIDIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gIGNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKGNhbnZhcyk7XG5cbiAgY29uc3QgdGV4dCA9IG5ldyB0eHQuVGV4dCh7XG4gICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyIHRoZSBsb2cuXCIsXG4gICAgZm9udDogXCJyYWxld2F5XCIsXG4gICAgYWxpZ246IHR4dC5BbGlnbi5UT1BfUklHSFQsXG4gICAgdHJhY2tpbmc6IC00LFxuICAgIGxpbmVIZWlnaHQ6IDEyMCxcbiAgICB3aWR0aDogNjAwLFxuICAgIGhlaWdodDogMzYwLFxuICAgIHNpemU6IDEyMCxcbiAgICB4OiAxMCxcbiAgICB5OiAxMFxuICB9KTtcblxuICBzdGFnZS5hZGRDaGlsZCh0ZXh0KTtcblxuICBzdGFnZS51cGRhdGUoKTtcblxuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICB0ZXh0LmZvbnQgPSBcImxvYnN0ZXJcIjtcbiAgICB0ZXh0LmxheW91dCgpO1xuICB9LCAyMDAwKTtcblxuICByZXR1cm4gc3RhZ2U7XG59XG4iXX0=