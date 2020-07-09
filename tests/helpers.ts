export const { imgToImageData, loadImage } = jasminePixelmatch;

export function removeCanvas() {
  const canvas = document.getElementsByTagName("canvas")[0];
  if (canvas) {
    document.body.removeChild(canvas);
  }
}
