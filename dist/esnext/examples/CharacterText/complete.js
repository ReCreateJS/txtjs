import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(300, 200, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    var text = new txt.CharacterText({
        text: "The fox jumped over the log.",
        font: "arimo",
        complete: function () {
            console.log("complete");
        },
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
    return stage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9leGFtcGxlcy9DaGFyYWN0ZXJUZXh0L2NvbXBsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJO0lBQzFCLElBQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpDLElBQU0sSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNqQyxJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNaLFVBQVUsRUFBRSxHQUFHO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtLQUNOLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0IGZyb20gXCJ0eHRcIjtcbmltcG9ydCBjcmVhdGVIaURQSUNhbnZhcyBmcm9tIFwiLi4vLi4vbGliL2hpZHBpLWNhbnZhc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgY2FudmFzID0gY3JlYXRlSGlEUElDYW52YXMoMzAwLCAyMDAsIDIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gIGNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKGNhbnZhcyk7XG5cbiAgY29uc3QgdGV4dCA9IG5ldyB0eHQuQ2hhcmFjdGVyVGV4dCh7XG4gICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyIHRoZSBsb2cuXCIsXG4gICAgZm9udDogXCJhcmltb1wiLFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgfSxcbiAgICB0cmFja2luZzogLTQsXG4gICAgbGluZUhlaWdodDogMTIwLFxuICAgIHdpZHRoOiA2MDAsXG4gICAgaGVpZ2h0OiAzNjAsXG4gICAgc2l6ZTogMTIwLFxuICAgIHg6IDEwLFxuICAgIHk6IDEwXG4gIH0pO1xuXG4gIHN0YWdlLmFkZENoaWxkKHRleHQpO1xuXG4gIHN0YWdlLnVwZGF0ZSgpO1xuICByZXR1cm4gc3RhZ2U7XG59XG4iXX0=