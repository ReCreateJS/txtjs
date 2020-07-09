export declare const visualExamples: {
    CharacterText: {
        alignment: typeof import("./CharacterText/alignment").default;
        autosize_expand: typeof import("./CharacterText/autosize_expand").default;
        autosize_reduce: typeof import("./CharacterText/autosize_reduce").default;
        autosize_reduce_expand: typeof import("./CharacterText/autosize_reduce_expand").default;
        autosize_reduce_layout: typeof import("./CharacterText/autosize_reduce_layout").default;
        case: typeof import("./CharacterText/case").default;
        column: typeof import("./CharacterText/column").default;
        ligatures: typeof import("./CharacterText/ligatures").default;
        multiline_align: typeof import("./CharacterText/multiline_align").default;
        multiline_align_breaks: typeof import("./CharacterText/multiline_align_breaks").default;
        multiline_align_smallcaps: typeof import("./CharacterText/multiline_align_smallcaps").default;
        multiline_line_height_larger: typeof import("./CharacterText/multiline_line_height_larger").default;
        multiline_line_height_smaller: typeof import("./CharacterText/multiline_line_height_smaller").default;
        multiline_line_height_smaller_breaks: typeof import("./CharacterText/multiline_line_height_smaller_breaks").default;
        perchar: typeof import("./CharacterText/perchar").default;
        percharfont: typeof import("./CharacterText/percharfont").default;
        single_word_center_align_tracking: typeof import("./CharacterText/single_word_center_align_tracking").default;
        single_word_oneline: typeof import("./CharacterText/single_word_oneline").default;
        stroke: typeof import("./CharacterText/stroke").default;
        text: typeof import("./CharacterText/text").default;
        tracking: typeof import("./CharacterText/tracking").default;
        wordwrap: typeof import("./CharacterText/wordwrap").default;
        wordwrap_calc: typeof import("./CharacterText/wordwrap_calc").default;
        wordwrap_natural_lineheight: typeof import("./CharacterText/wordwrap_natural_lineheight").default;
        wordwrap_natural_newline: typeof import("./CharacterText/wordwrap_natural_newline").default;
        wordwrap_newline_error: typeof import("./CharacterText/wordwrap_newline_error").default;
    };
    Text: {
        alignment: typeof import("./Text/alignment").default;
        card_test: typeof import("./Text/card_test").default;
        case: typeof import("./Text/case").default;
        ligatures: typeof import("./Text/ligatures").default;
        multiline_align: typeof import("./Text/multiline_align").default;
        multiline_align_breaks: typeof import("./Text/multiline_align_breaks").default;
        multiline_align_smallcaps: typeof import("./Text/multiline_align_smallcaps").default;
        multiline_line_height_larger: typeof import("./Text/multiline_line_height_larger").default;
        multiline_line_height_smaller: typeof import("./Text/multiline_line_height_smaller").default;
        multiline_line_height_smaller_breaks: typeof import("./Text/multiline_line_height_smaller_breaks").default;
        perchar: typeof import("./Text/perchar").default;
        percharfont: typeof import("./Text/percharfont").default;
        single_word_center_align_tracking: typeof import("./Text/single_word_center_align_tracking").default;
        single_word_oneline: typeof import("./Text/single_word_oneline").default;
        stroke: typeof import("./Text/stroke").default;
        text: typeof import("./Text/text").default;
        tracking: typeof import("./Text/tracking").default;
        wordwrap: typeof import("./Text/wordwrap").default;
        wordwrap_calc: typeof import("./Text/wordwrap_calc").default;
        wordwrap_natural_lineheight: typeof import("./Text/wordwrap_natural_lineheight").default;
        wordwrap_natural_newline: typeof import("./Text/wordwrap_natural_newline").default;
        wordwrap_newline_error: typeof import("./Text/wordwrap_newline_error").default;
    };
    PathText: {
        alignment: typeof import("./PathText/alignment").default;
        character_limit: typeof import("./PathText/character_limit").default;
        circle_last_char: typeof import("./PathText/circle_last_char").default;
        flipped: typeof import("./PathText/flipped").default;
        initial: typeof import("./PathText/initial").default;
        layout: typeof import("./PathText/layout").default;
        text: typeof import("./PathText/text").default;
        vertical_alignment: typeof import("./PathText/vertical_alignment").default;
        vertical_alignment_layout: typeof import("./PathText/vertical_alignment_layout").default;
    };
    Graphics: {
        pathGraphics: typeof import("./Graphics/pathGraphics").default;
        pathGraphics2: typeof import("./Graphics/pathGraphics2").default;
        pathGraphics3: typeof import("./Graphics/pathGraphics3").default;
    };
};
export declare const nonVisualExamples: {
    CharacterText: {
        accessibility: typeof import("./CharacterText/accessibility").default;
        cache: typeof import("./CharacterText/cache").default;
        complete: typeof import("./CharacterText/complete").default;
        child_events: typeof import("./CharacterText/child_events").default;
        loadtest: typeof import("./CharacterText/loadtest").default;
        moon: typeof import("./CharacterText/moon").default;
        text_change_font: typeof import("./CharacterText/text_change_font").default;
        tracking_layout_test: typeof import("./CharacterText/tracking_layout_test").default;
    };
    Text: {
        accessibility: typeof import("./Text/accessibility").default;
        cache: typeof import("./Text/cache").default;
        child_events: typeof import("./Text/child_events").default;
        complete: typeof import("./Text/complete").default;
        loadtest: typeof import("./Text/loadtest").default;
        moon: typeof import("./Text/moon").default;
        text_change_font: typeof import("./Text/text_change_font").default;
        tracking_layout_test: typeof import("./Text/tracking_layout_test").default;
    };
    PathText: {
        accessibility: typeof import("./PathText/accessibility").default;
        cache: typeof import("./PathText/cache").default;
        child_events: typeof import("./PathText/child_events").default;
    };
    Graphics: {
        pathGraphics: typeof import("./Graphics/pathGraphics").default;
        pathGraphics2: typeof import("./Graphics/pathGraphics2").default;
        pathGraphics3: typeof import("./Graphics/pathGraphics3").default;
    };
};
export { default as CharacterText } from "./character-text";
export { default as Graphics } from "./graphics";
export { default as PathText } from "./path-text";
export { default as Text } from "./text";
export { default as createHiDPICanvas } from "../lib/hidpi-canvas";
