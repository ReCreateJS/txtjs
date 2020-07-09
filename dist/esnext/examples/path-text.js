var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import accessibility from "./PathText/accessibility";
import alignment from "./PathText/alignment";
import cache from "./PathText/cache";
import character_limit from "./PathText/character_limit";
import child_events from "./PathText/child_events";
import circle_last_char from "./PathText/circle_last_char";
import flipped from "./PathText/flipped";
import initial from "./PathText/initial";
import layout from "./PathText/layout";
import text from "./PathText/text";
import vertical_alignment from "./PathText/vertical_alignment";
import vertical_alignment_layout from "./PathText/vertical_alignment_layout";
export var visual = {
    alignment: alignment,
    character_limit: character_limit,
    circle_last_char: circle_last_char,
    flipped: flipped,
    initial: initial,
    layout: layout,
    text: text,
    vertical_alignment: vertical_alignment,
    vertical_alignment_layout: vertical_alignment_layout
};
export var nonVisual = {
    accessibility: accessibility,
    cache: cache,
    child_events: child_events
};
export default __assign(__assign({}, visual), nonVisual);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC10ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZXMvcGF0aC10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxLQUFLLE1BQU0sa0JBQWtCLENBQUM7QUFDckMsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxnQkFBZ0IsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLE9BQU8sTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQztBQUNuQyxPQUFPLGtCQUFrQixNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8seUJBQXlCLE1BQU0sc0NBQXNDLENBQUM7QUFFN0UsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHO0lBQ3BCLFNBQVMsV0FBQTtJQUNULGVBQWUsaUJBQUE7SUFDZixnQkFBZ0Isa0JBQUE7SUFDaEIsT0FBTyxTQUFBO0lBQ1AsT0FBTyxTQUFBO0lBQ1AsTUFBTSxRQUFBO0lBQ04sSUFBSSxNQUFBO0lBQ0osa0JBQWtCLG9CQUFBO0lBQ2xCLHlCQUF5QiwyQkFBQTtDQUMxQixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHO0lBQ3ZCLGFBQWEsZUFBQTtJQUNiLEtBQUssT0FBQTtJQUNMLFlBQVksY0FBQTtDQUNiLENBQUM7QUFFRixxQ0FBb0IsTUFBTSxHQUFLLFNBQVMsRUFBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhY2Nlc3NpYmlsaXR5IGZyb20gXCIuL1BhdGhUZXh0L2FjY2Vzc2liaWxpdHlcIjtcbmltcG9ydCBhbGlnbm1lbnQgZnJvbSBcIi4vUGF0aFRleHQvYWxpZ25tZW50XCI7XG5pbXBvcnQgY2FjaGUgZnJvbSBcIi4vUGF0aFRleHQvY2FjaGVcIjtcbmltcG9ydCBjaGFyYWN0ZXJfbGltaXQgZnJvbSBcIi4vUGF0aFRleHQvY2hhcmFjdGVyX2xpbWl0XCI7XG5pbXBvcnQgY2hpbGRfZXZlbnRzIGZyb20gXCIuL1BhdGhUZXh0L2NoaWxkX2V2ZW50c1wiO1xuaW1wb3J0IGNpcmNsZV9sYXN0X2NoYXIgZnJvbSBcIi4vUGF0aFRleHQvY2lyY2xlX2xhc3RfY2hhclwiO1xuaW1wb3J0IGZsaXBwZWQgZnJvbSBcIi4vUGF0aFRleHQvZmxpcHBlZFwiO1xuaW1wb3J0IGluaXRpYWwgZnJvbSBcIi4vUGF0aFRleHQvaW5pdGlhbFwiO1xuaW1wb3J0IGxheW91dCBmcm9tIFwiLi9QYXRoVGV4dC9sYXlvdXRcIjtcbmltcG9ydCB0ZXh0IGZyb20gXCIuL1BhdGhUZXh0L3RleHRcIjtcbmltcG9ydCB2ZXJ0aWNhbF9hbGlnbm1lbnQgZnJvbSBcIi4vUGF0aFRleHQvdmVydGljYWxfYWxpZ25tZW50XCI7XG5pbXBvcnQgdmVydGljYWxfYWxpZ25tZW50X2xheW91dCBmcm9tIFwiLi9QYXRoVGV4dC92ZXJ0aWNhbF9hbGlnbm1lbnRfbGF5b3V0XCI7XG5cbmV4cG9ydCBjb25zdCB2aXN1YWwgPSB7XG4gIGFsaWdubWVudCxcbiAgY2hhcmFjdGVyX2xpbWl0LFxuICBjaXJjbGVfbGFzdF9jaGFyLFxuICBmbGlwcGVkLFxuICBpbml0aWFsLFxuICBsYXlvdXQsXG4gIHRleHQsXG4gIHZlcnRpY2FsX2FsaWdubWVudCxcbiAgdmVydGljYWxfYWxpZ25tZW50X2xheW91dFxufTtcblxuZXhwb3J0IGNvbnN0IG5vblZpc3VhbCA9IHtcbiAgYWNjZXNzaWJpbGl0eSxcbiAgY2FjaGUsXG4gIGNoaWxkX2V2ZW50c1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyAuLi52aXN1YWwsIC4uLm5vblZpc3VhbCB9O1xuIl19