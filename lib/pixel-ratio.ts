const context = document.createElement("canvas").getContext("2d");
const devicePixelRatio = window.devicePixelRatio || 1;
const backingStorePixelRatio =
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio ||
  1;

export default devicePixelRatio / backingStorePixelRatio;
