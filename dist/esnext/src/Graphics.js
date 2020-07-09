import SVGArc from "./SVGArc";
import { parsePathData } from "./SVGPath";
var Graphics = /** @class */ (function () {
    function Graphics() {
    }
    /**
     * Build up createjs Graphics commands based on path data.
     */
    Graphics.init = function (target, svgpath) {
        var ca = parsePathData(svgpath);
        var G = createjs.Graphics;
        for (var n = 0; n < ca.length; n++) {
            var c = ca[n].command;
            var p = ca[n].points;
            switch (c) {
                case "L":
                    target.append(new G.LineTo(p[0], p[1]));
                    break;
                case "M":
                    target.append(new G.MoveTo(p[0], p[1]));
                    break;
                case "C":
                    target.append(new G.BezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]));
                    break;
                case "Q":
                    target.append(new G.QuadraticCurveTo(p[0], p[1], p[2], p[3]));
                    break;
                case "A":
                    target.append(new SVGArc(p[0], p[1], p[2], p[3], p[4], p[5], p[6]));
                    break;
                case "Z":
                    target.append(new G.ClosePath());
                    target.append(new G.MoveTo(p[0], p[1]));
                    break;
            }
        }
    };
    return Graphics;
}());
export default Graphics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvR3JhcGhpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFMUM7SUFBQTtJQXlDQSxDQUFDO0lBeENDOztPQUVHO0lBQ0ksYUFBSSxHQUFYLFVBQVksTUFBTSxFQUFFLE9BQWU7UUFDakMsSUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN4QixJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxFQUFFO2dCQUNULEtBQUssR0FBRztvQkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsTUFBTTtnQkFFUixLQUFLLEdBQUc7b0JBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLE1BQU07Z0JBRVIsS0FBSyxHQUFHO29CQUNOLE1BQU0sQ0FBQyxNQUFNLENBQ1gsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3hELENBQUM7b0JBQ0YsTUFBTTtnQkFFUixLQUFLLEdBQUc7b0JBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxNQUFNO2dCQUVSLEtBQUssR0FBRztvQkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLE1BQU07Z0JBRVIsS0FBSyxHQUFHO29CQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLE1BQU07YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNWR0FyYyBmcm9tIFwiLi9TVkdBcmNcIjtcbmltcG9ydCB7IHBhcnNlUGF0aERhdGEgfSBmcm9tIFwiLi9TVkdQYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIHtcbiAgLyoqXG4gICAqIEJ1aWxkIHVwIGNyZWF0ZWpzIEdyYXBoaWNzIGNvbW1hbmRzIGJhc2VkIG9uIHBhdGggZGF0YS5cbiAgICovXG4gIHN0YXRpYyBpbml0KHRhcmdldCwgc3ZncGF0aDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2EgPSBwYXJzZVBhdGhEYXRhKHN2Z3BhdGgpO1xuICAgIGNvbnN0IEcgPSBjcmVhdGVqcy5HcmFwaGljcztcblxuICAgIGZvciAobGV0IG4gPSAwOyBuIDwgY2EubGVuZ3RoOyBuKyspIHtcbiAgICAgIGNvbnN0IGMgPSBjYVtuXS5jb21tYW5kO1xuICAgICAgY29uc3QgcCA9IGNhW25dLnBvaW50cztcbiAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICBjYXNlIFwiTFwiOlxuICAgICAgICAgIHRhcmdldC5hcHBlbmQobmV3IEcuTGluZVRvKHBbMF0sIHBbMV0pKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgIHRhcmdldC5hcHBlbmQobmV3IEcuTW92ZVRvKHBbMF0sIHBbMV0pKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiQ1wiOlxuICAgICAgICAgIHRhcmdldC5hcHBlbmQoXG4gICAgICAgICAgICBuZXcgRy5CZXppZXJDdXJ2ZVRvKHBbMF0sIHBbMV0sIHBbMl0sIHBbM10sIHBbNF0sIHBbNV0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiUVwiOlxuICAgICAgICAgIHRhcmdldC5hcHBlbmQobmV3IEcuUXVhZHJhdGljQ3VydmVUbyhwWzBdLCBwWzFdLCBwWzJdLCBwWzNdKSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIkFcIjpcbiAgICAgICAgICB0YXJnZXQuYXBwZW5kKG5ldyBTVkdBcmMocFswXSwgcFsxXSwgcFsyXSwgcFszXSwgcFs0XSwgcFs1XSwgcFs2XSkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJaXCI6XG4gICAgICAgICAgdGFyZ2V0LmFwcGVuZChuZXcgRy5DbG9zZVBhdGgoKSk7XG4gICAgICAgICAgdGFyZ2V0LmFwcGVuZChuZXcgRy5Nb3ZlVG8ocFswXSwgcFsxXSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19