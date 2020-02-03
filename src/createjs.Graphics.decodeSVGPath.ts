import Graphics from "./Graphics";
import applyMixins from "./applyMixins";

/**
 * decodeSVGPath intended for createjs.Graphics class
 *
 * @todo make tyepscript aware of this mixin being applied to createjs.Graphics class,
 * and remove the corresponding // @ts-ignore comments where `decodeSVGPath` is used.
 */
class DecodeSVGPathMixin {
  decodeSVGPath(data: string) {
    Graphics.init(this, data);
    return this;
  }
}

applyMixins(createjs.Graphics, [DecodeSVGPathMixin]);


declare global {
    namespace createjs {
        interface Graphics {
            decodeSVGPath(data: string): Graphics;
        }
    }
}
