import * as txtExamples from "examples";

function buildExampleInit(examplePath) {
  const parts = examplePath.split("/");
  return txtExamples[parts[0]][parts[1]];
}

function buildExampleTitle(examplePath) {
  return (
    "txtjs example: " +
    examplePath
      .split("/")
      .join(" - ")
      .split("_")
      .join(" ")
  );
}

function clearExample() {
  const canvas = document.getElementsByTagName("canvas")[0];
  if (canvas && canvas.parentNode === document.body) {
    document.body.removeChild(canvas);
  }
}

export default function() {
  const example = location.hash.replace("#", "");
  if (example) {
    document.title = buildExampleTitle(example);
    window.onload = function() {
      buildExampleInit(example)();
    };
  }

  window.onhashchange = function() {
    const example = location.hash.replace("#", "");
    clearExample();
    document.title = buildExampleTitle(example);
    buildExampleInit(example)();
  };
}
