import * as txt from "txt";
import createHiDPICanvas from "../../lib/hidpi-canvas";
export default function init() {
    var canvas = createHiDPICanvas(1000, 1000, 2);
    document.body.appendChild(canvas);
    var stage = new createjs.Stage(canvas);
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1600,
        height: 130,
        size: 120,
        x: 10,
        y: 0,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1500,
        height: 130,
        size: 120,
        x: 10,
        y: 150,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1400,
        height: 130,
        size: 120,
        x: 10,
        y: 300,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1300,
        height: 130,
        size: 120,
        x: 10,
        y: 450,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1200,
        height: 130,
        size: 120,
        x: 10,
        y: 600,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1100,
        height: 130,
        size: 120,
        x: 10,
        y: 750,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 1000,
        height: 130,
        size: 120,
        x: 10,
        y: 900,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 900,
        height: 130,
        size: 120,
        x: 10,
        y: 1050,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 800,
        height: 130,
        size: 120,
        x: 10,
        y: 1200,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 700,
        height: 130,
        size: 120,
        x: 10,
        y: 1350,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 600,
        height: 130,
        size: 120,
        x: 10,
        y: 1500,
        debug: true
    }));
    stage.addChild(new txt.CharacterText({
        text: "The fox jumped over...",
        font: "raleway",
        singleLine: true,
        autoReduce: true,
        tracking: 200,
        minSize: 70,
        lineHeight: 120,
        width: 500,
        height: 130,
        size: 120,
        x: 10,
        y: 1650,
        debug: true
    }));
    stage.update();
    return stage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemVfcmVkdWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZXhhbXBsZXMvQ2hhcmFjdGVyVGV4dC9hdXRvc2l6ZV9yZWR1Y2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxpQkFBaUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxNQUFNLENBQUMsT0FBTyxVQUFVLElBQUk7SUFDMUIsSUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxJQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekMsS0FBSyxDQUFDLFFBQVEsQ0FDWixJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDcEIsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFFBQVEsRUFBRSxHQUFHO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxVQUFVLEVBQUUsR0FBRztRQUNmLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLEdBQUc7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLENBQUM7UUFDSixLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FDSCxDQUFDO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FDWixJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDcEIsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxJQUFJ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TyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHh0IGZyb20gXCJ0eHRcIjtcbmltcG9ydCBjcmVhdGVIaURQSUNhbnZhcyBmcm9tIFwiLi4vLi4vbGliL2hpZHBpLWNhbnZhc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgY2FudmFzID0gY3JlYXRlSGlEUElDYW52YXMoMTAwMCwgMTAwMCwgMik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoY2FudmFzKTtcblxuICBzdGFnZS5hZGRDaGlsZChcbiAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyLi4uXCIsXG4gICAgICBmb250OiBcInJhbGV3YXlcIixcbiAgICAgIHNpbmdsZUxpbmU6IHRydWUsXG4gICAgICBhdXRvUmVkdWNlOiB0cnVlLFxuICAgICAgdHJhY2tpbmc6IDIwMCxcbiAgICAgIG1pblNpemU6IDcwLFxuICAgICAgbGluZUhlaWdodDogMTIwLFxuICAgICAgd2lkdGg6IDE2MDAsXG4gICAgICBoZWlnaHQ6IDEzMCxcbiAgICAgIHNpemU6IDEyMCxcbiAgICAgIHg6IDEwLFxuICAgICAgeTogMCxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSlcbiAgKTtcblxuICBzdGFnZS5hZGRDaGlsZChcbiAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyLi4uXCIsXG4gICAgICBmb250OiBcInJhbGV3YXlcIixcbiAgICAgIHNpbmdsZUxpbmU6IHRydWUsXG4gICAgICBhdXRvUmVkdWNlOiB0cnVlLFxuICAgICAgdHJhY2tpbmc6IDIwMCxcbiAgICAgIG1pblNpemU6IDcwLFxuICAgICAgbGluZUhlaWdodDogMTIwLFxuICAgICAgd2lkdGg6IDE1MDAsXG4gICAgICBoZWlnaHQ6IDEzMCxcbiAgICAgIHNpemU6IDEyMCxcbiAgICAgIHg6IDEwLFxuICAgICAgeTogMTUwLFxuICAgICAgZGVidWc6IHRydWVcbiAgICB9KVxuICApO1xuXG4gIHN0YWdlLmFkZENoaWxkKFxuICAgIG5ldyB0eHQuQ2hhcmFjdGVyVGV4dCh7XG4gICAgICB0ZXh0OiBcIlRoZSBmb3gganVtcGVkIG92ZXIuLi5cIixcbiAgICAgIGZvbnQ6IFwicmFsZXdheVwiLFxuICAgICAgc2luZ2xlTGluZTogdHJ1ZSxcbiAgICAgIGF1dG9SZWR1Y2U6IHRydWUsXG4gICAgICB0cmFja2luZzogMjAwLFxuICAgICAgbWluU2l6ZTogNzAsXG4gICAgICBsaW5lSGVpZ2h0OiAxMjAsXG4gICAgICB3aWR0aDogMTQwMCxcbiAgICAgIGhlaWdodDogMTMwLFxuICAgICAgc2l6ZTogMTIwLFxuICAgICAgeDogMTAsXG4gICAgICB5OiAzMDAsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pXG4gICk7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoXG4gICAgbmV3IHR4dC5DaGFyYWN0ZXJUZXh0KHtcbiAgICAgIHRleHQ6IFwiVGhlIGZveCBqdW1wZWQgb3Zlci4uLlwiLFxuICAgICAgZm9udDogXCJyYWxld2F5XCIsXG4gICAgICBzaW5nbGVMaW5lOiB0cnVlLFxuICAgICAgYXV0b1JlZHVjZTogdHJ1ZSxcbiAgICAgIHRyYWNraW5nOiAyMDAsXG4gICAgICBtaW5TaXplOiA3MCxcbiAgICAgIGxpbmVIZWlnaHQ6IDEyMCxcbiAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgaGVpZ2h0OiAxMzAsXG4gICAgICBzaXplOiAxMjAsXG4gICAgICB4OiAxMCxcbiAgICAgIHk6IDQ1MCxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSlcbiAgKTtcblxuICBzdGFnZS5hZGRDaGlsZChcbiAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyLi4uXCIsXG4gICAgICBmb250OiBcInJhbGV3YXlcIixcbiAgICAgIHNpbmdsZUxpbmU6IHRydWUsXG4gICAgICBhdXRvUmVkdWNlOiB0cnVlLFxuICAgICAgdHJhY2tpbmc6IDIwMCxcbiAgICAgIG1pblNpemU6IDcwLFxuICAgICAgbGluZUhlaWdodDogMTIwLFxuICAgICAgd2lkdGg6IDEyMDAsXG4gICAgICBoZWlnaHQ6IDEzMCxcbiAgICAgIHNpemU6IDEyMCxcbiAgICAgIHg6IDEwLFxuICAgICAgeTogNjAwLFxuICAgICAgZGVidWc6IHRydWVcbiAgICB9KVxuICApO1xuXG4gIHN0YWdlLmFkZENoaWxkKFxuICAgIG5ldyB0eHQuQ2hhcmFjdGVyVGV4dCh7XG4gICAgICB0ZXh0OiBcIlRoZSBmb3gganVtcGVkIG92ZXIuLi5cIixcbiAgICAgIGZvbnQ6IFwicmFsZXdheVwiLFxuICAgICAgc2luZ2xlTGluZTogdHJ1ZSxcbiAgICAgIGF1dG9SZWR1Y2U6IHRydWUsXG4gICAgICB0cmFja2luZzogMjAwLFxuICAgICAgbWluU2l6ZTogNzAsXG4gICAgICBsaW5lSGVpZ2h0OiAxMjAsXG4gICAgICB3aWR0aDogMTEwMCxcbiAgICAgIGhlaWdodDogMTMwLFxuICAgICAgc2l6ZTogMTIwLFxuICAgICAgeDogMTAsXG4gICAgICB5OiA3NTAsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pXG4gICk7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoXG4gICAgbmV3IHR4dC5DaGFyYWN0ZXJUZXh0KHtcbiAgICAgIHRleHQ6IFwiVGhlIGZveCBqdW1wZWQgb3Zlci4uLlwiLFxuICAgICAgZm9udDogXCJyYWxld2F5XCIsXG4gICAgICBzaW5nbGVMaW5lOiB0cnVlLFxuICAgICAgYXV0b1JlZHVjZTogdHJ1ZSxcbiAgICAgIHRyYWNraW5nOiAyMDAsXG4gICAgICBtaW5TaXplOiA3MCxcbiAgICAgIGxpbmVIZWlnaHQ6IDEyMCxcbiAgICAgIHdpZHRoOiAxMDAwLFxuICAgICAgaGVpZ2h0OiAxMzAsXG4gICAgICBzaXplOiAxMjAsXG4gICAgICB4OiAxMCxcbiAgICAgIHk6IDkwMCxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSlcbiAgKTtcblxuICBzdGFnZS5hZGRDaGlsZChcbiAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyLi4uXCIsXG4gICAgICBmb250OiBcInJhbGV3YXlcIixcbiAgICAgIHNpbmdsZUxpbmU6IHRydWUsXG4gICAgICBhdXRvUmVkdWNlOiB0cnVlLFxuICAgICAgdHJhY2tpbmc6IDIwMCxcbiAgICAgIG1pblNpemU6IDcwLFxuICAgICAgbGluZUhlaWdodDogMTIwLFxuICAgICAgd2lkdGg6IDkwMCxcbiAgICAgIGhlaWdodDogMTMwLFxuICAgICAgc2l6ZTogMTIwLFxuICAgICAgeDogMTAsXG4gICAgICB5OiAxMDUwLFxuICAgICAgZGVidWc6IHRydWVcbiAgICB9KVxuICApO1xuXG4gIHN0YWdlLmFkZENoaWxkKFxuICAgIG5ldyB0eHQuQ2hhcmFjdGVyVGV4dCh7XG4gICAgICB0ZXh0OiBcIlRoZSBmb3gganVtcGVkIG92ZXIuLi5cIixcbiAgICAgIGZvbnQ6IFwicmFsZXdheVwiLFxuICAgICAgc2luZ2xlTGluZTogdHJ1ZSxcbiAgICAgIGF1dG9SZWR1Y2U6IHRydWUsXG4gICAgICB0cmFja2luZzogMjAwLFxuICAgICAgbWluU2l6ZTogNzAsXG4gICAgICBsaW5lSGVpZ2h0OiAxMjAsXG4gICAgICB3aWR0aDogODAwLFxuICAgICAgaGVpZ2h0OiAxMzAsXG4gICAgICBzaXplOiAxMjAsXG4gICAgICB4OiAxMCxcbiAgICAgIHk6IDEyMDAsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pXG4gICk7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoXG4gICAgbmV3IHR4dC5DaGFyYWN0ZXJUZXh0KHtcbiAgICAgIHRleHQ6IFwiVGhlIGZveCBqdW1wZWQgb3Zlci4uLlwiLFxuICAgICAgZm9udDogXCJyYWxld2F5XCIsXG4gICAgICBzaW5nbGVMaW5lOiB0cnVlLFxuICAgICAgYXV0b1JlZHVjZTogdHJ1ZSxcbiAgICAgIHRyYWNraW5nOiAyMDAsXG4gICAgICBtaW5TaXplOiA3MCxcbiAgICAgIGxpbmVIZWlnaHQ6IDEyMCxcbiAgICAgIHdpZHRoOiA3MDAsXG4gICAgICBoZWlnaHQ6IDEzMCxcbiAgICAgIHNpemU6IDEyMCxcbiAgICAgIHg6IDEwLFxuICAgICAgeTogMTM1MCxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSlcbiAgKTtcblxuICBzdGFnZS5hZGRDaGlsZChcbiAgICBuZXcgdHh0LkNoYXJhY3RlclRleHQoe1xuICAgICAgdGV4dDogXCJUaGUgZm94IGp1bXBlZCBvdmVyLi4uXCIsXG4gICAgICBmb250OiBcInJhbGV3YXlcIixcbiAgICAgIHNpbmdsZUxpbmU6IHRydWUsXG4gICAgICBhdXRvUmVkdWNlOiB0cnVlLFxuICAgICAgdHJhY2tpbmc6IDIwMCxcbiAgICAgIG1pblNpemU6IDcwLFxuICAgICAgbGluZUhlaWdodDogMTIwLFxuICAgICAgd2lkdGg6IDYwMCxcbiAgICAgIGhlaWdodDogMTMwLFxuICAgICAgc2l6ZTogMTIwLFxuICAgICAgeDogMTAsXG4gICAgICB5OiAxNTAwLFxuICAgICAgZGVidWc6IHRydWVcbiAgICB9KVxuICApO1xuXG4gIHN0YWdlLmFkZENoaWxkKFxuICAgIG5ldyB0eHQuQ2hhcmFjdGVyVGV4dCh7XG4gICAgICB0ZXh0OiBcIlRoZSBmb3gganVtcGVkIG92ZXIuLi5cIixcbiAgICAgIGZvbnQ6IFwicmFsZXdheVwiLFxuICAgICAgc2luZ2xlTGluZTogdHJ1ZSxcbiAgICAgIGF1dG9SZWR1Y2U6IHRydWUsXG4gICAgICB0cmFja2luZzogMjAwLFxuICAgICAgbWluU2l6ZTogNzAsXG4gICAgICBsaW5lSGVpZ2h0OiAxMjAsXG4gICAgICB3aWR0aDogNTAwLFxuICAgICAgaGVpZ2h0OiAxMzAsXG4gICAgICBzaXplOiAxMjAsXG4gICAgICB4OiAxMCxcbiAgICAgIHk6IDE2NTAsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pXG4gICk7XG5cbiAgc3RhZ2UudXBkYXRlKCk7XG5cbiAgcmV0dXJuIHN0YWdlO1xufVxuIl19