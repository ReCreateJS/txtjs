export default class Accessibility {
  static data: any = [];

  static timeout: any = null;

  static set(element: any) {
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
  }

  static update() {
    Accessibility.timeout = null;
    const data = Accessibility.data.slice(0);
    data.sort(function(a, b) {
      return a.accessibilityPriority - b.accessibilityPriority;
    });
    const len = data.length;
    let out = "";
    let currentCanvas = data[0].stage.canvas;
    for (let i = 0; i < len; i++) {
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
      } else {
        out += data[i].accessibilityText;
      }
    }
    currentCanvas.innerHTML = out;
  }

  static clear() {
    Accessibility.data = [];
  }
}
