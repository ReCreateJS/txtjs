import TextContainer from "./TextContainer";
import { ConstructObj, Style } from "./Interfaces";
import Path, { PathFit, PathAlign } from "./Path";
import VerticalAlign from "./VerticalAlign";
import FontLoader from "./FontLoader";
import Character from "./Character";
import Font from "./Font";
import applyShapeEventListeners from "./utils/apply-shape-event-listeners";

export default class PathText extends TextContainer {
  size = 12;
  tracking = 0;
  ligatures = false;
  minSize: number = null;
  maxTracking: number = null;
  fillColor = "#000";
  strokeColor: string = null;
  strokeWidth: number = null;
  debug = false;
  characters: Character[];
  block: createjs.Container;
  original: ConstructObj = null;
  autoExpand = false;
  autoReduce = false;
  overset = false;
  oversetIndex: number = null;
  pathPoints: Path = null;
  path = "";
  start = 0;
  end: number = null;
  flipped = false;
  fit: PathFit = PathFit.Rainbow;
  align: PathAlign = PathAlign.Center;
  valign: VerticalAlign = VerticalAlign.BaseLine;
  missingGlyphs: any[] = null;
  renderCycle = true;
  valignPercent = 1;
  initialTracking = 0;
  initialOffset = 0;
  measured = false;
  oversetPotential = false;

  constructor(props: ConstructObj = null) {
    super();

    if (props) {
      this.original = props;
      this.set(props);
      this.original.tracking = this.tracking;
    }
    this.loadFonts();
    this.pathPoints = new Path(
      this.path,
      this.start,
      this.end,
      this.flipped,
      this.fit,
      this.align
    );
  }

  setPath(path: string) {
    this.path = path;
    this.pathPoints.path = this.path;
    this.pathPoints.update();
  }

  setStart(start: number) {
    this.start = start;
    this.pathPoints.start = this.start;
    this.pathPoints.update();
  }

  setEnd(end: number) {
    this.end = end;
    this.pathPoints.end = this.end;
    this.pathPoints.update();
  }

  setFlipped(flipped: boolean) {
    this.flipped = flipped;
    this.pathPoints.flipped = this.flipped;
    this.pathPoints.update();
  }

  setFit(fit: PathFit = PathFit.Rainbow) {
    this.fit = fit;
    this.pathPoints.fit = this.fit;
    this.pathPoints.update();
  }

  setAlign(align: PathAlign = PathAlign.Center) {
    this.align = align;
    this.pathPoints.align = this.align;
    this.pathPoints.update();
  }

  getWidth(): number {
    return this.pathPoints.realLength;
  }

  layout() {
    this.addAccessibility();
    this.overset = false;
    this.oversetIndex = null;
    this.removeAllChildren();
    this.characters = [];
    this.missingGlyphs = null;
    this.measured = false;
    this.oversetPotential = false;
    if (this.debug == true) {
      this.addDebugLayout();
    }

    if (this.text === "" || this.text === undefined) {
      this.render();
      return;
    }

    this.block = new createjs.Container();
    this.addChild(this.block);

    if (this.autoExpand === true || this.autoReduce === true) {
      if (this.measure() === false) {
        this.removeAllChildren();
        return;
      }
    }

    if (this.renderCycle === false) {
      this.removeAllChildren();
      this.complete();
      return;
    }

    if (this.characterLayout() === false) {
      this.removeAllChildren();
      return;
    }
    this.render();
    this.complete();
  }

  private addDebugLayout() {
    let s = new createjs.Shape();
    s.graphics.beginStroke("#FF0000");
    s.graphics.setStrokeStyle(0.1);
    s.graphics.decodeSVGPath(this.path);
    s.graphics.endFill();
    s.graphics.endStroke();
    this.addChild(s);
    s = new createjs.Shape();
    let pp = this.pathPoints.getRealPathPoint(0);
    s.x = pp.x;
    s.y = pp.y;
    s.graphics.beginFill("black");
    s.graphics.drawCircle(0, 0, 2);
    this.addChild(s);
    s = new createjs.Shape();
    pp = this.pathPoints.getRealPathPoint(this.pathPoints.start);
    s.x = pp.x;
    s.y = pp.y;
    s.graphics.beginFill("green");
    s.graphics.drawCircle(0, 0, 2);
    this.addChild(s);
    s = new createjs.Shape();
    pp = this.pathPoints.getRealPathPoint(this.pathPoints.end);
    s.x = pp.x;
    s.y = pp.y;
    s.graphics.beginFill("red");
    s.graphics.drawCircle(0, 0, 2);
    this.addChild(s);
    s = new createjs.Shape();
    pp = this.pathPoints.getRealPathPoint(this.pathPoints.center);
    s.x = pp.x;
    s.y = pp.y;
    s.graphics.beginFill("blue");
    s.graphics.drawCircle(0, 0, 2);
    this.addChild(s);
  }

  measure(): boolean {
    this.measured = true;
    //Extract orgin sizing from this.original to preserve
    //metrics. autoMeasure will change style properties
    //directly. Change this.original to rerender.

    let len = this.text.length;
    const width = this.getWidth();
    const defaultStyle = {
      size: this.original.size,
      font: this.original.font,
      tracking: this.original.tracking,
      characterCase: this.original.characterCase
    };
    let currentStyle: any;
    let charCode: number = null;
    let font: Font;
    const charMetrics = [];
    let largestFontSize = defaultStyle.size;
    for (let i = 0; i < len; i++) {
      charCode = this.text.charCodeAt(i);

      currentStyle = defaultStyle;
      if (
        this.original.style !== undefined &&
        this.original.style[i] !== undefined
      ) {
        currentStyle = this.original.style[i];
        // make sure style contains properties needed.
        if (currentStyle.size === undefined)
          currentStyle.size = defaultStyle.size;
        if (currentStyle.font === undefined)
          currentStyle.font = defaultStyle.font;
        if (currentStyle.tracking === undefined)
          currentStyle.tracking = defaultStyle.tracking;
      }
      if (currentStyle.size > largestFontSize) {
        largestFontSize = currentStyle.size;
      }
      font = FontLoader.fonts[currentStyle.font];
      charMetrics.push({
        char: this.text[i],
        size: currentStyle.size,
        charCode: charCode,
        font: currentStyle.font,
        offset: font.glyphs[charCode].offset,
        units: font.units,
        tracking: this.trackingOffset(
          currentStyle.tracking,
          currentStyle.size,
          font.units
        ),
        kerning: font.glyphs[charCode].getKerning(this.getCharCodeAt(i + 1), 1)
      });
    }

    //save space char using last known width/height
    const space: any = {
      char: " ",
      size: currentStyle.size,
      charCode: 32,
      font: currentStyle.font,
      offset: font.glyphs[32].offset,
      units: font.units,
      tracking: 0,
      kerning: 0
    };

    charMetrics[charMetrics.length - 1].tracking = 0;
    //charMetrics[ charMetrics.length-1 ].kerning=0;

    len = charMetrics.length;

    //measured without size
    let metricBaseWidth = 0;
    //measured at size
    let metricRealWidth = 0;
    //measured at size with tracking
    let metricRealWidthTracking = 0;

    let current = null;
    for (let i = 0; i < len; i++) {
      current = charMetrics[i];
      metricBaseWidth = metricBaseWidth + current.offset + current.kerning;
      metricRealWidth =
        metricRealWidth + (current.offset + current.kerning) * current.size;
      metricRealWidthTracking =
        metricRealWidthTracking +
        (current.offset + current.kerning + current.tracking) * current.size;
    }

    //size cases
    if (metricRealWidth > width) {
      if (this.autoReduce === true) {
        this.tracking = 0;
        this.size =
          (this.original.size * width) /
          (metricRealWidth + space.offset * space.size);
        if (this.minSize != null && this.size < this.minSize) {
          this.size = this.minSize;
          if (this.renderCycle === false) {
            this.overset = true;
          } else {
            this.oversetPotential = true;
          }
        }
        return true;
      }
      //tracking cases
    } else {
      let trackMetric = this.offsetTracking(
        (width - metricRealWidth) / len,
        current.size,
        current.units
      );
      if (trackMetric < 0) {
        trackMetric = 0;
      }
      //autoexpand case
      if (trackMetric > this.original.tracking && this.autoExpand) {
        if (this.maxTracking != null && trackMetric > this.maxTracking) {
          this.tracking = this.maxTracking;
        } else {
          this.tracking = trackMetric;
        }
        this.size = this.original.size;
        return true;
      }
      //autoreduce tracking case
      if (trackMetric < this.original.tracking && this.autoReduce) {
        if (this.maxTracking != null && trackMetric > this.maxTracking) {
          this.tracking = this.maxTracking;
        } else {
          this.tracking = trackMetric;
        }
        this.size = this.original.size;
        return true;
      }
    }
    return true;
  }

  //place characters in words
  characterLayout(): boolean {
    //char layout
    let len = this.text.length;
    let char: Character;
    const defaultStyle: Style = {
      size: this.size,
      font: this.font,
      tracking: this.tracking,
      characterCase: this.characterCase,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth
    };
    let currentStyle = defaultStyle;
    let hPosition = 0;

    // loop over characters
    // place into lines
    for (let i = 0; i < len; i++) {
      if (this.style !== null && this.style[i] !== undefined) {
        currentStyle = this.style[i];
        // make sure style contains properties needed.
        if (currentStyle.size === undefined)
          currentStyle.size = defaultStyle.size;
        if (currentStyle.font === undefined)
          currentStyle.font = defaultStyle.font;
        if (currentStyle.tracking === undefined)
          currentStyle.tracking = defaultStyle.tracking;
        if (currentStyle.characterCase === undefined)
          currentStyle.characterCase = defaultStyle.characterCase;
        if (currentStyle.fillColor === undefined)
          currentStyle.fillColor = defaultStyle.fillColor;
        if (currentStyle.strokeColor === undefined)
          currentStyle.strokeColor = defaultStyle.strokeColor;
        if (currentStyle.strokeWidth === undefined)
          currentStyle.strokeWidth = defaultStyle.strokeWidth;
      }

      // newline
      if (this.text.charAt(i) == "\n") {
        continue;
      }

      //runtime test for font
      if (FontLoader.isLoaded(currentStyle.font) === false) {
        FontLoader.load(this, [currentStyle.font]);
        return false;
      }

      //initalize with initialTracking and initialOffset;
      if (hPosition == 0) {
        hPosition =
          this.initialOffset +
          this.trackingOffset(
            this.initialTracking,
            currentStyle.size,
            FontLoader.getFont(currentStyle.font).units
          );
      }

      // create character
      char = new Character(this.text.charAt(i), currentStyle, i);
      if (this.original.character) {
        applyShapeEventListeners(this.original.character, char);
      }

      if (char.missing) {
        if (this.missingGlyphs == null) {
          this.missingGlyphs = [];
        }
        this.missingGlyphs.push({
          position: i,
          character: this.text.charAt(i),
          font: currentStyle.font
        });
      }

      //swap character if ligature
      //ligatures removed if tracking or this.ligatures is false
      if (currentStyle.tracking == 0 && this.ligatures == true) {
        //1 char match
        const ligTarget = this.text.substr(i, 4);
        if (char._font.ligatures[ligTarget.charAt(0)]) {
          //2 char match
          if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)]) {
            //3 char match
            if (
              char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][
                ligTarget.charAt(2)
              ]
            ) {
              //4 char match
              if (
                char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][
                  ligTarget.charAt(2)
                ][ligTarget.charAt(3)]
              ) {
                //swap 4 char ligature
                char.setGlyph(
                  char._font.ligatures[ligTarget.charAt(0)][
                    ligTarget.charAt(1)
                  ][ligTarget.charAt(2)][ligTarget.charAt(3)].glyph
                );
                i = i + 3;
              } else {
                //swap 3 char ligature
                char.setGlyph(
                  char._font.ligatures[ligTarget.charAt(0)][
                    ligTarget.charAt(1)
                  ][ligTarget.charAt(2)].glyph
                );
                i = i + 2;
              }
            } else {
              //swap 2 char ligature
              char.setGlyph(
                char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)]
                  .glyph
              );
              i = i + 1;
            }
          }
        }
      }

      //char.hPosition = hPosition;

      // push character into block
      //this.characters.push( char );
      //this.block.addChild( char );

      if (this.overset == true) {
        break;
      } else if (
        this.measured == true &&
        hPosition + char.measuredWidth > this.getWidth() &&
        this.oversetPotential == true
      ) {
        //char.hPosition = hPosition;
        //this.characters.push( char );
        //this.block.addChild( char );

        //this.block.removeChild(this.characters.pop() );
        this.oversetIndex = i;
        this.overset = true;
        break;
      } else if (
        this.measured == false &&
        hPosition + char.measuredWidth > this.getWidth()
      ) {
        //char.hPosition = hPosition;
        //this.characters.push( char );
        //this.block.addChild( char );

        //this.block.removeChild(this.characters.pop() );
        this.oversetIndex = i;
        this.overset = true;
        break;
      } else {
        char.hPosition = hPosition;
        this.characters.push(char);
        this.block.addChild(char);
      }

      //char.x = hPosition;
      hPosition =
        hPosition +
        char._glyph.offset * char.size +
        char.characterCaseOffset +
        char.trackingOffset() +
        char._glyph.getKerning(this.getCharCodeAt(i + 1), char.size);
    }

    len = this.characters.length;
    let pathPoint: any;
    let nextRotation = false;
    for (let i = 0; i < len; i++) {
      char = this.characters[i] as Character;
      pathPoint = this.pathPoints.getPathPoint(
        char.hPosition,
        hPosition,
        char._glyph.offset * char.size
      );
      //correct rotation around linesegments
      if (nextRotation == true) {
        this.characters[i - 1].parent.rotation = pathPoint.rotation;
        nextRotation = false;
      }
      if (pathPoint.next == true) {
        nextRotation = true;
      }

      char.rotation = pathPoint.rotation;

      //Baseline
      if (this.valign == VerticalAlign.BaseLine) {
        char.x = pathPoint.x;
        char.y = pathPoint.y;

        //reparent child into offset container
        if (pathPoint.offsetX) {
          const offsetChild = new createjs.Container();
          offsetChild.x = pathPoint.x;
          offsetChild.y = pathPoint.y;
          offsetChild.rotation = pathPoint.rotation;
          char.parent.removeChild(char);
          offsetChild.addChild(char);
          char.x = pathPoint.offsetX;
          char.y = 0;
          char.rotation = 0;
          this.addChild(offsetChild);
        } else {
          char.x = pathPoint.x;
          char.y = pathPoint.y;
          char.rotation = pathPoint.rotation;
        }
      } else {
        const offsetChild = new createjs.Container();
        offsetChild.x = pathPoint.x;
        offsetChild.y = pathPoint.y;
        offsetChild.rotation = pathPoint.rotation;
        char.parent.removeChild(char);
        offsetChild.addChild(char);
        char.x = 0;

        //vertical alignment
        if (this.valign == VerticalAlign.Top) {
          char.y = char.size;
        } else if (this.valign == VerticalAlign.Bottom) {
          char.y = (char._font.descent / char._font.units) * char.size;
        } else if (this.valign == VerticalAlign.CapHeight) {
          char.y = (char._font["cap-height"] / char._font.units) * char.size;
        } else if (this.valign == VerticalAlign.XHeight) {
          char.y = (char._font["x-height"] / char._font.units) * char.size;
        } else if (this.valign == VerticalAlign.Ascent) {
          char.y = (char._font.ascent / char._font.units) * char.size;
        } else if (this.valign == VerticalAlign.Center) {
          char.y =
            ((char._font["cap-height"] / char._font.units) * char.size) / 2;
        } else if (this.valign == VerticalAlign.Percent) {
          char.y = this.valignPercent * char.size;
        } else {
          char.y = 0;
        }
        char.rotation = 0;
        this.addChild(offsetChild);
      }
    }

    if (this.original.block) {
      applyShapeEventListeners(this.original.block, this.block);
    }

    return true;
  }

  trackingOffset(tracking: number, size: number, units: number): number {
    return size * (2.5 / units + 1 / 900 + tracking / 990);
  }

  offsetTracking(offset: number, size: number, units: number): number {
    return Math.floor(((offset - 2.5 / units - 1 / 900) * 990) / size);
  }
}
