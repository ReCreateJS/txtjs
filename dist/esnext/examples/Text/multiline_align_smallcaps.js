import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(610, 610, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    function addText(align, xPos, yPos) {
        var text = new txt.Text({
            text: "Love me some poiretone",
            font: "poiretone",
            align: align,
            characterCase: txt.Case.SMALL_CAPS,
            lineHeight: 50,
            width: 400,
            height: 400,
            size: 100,
            x: xPos,
            y: yPos,
            debug: true
        });
        stage.addChild(text);
    }
    addText(txt.Align.TOP_LEFT, 0, 0);
    addText(txt.Align.TOP_CENTER, 410, 0);
    addText(txt.Align.TOP_RIGHT, 820, 0);
    addText(txt.Align.MIDDLE_LEFT, 0, 410);
    addText(txt.Align.MIDDLE_CENTER, 410, 410);
    addText(txt.Align.MIDDLE_RIGHT, 820, 410);
    addText(txt.Align.BOTTOM_LEFT, 0, 820);
    addText(txt.Align.BOTTOM_CENTER, 410, 820);
    addText(txt.Align.BOTTOM_RIGHT, 820, 820);
    stage.update();
    return stage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lX2FsaWduX3NtYWxsY2Fwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2V4YW1wbGVzL1RleHQvbXVsdGlsaW5lX2FsaWduX3NtYWxsY2Fwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGlCQUFpQixNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSTtJQUMxQixJQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QyxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDaEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSx3QkFBd0I7WUFDOUIsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxPQUFBO1lBQ0wsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNsQyxVQUFVLEVBQUUsRUFBRTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEdBQUc7WUFDWCxJQUFJLEVBQUUsR0FBRztZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHR4dCBmcm9tIFwidHh0XCI7XG5pbXBvcnQgY3JlYXRlSGlEUElDYW52YXMgZnJvbSBcIi4uLy4uL2xpYi9oaWRwaS1jYW52YXNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUhpRFBJQ2FudmFzKDYxMCwgNjEwLCAyKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuICBjb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZShjYW52YXMpO1xuXG4gIGZ1bmN0aW9uIGFkZFRleHQoYWxpZ24sIHhQb3MsIHlQb3MpIHtcbiAgICBjb25zdCB0ZXh0ID0gbmV3IHR4dC5UZXh0KHtcbiAgICAgIHRleHQ6IFwiTG92ZSBtZSBzb21lIHBvaXJldG9uZVwiLFxuICAgICAgZm9udDogXCJwb2lyZXRvbmVcIixcbiAgICAgIGFsaWduLFxuICAgICAgY2hhcmFjdGVyQ2FzZTogdHh0LkNhc2UuU01BTExfQ0FQUyxcbiAgICAgIGxpbmVIZWlnaHQ6IDUwLFxuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGhlaWdodDogNDAwLFxuICAgICAgc2l6ZTogMTAwLFxuICAgICAgeDogeFBvcyxcbiAgICAgIHk6IHlQb3MsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pO1xuICAgIHN0YWdlLmFkZENoaWxkKHRleHQpO1xuICB9XG5cbiAgYWRkVGV4dCh0eHQuQWxpZ24uVE9QX0xFRlQsIDAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfQ0VOVEVSLCA0MTAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfUklHSFQsIDgyMCwgMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9MRUZULCAwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5NSURETEVfQ0VOVEVSLCA0MTAsIDQxMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9SSUdIVCwgODIwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fTEVGVCwgMCwgODIwKTtcbiAgYWRkVGV4dCh0eHQuQWxpZ24uQk9UVE9NX0NFTlRFUiwgNDEwLCA4MjApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fUklHSFQsIDgyMCwgODIwKTtcblxuICBzdGFnZS51cGRhdGUoKTtcbiAgcmV0dXJuIHN0YWdlO1xufVxuIl19