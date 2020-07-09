declare global {
    namespace createjs {
        interface Graphics {
            decodeSVGPath(data: string): Graphics;
        }
    }
}
export {};
