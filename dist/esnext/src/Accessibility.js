var Accessibility = /** @class */ (function () {
    function Accessibility() {
    }
    Accessibility.set = function (element) {
        //if an element is not on canvas, do not place into accessibility api
        if (element.stage == null) {
            return;
        }
        //clear timeout if exists
        if (Accessibility.timeout != null) {
            clearTimeout(Accessibility.timeout);
        }
        // add to accessibility elements
        if (element.accessibilityId == null) {
            Accessibility.data.push(element);
            element.accessibilityId = Accessibility.data.length - 1;
        }
        Accessibility.timeout = setTimeout(Accessibility.update, 300);
    };
    Accessibility.update = function () {
        Accessibility.timeout = null;
        var data = Accessibility.data.slice(0);
        data.sort(function (a, b) {
            return a.accessibilityPriority - b.accessibilityPriority;
        });
        var len = data.length;
        var out = "";
        var currentCanvas = data[0].stage.canvas;
        for (var i = 0; i < len; i++) {
            if (data[i].stage == null) {
                continue;
            }
            if (currentCanvas != data[i].stage.canvas) {
                currentCanvas.innerHTML = out;
                out = "";
                currentCanvas = data[i].stage.canvas;
            }
            if (data[i].accessibilityText == null) {
                out += "<p>" + data[i].text + "</p>";
            }
            else {
                out += data[i].accessibilityText;
            }
        }
        currentCanvas.innerHTML = out;
    };
    Accessibility.clear = function () {
        Accessibility.data = [];
    };
    Accessibility.data = [];
    Accessibility.timeout = null;
    return Accessibility;
}());
export default Accessibility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjZXNzaWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BY2Nlc3NpYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQUE7SUFvREEsQ0FBQztJQS9DUSxpQkFBRyxHQUFWLFVBQVcsT0FBWTtRQUNyQixxRUFBcUU7UUFDckUsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCx5QkFBeUI7UUFDekIsSUFBSSxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUNqQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsZ0NBQWdDO1FBQ2hDLElBQUksT0FBTyxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDekQ7UUFDRCxhQUFhLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxvQkFBTSxHQUFiO1FBQ0UsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUN6QixTQUFTO2FBQ1Y7WUFDRCxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDekMsYUFBYSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQzlCLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksSUFBSSxFQUFFO2dCQUNyQyxHQUFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7YUFDbEM7U0FDRjtRQUNELGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxtQkFBSyxHQUFaO1FBQ0UsYUFBYSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWxETSxrQkFBSSxHQUFRLEVBQUUsQ0FBQztJQUVmLHFCQUFPLEdBQVEsSUFBSSxDQUFDO0lBaUQ3QixvQkFBQztDQUFBLEFBcERELElBb0RDO2VBcERvQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjZXNzaWJpbGl0eSB7XG4gIHN0YXRpYyBkYXRhOiBhbnkgPSBbXTtcblxuICBzdGF0aWMgdGltZW91dDogYW55ID0gbnVsbDtcblxuICBzdGF0aWMgc2V0KGVsZW1lbnQ6IGFueSkge1xuICAgIC8vaWYgYW4gZWxlbWVudCBpcyBub3Qgb24gY2FudmFzLCBkbyBub3QgcGxhY2UgaW50byBhY2Nlc3NpYmlsaXR5IGFwaVxuICAgIGlmIChlbGVtZW50LnN0YWdlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9jbGVhciB0aW1lb3V0IGlmIGV4aXN0c1xuICAgIGlmIChBY2Nlc3NpYmlsaXR5LnRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KEFjY2Vzc2liaWxpdHkudGltZW91dCk7XG4gICAgfVxuICAgIC8vIGFkZCB0byBhY2Nlc3NpYmlsaXR5IGVsZW1lbnRzXG4gICAgaWYgKGVsZW1lbnQuYWNjZXNzaWJpbGl0eUlkID09IG51bGwpIHtcbiAgICAgIEFjY2Vzc2liaWxpdHkuZGF0YS5wdXNoKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5hY2Nlc3NpYmlsaXR5SWQgPSBBY2Nlc3NpYmlsaXR5LmRhdGEubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgQWNjZXNzaWJpbGl0eS50aW1lb3V0ID0gc2V0VGltZW91dChBY2Nlc3NpYmlsaXR5LnVwZGF0ZSwgMzAwKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGUoKSB7XG4gICAgQWNjZXNzaWJpbGl0eS50aW1lb3V0ID0gbnVsbDtcbiAgICBjb25zdCBkYXRhID0gQWNjZXNzaWJpbGl0eS5kYXRhLnNsaWNlKDApO1xuICAgIGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYS5hY2Nlc3NpYmlsaXR5UHJpb3JpdHkgLSBiLmFjY2Vzc2liaWxpdHlQcmlvcml0eTtcbiAgICB9KTtcbiAgICBjb25zdCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICBsZXQgb3V0ID0gXCJcIjtcbiAgICBsZXQgY3VycmVudENhbnZhcyA9IGRhdGFbMF0uc3RhZ2UuY2FudmFzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChkYXRhW2ldLnN0YWdlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENhbnZhcyAhPSBkYXRhW2ldLnN0YWdlLmNhbnZhcykge1xuICAgICAgICBjdXJyZW50Q2FudmFzLmlubmVySFRNTCA9IG91dDtcbiAgICAgICAgb3V0ID0gXCJcIjtcbiAgICAgICAgY3VycmVudENhbnZhcyA9IGRhdGFbaV0uc3RhZ2UuY2FudmFzO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFbaV0uYWNjZXNzaWJpbGl0eVRleHQgPT0gbnVsbCkge1xuICAgICAgICBvdXQgKz0gXCI8cD5cIiArIGRhdGFbaV0udGV4dCArIFwiPC9wPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0ICs9IGRhdGFbaV0uYWNjZXNzaWJpbGl0eVRleHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGN1cnJlbnRDYW52YXMuaW5uZXJIVE1MID0gb3V0O1xuICB9XG5cbiAgc3RhdGljIGNsZWFyKCkge1xuICAgIEFjY2Vzc2liaWxpdHkuZGF0YSA9IFtdO1xuICB9XG59XG4iXX0=