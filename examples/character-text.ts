import accessibility from "./CharacterText/accessibility";
import alignment from "./CharacterText/alignment";
import autosize_expand from "./CharacterText/autosize_expand";
import autosize_reduce from "./CharacterText/autosize_reduce";
import autosize_reduce_expand from "./CharacterText/autosize_reduce_expand";
import autosize_reduce_layout from "./CharacterText/autosize_reduce_layout";
import bounding_box from "./CharacterText/bounding_box";
import cache from "./CharacterText/cache";
import character_case from "./CharacterText/case";
import child_events from "./CharacterText/child_events";
import column from "./CharacterText/column";
import complete from "./CharacterText/complete";
import ligatures from "./CharacterText/ligatures";
import loadtest from "./CharacterText/loadtest";
import moon from "./CharacterText/moon";
import multiline_align from "./CharacterText/multiline_align";
import multiline_align_breaks from "./CharacterText/multiline_align_breaks";
import multiline_align_smallcaps from "./CharacterText/multiline_align_smallcaps";
import multiline_line_height_larger from "./CharacterText/multiline_line_height_larger";
import multiline_line_height_smaller from "./CharacterText/multiline_line_height_smaller";
import multiline_line_height_smaller_breaks from "./CharacterText/multiline_line_height_smaller_breaks";
import perchar from "./CharacterText/perchar";
import percharfont from "./CharacterText/percharfont";
import single_word_center_align_tracking from "./CharacterText/single_word_center_align_tracking";
import single_word_oneline from "./CharacterText/single_word_oneline";
import stroke from "./CharacterText/stroke";
import text from "./CharacterText/text";
import text_change_font from "./CharacterText/text_change_font";
import tracking from "./CharacterText/tracking";
import tracking_layout_test from "./CharacterText/tracking_layout_test";
import wordwrap from "./CharacterText/wordwrap";
import wordwrap_calc from "./CharacterText/wordwrap_calc";
import wordwrap_natural_lineheight from "./CharacterText/wordwrap_natural_lineheight";
import wordwrap_natural_newline from "./CharacterText/wordwrap_natural_newline";
import wordwrap_newline_error from "./CharacterText/wordwrap_newline_error";

export const visual = {
  alignment,
  autosize_expand,
  autosize_reduce,
  autosize_reduce_expand,
  autosize_reduce_layout,
  bounding_box,
  case: character_case,
  column,
  ligatures,
  multiline_align,
  multiline_align_breaks,
  multiline_align_smallcaps,
  multiline_line_height_larger,
  multiline_line_height_smaller,
  multiline_line_height_smaller_breaks,
  perchar,
  percharfont,
  single_word_center_align_tracking,
  single_word_oneline,
  stroke,
  text,
  tracking,
  wordwrap,
  wordwrap_calc,
  wordwrap_natural_lineheight,
  wordwrap_natural_newline,
  wordwrap_newline_error
};

export const nonVisual = {
  accessibility,
  cache,
  complete,
  child_events,
  loadtest,
  moon,
  text_change_font,
  tracking_layout_test
};

export default { ...visual, ...nonVisual };
