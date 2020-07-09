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
import { default as accessibility } from "./Text/accessibility";
import { default as alignment } from "./Text/alignment";
import { default as cache } from "./Text/cache";
import { default as card_test } from "./Text/card_test";
import { default as text_case } from "./Text/case";
import { default as child_events } from "./Text/child_events";
import { default as complete } from "./Text/complete";
import { default as ligatures } from "./Text/ligatures";
import { default as loadtest } from "./Text/loadtest";
import { default as moon } from "./Text/moon";
import { default as multiline_align } from "./Text/multiline_align";
import { default as multiline_align_breaks } from "./Text/multiline_align_breaks";
import { default as multiline_align_smallcaps } from "./Text/multiline_align_smallcaps";
import { default as multiline_line_height_larger } from "./Text/multiline_line_height_larger";
import { default as multiline_line_height_smaller } from "./Text/multiline_line_height_smaller";
import { default as multiline_line_height_smaller_breaks } from "./Text/multiline_line_height_smaller_breaks";
import { default as perchar } from "./Text/perchar";
import { default as percharfont } from "./Text/percharfont";
import { default as single_word_center_align_tracking } from "./Text/single_word_center_align_tracking";
import { default as single_word_oneline } from "./Text/single_word_oneline";
import { default as stroke } from "./Text/stroke";
import { default as text } from "./Text/text";
import { default as text_change_font } from "./Text/text_change_font";
import { default as tracking } from "./Text/tracking";
import { default as tracking_layout_test } from "./Text/tracking_layout_test";
import { default as wordwrap } from "./Text/wordwrap";
import { default as wordwrap_calc } from "./Text/wordwrap_calc";
import { default as wordwrap_natural_lineheight } from "./Text/wordwrap_natural_lineheight";
import { default as wordwrap_natural_newline } from "./Text/wordwrap_natural_newline";
import { default as wordwrap_newline_error } from "./Text/wordwrap_newline_error";
export var visual = {
    alignment: alignment,
    card_test: card_test,
    case: text_case,
    ligatures: ligatures,
    multiline_align: multiline_align,
    multiline_align_breaks: multiline_align_breaks,
    multiline_align_smallcaps: multiline_align_smallcaps,
    multiline_line_height_larger: multiline_line_height_larger,
    multiline_line_height_smaller: multiline_line_height_smaller,
    multiline_line_height_smaller_breaks: multiline_line_height_smaller_breaks,
    perchar: perchar,
    percharfont: percharfont,
    single_word_center_align_tracking: single_word_center_align_tracking,
    single_word_oneline: single_word_oneline,
    stroke: stroke,
    text: text,
    tracking: tracking,
    wordwrap: wordwrap,
    wordwrap_calc: wordwrap_calc,
    wordwrap_natural_lineheight: wordwrap_natural_lineheight,
    wordwrap_natural_newline: wordwrap_natural_newline,
    wordwrap_newline_error: wordwrap_newline_error
};
export var nonVisual = {
    accessibility: accessibility,
    cache: cache,
    child_events: child_events,
    complete: complete,
    loadtest: loadtest,
    moon: moon,
    text_change_font: text_change_font,
    tracking_layout_test: tracking_layout_test
};
export default __assign(__assign({}, visual), nonVisual);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2V4YW1wbGVzL3RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLElBQUksU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxLQUFLLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxJQUFJLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxJQUFJLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLElBQUksUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxJQUFJLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxPQUFPLElBQUksZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLE9BQU8sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxPQUFPLElBQUkseUJBQXlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsT0FBTyxJQUFJLDRCQUE0QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxPQUFPLElBQUksb0NBQW9DLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RyxPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLElBQUksV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sSUFBSSxpQ0FBaUMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxPQUFPLElBQUksbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM5QyxPQUFPLEVBQUUsT0FBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE9BQU8sSUFBSSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxJQUFJLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLElBQUksMkJBQTJCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RixPQUFPLEVBQUUsT0FBTyxJQUFJLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLE9BQU8sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxGLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRztJQUNwQixTQUFTLFdBQUE7SUFDVCxTQUFTLFdBQUE7SUFDVCxJQUFJLEVBQUUsU0FBUztJQUNmLFNBQVMsV0FBQTtJQUNULGVBQWUsaUJBQUE7SUFDZixzQkFBc0Isd0JBQUE7SUFDdEIseUJBQXlCLDJCQUFBO0lBQ3pCLDRCQUE0Qiw4QkFBQTtJQUM1Qiw2QkFBNkIsK0JBQUE7SUFDN0Isb0NBQW9DLHNDQUFBO0lBQ3BDLE9BQU8sU0FBQTtJQUNQLFdBQVcsYUFBQTtJQUNYLGlDQUFpQyxtQ0FBQTtJQUNqQyxtQkFBbUIscUJBQUE7SUFDbkIsTUFBTSxRQUFBO0lBQ04sSUFBSSxNQUFBO0lBQ0osUUFBUSxVQUFBO0lBQ1IsUUFBUSxVQUFBO0lBQ1IsYUFBYSxlQUFBO0lBQ2IsMkJBQTJCLDZCQUFBO0lBQzNCLHdCQUF3QiwwQkFBQTtJQUN4QixzQkFBc0Isd0JBQUE7Q0FDdkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRztJQUN2QixhQUFhLGVBQUE7SUFDYixLQUFLLE9BQUE7SUFDTCxZQUFZLGNBQUE7SUFDWixRQUFRLFVBQUE7SUFDUixRQUFRLFVBQUE7SUFDUixJQUFJLE1BQUE7SUFDSixnQkFBZ0Isa0JBQUE7SUFDaEIsb0JBQW9CLHNCQUFBO0NBQ3JCLENBQUM7QUFFRixxQ0FBb0IsTUFBTSxHQUFLLFNBQVMsRUFBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmF1bHQgYXMgYWNjZXNzaWJpbGl0eSB9IGZyb20gXCIuL1RleHQvYWNjZXNzaWJpbGl0eVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBhbGlnbm1lbnQgfSBmcm9tIFwiLi9UZXh0L2FsaWdubWVudFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBjYWNoZSB9IGZyb20gXCIuL1RleHQvY2FjaGVcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgY2FyZF90ZXN0IH0gZnJvbSBcIi4vVGV4dC9jYXJkX3Rlc3RcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgdGV4dF9jYXNlIH0gZnJvbSBcIi4vVGV4dC9jYXNlXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGNoaWxkX2V2ZW50cyB9IGZyb20gXCIuL1RleHQvY2hpbGRfZXZlbnRzXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGNvbXBsZXRlIH0gZnJvbSBcIi4vVGV4dC9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBsaWdhdHVyZXMgfSBmcm9tIFwiLi9UZXh0L2xpZ2F0dXJlc1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBsb2FkdGVzdCB9IGZyb20gXCIuL1RleHQvbG9hZHRlc3RcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgbW9vbiB9IGZyb20gXCIuL1RleHQvbW9vblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBtdWx0aWxpbmVfYWxpZ24gfSBmcm9tIFwiLi9UZXh0L211bHRpbGluZV9hbGlnblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBtdWx0aWxpbmVfYWxpZ25fYnJlYWtzIH0gZnJvbSBcIi4vVGV4dC9tdWx0aWxpbmVfYWxpZ25fYnJlYWtzXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIG11bHRpbGluZV9hbGlnbl9zbWFsbGNhcHMgfSBmcm9tIFwiLi9UZXh0L211bHRpbGluZV9hbGlnbl9zbWFsbGNhcHNcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgbXVsdGlsaW5lX2xpbmVfaGVpZ2h0X2xhcmdlciB9IGZyb20gXCIuL1RleHQvbXVsdGlsaW5lX2xpbmVfaGVpZ2h0X2xhcmdlclwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBtdWx0aWxpbmVfbGluZV9oZWlnaHRfc21hbGxlciB9IGZyb20gXCIuL1RleHQvbXVsdGlsaW5lX2xpbmVfaGVpZ2h0X3NtYWxsZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgbXVsdGlsaW5lX2xpbmVfaGVpZ2h0X3NtYWxsZXJfYnJlYWtzIH0gZnJvbSBcIi4vVGV4dC9tdWx0aWxpbmVfbGluZV9oZWlnaHRfc21hbGxlcl9icmVha3NcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgcGVyY2hhciB9IGZyb20gXCIuL1RleHQvcGVyY2hhclwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBwZXJjaGFyZm9udCB9IGZyb20gXCIuL1RleHQvcGVyY2hhcmZvbnRcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2luZ2xlX3dvcmRfY2VudGVyX2FsaWduX3RyYWNraW5nIH0gZnJvbSBcIi4vVGV4dC9zaW5nbGVfd29yZF9jZW50ZXJfYWxpZ25fdHJhY2tpbmdcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2luZ2xlX3dvcmRfb25lbGluZSB9IGZyb20gXCIuL1RleHQvc2luZ2xlX3dvcmRfb25lbGluZVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzdHJva2UgfSBmcm9tIFwiLi9UZXh0L3N0cm9rZVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB0ZXh0IH0gZnJvbSBcIi4vVGV4dC90ZXh0XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHRleHRfY2hhbmdlX2ZvbnQgfSBmcm9tIFwiLi9UZXh0L3RleHRfY2hhbmdlX2ZvbnRcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgdHJhY2tpbmcgfSBmcm9tIFwiLi9UZXh0L3RyYWNraW5nXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHRyYWNraW5nX2xheW91dF90ZXN0IH0gZnJvbSBcIi4vVGV4dC90cmFja2luZ19sYXlvdXRfdGVzdFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3b3Jkd3JhcCB9IGZyb20gXCIuL1RleHQvd29yZHdyYXBcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgd29yZHdyYXBfY2FsYyB9IGZyb20gXCIuL1RleHQvd29yZHdyYXBfY2FsY1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3b3Jkd3JhcF9uYXR1cmFsX2xpbmVoZWlnaHQgfSBmcm9tIFwiLi9UZXh0L3dvcmR3cmFwX25hdHVyYWxfbGluZWhlaWdodFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3b3Jkd3JhcF9uYXR1cmFsX25ld2xpbmUgfSBmcm9tIFwiLi9UZXh0L3dvcmR3cmFwX25hdHVyYWxfbmV3bGluZVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3b3Jkd3JhcF9uZXdsaW5lX2Vycm9yIH0gZnJvbSBcIi4vVGV4dC93b3Jkd3JhcF9uZXdsaW5lX2Vycm9yXCI7XG5cbmV4cG9ydCBjb25zdCB2aXN1YWwgPSB7XG4gIGFsaWdubWVudCxcbiAgY2FyZF90ZXN0LFxuICBjYXNlOiB0ZXh0X2Nhc2UsXG4gIGxpZ2F0dXJlcyxcbiAgbXVsdGlsaW5lX2FsaWduLFxuICBtdWx0aWxpbmVfYWxpZ25fYnJlYWtzLFxuICBtdWx0aWxpbmVfYWxpZ25fc21hbGxjYXBzLFxuICBtdWx0aWxpbmVfbGluZV9oZWlnaHRfbGFyZ2VyLFxuICBtdWx0aWxpbmVfbGluZV9oZWlnaHRfc21hbGxlcixcbiAgbXVsdGlsaW5lX2xpbmVfaGVpZ2h0X3NtYWxsZXJfYnJlYWtzLFxuICBwZXJjaGFyLFxuICBwZXJjaGFyZm9udCxcbiAgc2luZ2xlX3dvcmRfY2VudGVyX2FsaWduX3RyYWNraW5nLFxuICBzaW5nbGVfd29yZF9vbmVsaW5lLFxuICBzdHJva2UsXG4gIHRleHQsXG4gIHRyYWNraW5nLFxuICB3b3Jkd3JhcCxcbiAgd29yZHdyYXBfY2FsYyxcbiAgd29yZHdyYXBfbmF0dXJhbF9saW5laGVpZ2h0LFxuICB3b3Jkd3JhcF9uYXR1cmFsX25ld2xpbmUsXG4gIHdvcmR3cmFwX25ld2xpbmVfZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBub25WaXN1YWwgPSB7XG4gIGFjY2Vzc2liaWxpdHksXG4gIGNhY2hlLFxuICBjaGlsZF9ldmVudHMsXG4gIGNvbXBsZXRlLFxuICBsb2FkdGVzdCxcbiAgbW9vbixcbiAgdGV4dF9jaGFuZ2VfZm9udCxcbiAgdHJhY2tpbmdfbGF5b3V0X3Rlc3Rcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgLi4udmlzdWFsLCAuLi5ub25WaXN1YWwgfTtcbiJdfQ==