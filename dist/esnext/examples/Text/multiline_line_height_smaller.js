import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(610, 610, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    function addText(align, xPos, yPos) {
        var text = new txt.Text({
            text: "love\n me some\n poiretone",
            font: "poiretone",
            align: align,
            lineHeight: 70,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lX2xpbmVfaGVpZ2h0X3NtYWxsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9leGFtcGxlcy9UZXh0L211bHRpbGluZV9saW5lX2hlaWdodF9zbWFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJO0lBQzFCLElBQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpDLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUNoQyxJQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLDRCQUE0QjtZQUNsQyxJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLE9BQUE7WUFDTCxVQUFVLEVBQUUsRUFBRTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEdBQUc7WUFDWCxJQUFJLEVBQUUsR0FBRztZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHR4dCBmcm9tIFwidHh0XCI7XG5pbXBvcnQgY3JlYXRlSGlEUElDYW52YXMgZnJvbSBcIi4uLy4uL2xpYi9oaWRwaS1jYW52YXNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUhpRFBJQ2FudmFzKDYxMCwgNjEwLCAyKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuICBjb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZShjYW52YXMpO1xuXG4gIGZ1bmN0aW9uIGFkZFRleHQoYWxpZ24sIHhQb3MsIHlQb3MpIHtcbiAgICBjb25zdCB0ZXh0ID0gbmV3IHR4dC5UZXh0KHtcbiAgICAgIHRleHQ6IFwibG92ZVxcbiBtZSBzb21lXFxuIHBvaXJldG9uZVwiLFxuICAgICAgZm9udDogXCJwb2lyZXRvbmVcIixcbiAgICAgIGFsaWduLFxuICAgICAgbGluZUhlaWdodDogNzAsXG4gICAgICB3aWR0aDogNDAwLFxuICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICBzaXplOiAxMDAsXG4gICAgICB4OiB4UG9zLFxuICAgICAgeTogeVBvcyxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSk7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodGV4dCk7XG4gIH1cbiAgYWRkVGV4dCh0eHQuQWxpZ24uVE9QX0xFRlQsIDAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfQ0VOVEVSLCA0MTAsIDApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5UT1BfUklHSFQsIDgyMCwgMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9MRUZULCAwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5NSURETEVfQ0VOVEVSLCA0MTAsIDQxMCk7XG4gIGFkZFRleHQodHh0LkFsaWduLk1JRERMRV9SSUdIVCwgODIwLCA0MTApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fTEVGVCwgMCwgODIwKTtcbiAgYWRkVGV4dCh0eHQuQWxpZ24uQk9UVE9NX0NFTlRFUiwgNDEwLCA4MjApO1xuICBhZGRUZXh0KHR4dC5BbGlnbi5CT1RUT01fUklHSFQsIDgyMCwgODIwKTtcblxuICBzdGFnZS51cGRhdGUoKTtcbiAgcmV0dXJuIHN0YWdlO1xufVxuIl19