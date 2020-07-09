import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(1100, 700, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    stage.scaleX = stage.scaleY = 1;
    var i = new createjs.Bitmap("images/tracking_test.png");
    i.x = 25;
    i.y = 14;
    i.scaleX = i.scaleY = 1;
    stage.addChild(i);
    var alphabetString = "abcdefghijklmnop";
    function addText(font, tracking, xPos, yPos, size) {
        stage.addChild(new txt.CharacterText({
            text: tracking + " " + alphabetString,
            font: font,
            width: 1900,
            height: 300,
            fillColor: "red",
            tracking: tracking,
            size: size,
            x: xPos,
            y: yPos
        }));
    }
    var LEFT_XPOS = 100;
    var LEFT_SIZE = 62;
    var RIGHT_XPOS = 1454;
    var RIGHT_SIZE = 29;
    addText("abel", 0, LEFT_XPOS, 100, LEFT_SIZE);
    addText("abel", 100, LEFT_XPOS, 170, LEFT_SIZE);
    addText("abel", 200, LEFT_XPOS, 239, LEFT_SIZE);
    addText("abel", 300, LEFT_XPOS, 309, LEFT_SIZE);
    addText("abel", 400, LEFT_XPOS, 378, LEFT_SIZE);
    addText("abel", 500, LEFT_XPOS, 448, LEFT_SIZE);
    addText("cinzel", 0, LEFT_XPOS, 517, LEFT_SIZE);
    addText("cinzel", 100, LEFT_XPOS, 586, LEFT_SIZE);
    addText("cinzel", 200, LEFT_XPOS, 656, LEFT_SIZE);
    addText("cinzel", 300, LEFT_XPOS, 725, LEFT_SIZE);
    addText("cinzel", 400, LEFT_XPOS, 794, LEFT_SIZE);
    addText("cinzel", 500, LEFT_XPOS, 864, LEFT_SIZE);
    addText("craftygirls", 0, LEFT_XPOS, 919, LEFT_SIZE);
    addText("craftygirls", 100, LEFT_XPOS, 988, LEFT_SIZE);
    addText("craftygirls", 200, LEFT_XPOS, 1058, LEFT_SIZE);
    addText("craftygirls", 300, LEFT_XPOS, 1127, LEFT_SIZE);
    addText("craftygirls", 400, LEFT_XPOS, 1197, LEFT_SIZE);
    addText("craftygirls", 500, LEFT_XPOS, 1266, LEFT_SIZE);
    addText("abel", 0, RIGHT_XPOS, 95, RIGHT_SIZE);
    addText("abel", 100, RIGHT_XPOS, 164, RIGHT_SIZE);
    addText("abel", 200, RIGHT_XPOS, 233, RIGHT_SIZE);
    addText("abel", 300, RIGHT_XPOS, 303, RIGHT_SIZE);
    addText("abel", 400, RIGHT_XPOS, 372, RIGHT_SIZE);
    addText("abel", 500, RIGHT_XPOS, 442, RIGHT_SIZE);
    addText("cinzel", 0, RIGHT_XPOS, 511, RIGHT_SIZE);
    addText("cinzel", 100, RIGHT_XPOS, 580, RIGHT_SIZE);
    addText("cinzel", 200, RIGHT_XPOS, 650, RIGHT_SIZE);
    addText("cinzel", 300, RIGHT_XPOS, 719, RIGHT_SIZE);
    addText("cinzel", 400, RIGHT_XPOS, 789, RIGHT_SIZE);
    addText("cinzel", 500, RIGHT_XPOS, 858, RIGHT_SIZE);
    addText("craftygirls", 0, RIGHT_XPOS, 920, RIGHT_SIZE);
    addText("craftygirls", 100, RIGHT_XPOS, 989, RIGHT_SIZE);
    addText("craftygirls", 200, RIGHT_XPOS, 1060, RIGHT_SIZE);
    addText("craftygirls", 300, RIGHT_XPOS, 1129, RIGHT_SIZE);
    addText("craftygirls", 400, RIGHT_XPOS, 1198, RIGHT_SIZE);
    addText("craftygirls", 500, RIGHT_XPOS, 1268, RIGHT_SIZE);
    stage.update();
    return stage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmdfbGF5b3V0X3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9leGFtcGxlcy9DaGFyYWN0ZXJUZXh0L3RyYWNraW5nX2xheW91dF90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJO0lBQzFCLElBQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFaEMsSUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDeEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQixJQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztJQUUxQyxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUMvQyxLQUFLLENBQUMsUUFBUSxDQUNaLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUNwQixJQUFJLEVBQUUsUUFBUSxHQUFH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RUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUQsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTFELEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVmLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHR4dCBmcm9tIFwidHh0XCI7XG5pbXBvcnQgY3JlYXRlSGlEUElDYW52YXMgZnJvbSBcIi4uLy4uL2xpYi9oaWRwaS1jYW52YXNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUhpRFBJQ2FudmFzKDExMDAsIDcwMCwgMik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoY2FudmFzKTtcbiAgc3RhZ2Uuc2NhbGVYID0gc3RhZ2Uuc2NhbGVZID0gMTtcblxuICBjb25zdCBpID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcImltYWdlcy90cmFja2luZ190ZXN0LnBuZ1wiKTtcbiAgaS54ID0gMjU7XG4gIGkueSA9IDE0O1xuICBpLnNjYWxlWCA9IGkuc2NhbGVZID0gMTtcbiAgc3RhZ2UuYWRkQ2hpbGQoaSk7XG5cbiAgY29uc3QgYWxwaGFiZXRTdHJpbmcgPSBcImFiY2RlZmdoaWprbG1ub3BcIjtcblxuICBmdW5jdGlvbiBhZGRUZXh0KGZvbnQsIHRyYWNraW5nLCB4UG9zLCB5UG9zLCBzaXplKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQoXG4gICAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgICB0ZXh0OiB0cmFja2luZyArIFwiIFwiICsgYWxwaGFiZXRTdHJpbmcsXG4gICAgICAgIGZvbnQsXG4gICAgICAgIHdpZHRoOiAxOTAwLFxuICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgZmlsbENvbG9yOiBcInJlZFwiLFxuICAgICAgICB0cmFja2luZyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgeDogeFBvcyxcbiAgICAgICAgeTogeVBvc1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY29uc3QgTEVGVF9YUE9TID0gMTAwO1xuICBjb25zdCBMRUZUX1NJWkUgPSA2MjtcbiAgY29uc3QgUklHSFRfWFBPUyA9IDE0NTQ7XG4gIGNvbnN0IFJJR0hUX1NJWkUgPSAyOTtcbiAgYWRkVGV4dChcImFiZWxcIiwgMCwgTEVGVF9YUE9TLCAxMDAsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDEwMCwgTEVGVF9YUE9TLCAxNzAsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDIwMCwgTEVGVF9YUE9TLCAyMzksIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDMwMCwgTEVGVF9YUE9TLCAzMDksIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDQwMCwgTEVGVF9YUE9TLCAzNzgsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDUwMCwgTEVGVF9YUE9TLCA0NDgsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgMCwgTEVGVF9YUE9TLCA1MTcsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgMTAwLCBMRUZUX1hQT1MsIDU4NiwgTEVGVF9TSVpFKTtcbiAgYWRkVGV4dChcImNpbnplbFwiLCAyMDAsIExFRlRfWFBPUywgNjU2LCBMRUZUX1NJWkUpO1xuICBhZGRUZXh0KFwiY2luemVsXCIsIDMwMCwgTEVGVF9YUE9TLCA3MjUsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgNDAwLCBMRUZUX1hQT1MsIDc5NCwgTEVGVF9TSVpFKTtcbiAgYWRkVGV4dChcImNpbnplbFwiLCA1MDAsIExFRlRfWFBPUywgODY0LCBMRUZUX1NJWkUpO1xuICBhZGRUZXh0KFwiY3JhZnR5Z2lybHNcIiwgMCwgTEVGVF9YUE9TLCA5MTksIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJjcmFmdHlnaXJsc1wiLCAxMDAsIExFRlRfWFBPUywgOTg4LCBMRUZUX1NJWkUpO1xuICBhZGRUZXh0KFwiY3JhZnR5Z2lybHNcIiwgMjAwLCBMRUZUX1hQT1MsIDEwNTgsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJjcmFmdHlnaXJsc1wiLCAzMDAsIExFRlRfWFBPUywgMTEyNywgTEVGVF9TSVpFKTtcbiAgYWRkVGV4dChcImNyYWZ0eWdpcmxzXCIsIDQwMCwgTEVGVF9YUE9TLCAxMTk3LCBMRUZUX1NJWkUpO1xuICBhZGRUZXh0KFwiY3JhZnR5Z2lybHNcIiwgNTAwLCBMRUZUX1hQT1MsIDEyNjYsIExFRlRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDAsIFJJR0hUX1hQT1MsIDk1LCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImFiZWxcIiwgMTAwLCBSSUdIVF9YUE9TLCAxNjQsIFJJR0hUX1NJWkUpO1xuICBhZGRUZXh0KFwiYWJlbFwiLCAyMDAsIFJJR0hUX1hQT1MsIDIzMywgUklHSFRfU0laRSk7XG4gIGFkZFRleHQoXCJhYmVsXCIsIDMwMCwgUklHSFRfWFBPUywgMzAzLCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImFiZWxcIiwgNDAwLCBSSUdIVF9YUE9TLCAzNzIsIFJJR0hUX1NJWkUpO1xuICBhZGRUZXh0KFwiYWJlbFwiLCA1MDAsIFJJR0hUX1hQT1MsIDQ0MiwgUklHSFRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgMCwgUklHSFRfWFBPUywgNTExLCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImNpbnplbFwiLCAxMDAsIFJJR0hUX1hQT1MsIDU4MCwgUklHSFRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgMjAwLCBSSUdIVF9YUE9TLCA2NTAsIFJJR0hUX1NJWkUpO1xuICBhZGRUZXh0KFwiY2luemVsXCIsIDMwMCwgUklHSFRfWFBPUywgNzE5LCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImNpbnplbFwiLCA0MDAsIFJJR0hUX1hQT1MsIDc4OSwgUklHSFRfU0laRSk7XG4gIGFkZFRleHQoXCJjaW56ZWxcIiwgNTAwLCBSSUdIVF9YUE9TLCA4NTgsIFJJR0hUX1NJWkUpO1xuICBhZGRUZXh0KFwiY3JhZnR5Z2lybHNcIiwgMCwgUklHSFRfWFBPUywgOTIwLCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImNyYWZ0eWdpcmxzXCIsIDEwMCwgUklHSFRfWFBPUywgOTg5LCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImNyYWZ0eWdpcmxzXCIsIDIwMCwgUklHSFRfWFBPUywgMTA2MCwgUklHSFRfU0laRSk7XG4gIGFkZFRleHQoXCJjcmFmdHlnaXJsc1wiLCAzMDAsIFJJR0hUX1hQT1MsIDExMjksIFJJR0hUX1NJWkUpO1xuICBhZGRUZXh0KFwiY3JhZnR5Z2lybHNcIiwgNDAwLCBSSUdIVF9YUE9TLCAxMTk4LCBSSUdIVF9TSVpFKTtcbiAgYWRkVGV4dChcImNyYWZ0eWdpcmxzXCIsIDUwMCwgUklHSFRfWFBPUywgMTI2OCwgUklHSFRfU0laRSk7XG5cbiAgc3RhZ2UudXBkYXRlKCk7XG5cbiAgcmV0dXJuIHN0YWdlO1xufVxuIl19