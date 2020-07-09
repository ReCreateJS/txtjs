import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(610, 610, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    function addText(align, xPos, yPos) {
        var text = new txt.CharacterText({
            text: "love me\nsome\npoiretone",
            font: "poiretone",
            align: align,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lX2FsaWduX2JyZWFrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2V4YW1wbGVzL0NoYXJhY3RlclRleHQvbXVsdGlsaW5lX2FsaWduX2JyZWFrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGlCQUFpQixNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSTtJQUMxQixJQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QyxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDaEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQ2pDLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxPQUFBO1lBQ0wsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLElBQUksRUFBRSxHQUFHO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFMUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0IGZyb20gXCJ0eHRcIjtcbmltcG9ydCBjcmVhdGVIaURQSUNhbnZhcyBmcm9tIFwiLi4vLi4vbGliL2hpZHBpLWNhbnZhc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgY2FudmFzID0gY3JlYXRlSGlEUElDYW52YXMoNjEwLCA2MTAsIDIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gIGNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKGNhbnZhcyk7XG5cbiAgZnVuY3Rpb24gYWRkVGV4dChhbGlnbiwgeFBvcywgeVBvcykge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJsb3ZlIG1lXFxuc29tZVxcbnBvaXJldG9uZVwiLFxuICAgICAgZm9udDogXCJwb2lyZXRvbmVcIixcbiAgICAgIGFsaWduLFxuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGhlaWdodDogNDAwLFxuICAgICAgc2l6ZTogMTAwLFxuICAgICAgeDogeFBvcyxcbiAgICAgIHk6IHlQb3MsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pO1xuICAgIHN0YWdlLmFkZENoaWxkKHRleHQpO1xuICB9XG5cbiAgYWRkVGV4dCh0eHQuQWxpZ24uVE9QX0xFRlQsIDAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfQ0VOVEVSLCA0MTAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfUklHSFQsIDgyMCwgMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9MRUZULCAwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5NSURETEVfQ0VOVEVSLCA0MTAsIDQxMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9SSUdIVCwgODIwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fTEVGVCwgMCwgODIwKTtcbiAgYWRkVGV4dCh0eHQuQWxpZ24uQk9UVE9NX0NFTlRFUiwgNDEwLCA4MjApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fUklHSFQsIDgyMCwgODIwKTtcblxuICBzdGFnZS51cGRhdGUoKTtcbiAgcmV0dXJuIHN0YWdlO1xufVxuIl19