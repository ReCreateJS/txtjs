// TODO: move these to the jasmine-pixelmatch project type definitions
declare namespace jasmine {
  interface Matchers<T> {
    toVisuallyEqual(imagedata: ImageData): boolean;
  }
}

declare const jasmineRequire: {
  html: boolean;
};

declare const jasminePixelmatch: {
  imgToImageData(img: HTMLImageElement): ImageData;
  loadImage(url: string): Promise<HTMLImageElement>;
};
