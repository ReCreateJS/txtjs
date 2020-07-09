import * as txt from "txt";
import { removeCanvas } from "./helpers";

describe("Smoke test", function() {
  afterEach(function() {
    removeCanvas();
  });

  it("Loads txt.js library and checks version", function() {
    expect(txt).not.toBeNull();
    expect(txt.Info.VERSION).toEqual("0.10.0"); // remember to update all parts of codebase
  });
});
