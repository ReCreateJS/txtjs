import Font from "./Font";
import Glyph from "./Glyph";
/**
 * Fetches font files via AJAX request, and
 * parses the font into glyphs, and stores it.
 * Local storage is optionally used for caching.
 *
 * Font files store font data, grouped by categories:
 *
 *  * `0` = Font properties: `0|property name|property value`
 *  * `1` = Glyph SVG shape data: `1|?|?|SVGPath data`
 *  * `2` = Kerning spacing: `2|?|?|?`
 *  * `3` = Ligatures: `3`
 *
 * Each line in a category of data is delineated with pipe characters "|".
 *
 * Partial example:
 *
 * ```
 * 0|id|Abel-Regular
 * 0|family|Abel
 * 1|33|428|M250 434h-72l-55 1000h182zM137 0v154h154v-154h-154z
 * 1|34|645|M225 993h-51l-51 441h153zM471 993h-51l-51 441h153z
 * 2|34|197|123
 * 2|47|100|102
 * 3
 * ```
 *
 * @todo This class should be split into FontLoader (AJAX fetch), FontParser (deserialisation), and probably a FontStorage class.
 */
var FontLoader = /** @class */ (function () {
    function FontLoader() {
    }
    FontLoader.isLoaded = function (name) {
        if (FontLoader.fonts.hasOwnProperty(name)) {
            return FontLoader.fonts[name].loaded;
        }
        return false;
    };
    FontLoader.getFont = function (name) {
        if (FontLoader.fonts.hasOwnProperty(name)) {
            return FontLoader.fonts[name];
        }
        return null;
    };
    FontLoader.load = function (target, fonts) {
        //no loaderId implies no loading for this txt field
        var loader;
        if (target.loaderId == null) {
            loader = {};
            target.loaderId = FontLoader.loaders.push(loader) - 1;
            loader._id = target.loaderId;
            loader._target = target;
        }
        else {
            loader = FontLoader.loaders[target.loaderId];
        }
        var fontCount = fonts.length;
        for (var i = 0; i < fontCount; ++i) {
            //mark loader for font loading
            loader[fonts[i]] = false;
        }
        for (var prop in loader) {
            if (prop.charAt(0) != "_") {
                FontLoader.loadFont(prop, loader);
            }
        }
    };
    FontLoader.check = function (id) {
        var loader = FontLoader.loaders[id];
        //determine if all fonts are loaded
        for (var prop in loader) {
            if (prop.charAt(0) != "_") {
                loader[prop] = FontLoader.isLoaded(prop);
                if (loader[prop] == false)
                    return;
            }
        }
        window.setTimeout(function () {
            loader._target.fontLoaded();
        }, 1);
    };
    FontLoader.loadFont = function (fontName, loader) {
        //determine if font exists in memory
        if (FontLoader.fonts.hasOwnProperty(fontName)) {
            //loading complete
            if (FontLoader.fonts[fontName].loaded === true) {
                FontLoader.check(loader._id);
                //loading not complete
            }
            else {
                //add loader id to font
                FontLoader.fonts[fontName].targets.push(loader._id);
            }
            //load from scratch
        }
        else {
            var font_1 = (FontLoader.fonts[fontName] = new Font());
            font_1.targets.push(loader._id);
            //TODO localstorage check & get
            var req = new XMLHttpRequest();
            if (localStorage && FontLoader.cache) {
                var local = JSON.parse(localStorage.getItem("txt_font_" + fontName.split(" ").join("_")));
                if (local != null) {
                    if (local.version === FontLoader.version) {
                        req.cacheResponseText = local.font;
                        req.cacheFont = true;
                    }
                }
            }
            req.onload = function () {
                //localstorage set
                if (localStorage && FontLoader.cache && this.cacheFont == undefined) {
                    localStorage.setItem("txt_font_" + fontName.split(" ").join("_"), JSON.stringify({
                        font: this.responseText,
                        version: FontLoader.version
                    }));
                }
                var lines = this.responseText.split("\n");
                //use cacheResponseText as responseText is readonly via XHR
                if (this.cacheResponseText) {
                    lines = this.cacheResponseText.split("\n");
                }
                var len = lines.length;
                var i = 0;
                var line;
                var glyph;
                var lineLen;
                while (i < len) {
                    line = lines[i].split("|");
                    switch (line[0]) {
                        case "0":
                            //properties
                            if (line[1] == "id" ||
                                line[1] == "panose" ||
                                line[1] == "family" ||
                                line[1] == "font-style" ||
                                line[1] == "font-stretch") {
                                font_1[line[1]] = line[2];
                            }
                            else {
                                font_1[line[1]] = parseInt(line[2]);
                            }
                            break;
                        case "1":
                            //glyphs
                            glyph = new Glyph();
                            glyph.offset = parseInt(line[2]) / font_1.units;
                            glyph.path = line[3];
                            font_1.glyphs[line[1]] = glyph;
                            break;
                        case "2":
                            //kerning
                            if (font_1.kerning[line[1]] == undefined) {
                                font_1.kerning[line[1]] = {};
                            }
                            if (font_1.glyphs[line[1]] == undefined) {
                                glyph = new Glyph();
                                glyph.offset = font_1.default / font_1.units;
                                glyph.path = "";
                                font_1.glyphs[line[1]] = glyph;
                            }
                            font_1.glyphs[line[1]].kerning[line[2]] =
                                parseInt(line[3]) / font_1.units;
                            font_1.kerning[line[1]][line[2]] = parseInt(line[3]) / font_1.units;
                            break;
                        case "3":
                            line.shift();
                            lineLen = line.length;
                            for (var j = 0; j < lineLen; j++) {
                                var path = line[j].split("");
                                var pathLength = path.length;
                                var target = font_1.ligatures;
                                for (var k = 0; k < pathLength; k++) {
                                    if (target[path[k]] == undefined) {
                                        target[path[k]] = {};
                                    }
                                    if (k == pathLength - 1) {
                                        target[path[k]].glyph = font_1.glyphs[line[j]];
                                    }
                                    target = target[path[k]];
                                }
                                //font.ligatures[ line[ j ] ] = font.glyphs[ line[j] ]
                            }
                            break;
                    }
                    i++;
                }
                //character cloning
                //clone bullet into multiple areas
                font_1.cloneGlyph(183, 8226);
                font_1.cloneGlyph(8729, 8226);
                font_1.cloneGlyph(12539, 8226);
                font_1.cloneGlyph(9702, 8226);
                font_1.cloneGlyph(9679, 8226);
                font_1.cloneGlyph(9675, 8226);
                //define font adjustment values for font.top, font.middle, font.bottom
                if (font_1.top == undefined) {
                    font_1.top = 0;
                }
                if (font_1.middle == undefined) {
                    font_1.middle = 0;
                }
                if (font_1.bottom == undefined) {
                    font_1.bottom = 0;
                }
                //level the font metadata
                var lLen = font_1.targets.length;
                font_1.loaded = true;
                for (var l = 0; l < lLen; ++l) {
                    FontLoader.check(font_1.targets[l]);
                }
                font_1.targets = [];
            };
            //check if cached
            if (req.cacheFont == true) {
                req.onload();
            }
            else {
                req.open("get", FontLoader.path + fontName.split(" ").join("_") + ".txt", true);
                req.send();
            }
        }
    };
    /**
     * Server path to load font files from.
     */
    FontLoader.path = "/font/";
    FontLoader.cache = false;
    FontLoader.version = 0;
    FontLoader.fonts = {};
    FontLoader.loaders = [];
    return FontLoader;
}());
export default FontLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9udExvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Gb250TG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNIO0lBQUE7SUFrT0EsQ0FBQztJQXBOUSxtQkFBUSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sa0JBQU8sR0FBZCxVQUFlLElBQVk7UUFDekIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxlQUFJLEdBQVgsVUFBWSxNQUFXLEVBQUUsS0FBZTtRQUN0QyxtREFBbUQ7UUFDbkQsSUFBSSxNQUFXLENBQUM7UUFDaEIsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUMzQixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLEdBQUcs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Q0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQjtnQkFFRCx5QkFBeUI7Z0JBQ3pCLElBQU0sSUFBSSxHQUFHLE1BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxNQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRTtvQkFDN0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE1BQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUNGLGlCQUFpQjtZQUNqQixJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUN6QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUNOLEtBQUssRUFDTCxVQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFDeEQsSUFBSSxDQUNMLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1o7U0FDRjtJQUNILENBQUM7SUFoT0Q7O09BRUc7SUFDSSxlQUFJLEdBQUcsUUFBUSxDQUFDO0lBRWhCLGdCQUFLLEdBQUcsS0FBSyxDQUFDO0lBRWQsa0JBQU8sR0FBRyxDQUFDLENBQUM7SUFFWixnQkFBSyxHQUFRLEVBQUUsQ0FBQztJQUVoQixrQkFBTyxHQUFRLEVBQUUsQ0FBQztJQXNOM0IsaUJBQUM7Q0FBQSxBQWxPRCxJQWtPQztlQWxPb0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb250IGZyb20gXCIuL0ZvbnRcIjtcbmltcG9ydCBHbHlwaCBmcm9tIFwiLi9HbHlwaFwiO1xuXG4vKipcbiAqIEZldGNoZXMgZm9udCBmaWxlcyB2aWEgQUpBWCByZXF1ZXN0LCBhbmRcbiAqIHBhcnNlcyB0aGUgZm9udCBpbnRvIGdseXBocywgYW5kIHN0b3JlcyBpdC5cbiAqIExvY2FsIHN0b3JhZ2UgaXMgb3B0aW9uYWxseSB1c2VkIGZvciBjYWNoaW5nLlxuICpcbiAqIEZvbnQgZmlsZXMgc3RvcmUgZm9udCBkYXRhLCBncm91cGVkIGJ5IGNhdGVnb3JpZXM6XG4gKlxuICogICogYDBgID0gRm9udCBwcm9wZXJ0aWVzOiBgMHxwcm9wZXJ0eSBuYW1lfHByb3BlcnR5IHZhbHVlYFxuICogICogYDFgID0gR2x5cGggU1ZHIHNoYXBlIGRhdGE6IGAxfD98P3xTVkdQYXRoIGRhdGFgXG4gKiAgKiBgMmAgPSBLZXJuaW5nIHNwYWNpbmc6IGAyfD98P3w/YFxuICogICogYDNgID0gTGlnYXR1cmVzOiBgM2BcbiAqXG4gKiBFYWNoIGxpbmUgaW4gYSBjYXRlZ29yeSBvZiBkYXRhIGlzIGRlbGluZWF0ZWQgd2l0aCBwaXBlIGNoYXJhY3RlcnMgXCJ8XCIuXG4gKlxuICogUGFydGlhbCBleGFtcGxlOlxuICpcbiAqIGBgYFxuICogMHxpZHxBYmVsLVJlZ3VsYXJcbiAqIDB8ZmFtaWx5fEFiZWxcbiAqIDF8MzN8NDI4fE0yNTAgNDM0aC03MmwtNTUgMTAwMGgxODJ6TTEzNyAwdjE1NGgxNTR2LTE1NGgtMTU0elxuICogMXwzNHw2NDV8TTIyNSA5OTNoLTUxbC01MSA0NDFoMTUzek00NzEgOTkzaC01MWwtNTEgNDQxaDE1M3pcbiAqIDJ8MzR8MTk3fDEyM1xuICogMnw0N3wxMDB8MTAyXG4gKiAzXG4gKiBgYGBcbiAqXG4gKiBAdG9kbyBUaGlzIGNsYXNzIHNob3VsZCBiZSBzcGxpdCBpbnRvIEZvbnRMb2FkZXIgKEFKQVggZmV0Y2gpLCBGb250UGFyc2VyIChkZXNlcmlhbGlzYXRpb24pLCBhbmQgcHJvYmFibHkgYSBGb250U3RvcmFnZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9udExvYWRlciB7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgcGF0aCB0byBsb2FkIGZvbnQgZmlsZXMgZnJvbS5cbiAgICovXG4gIHN0YXRpYyBwYXRoID0gXCIvZm9udC9cIjtcblxuICBzdGF0aWMgY2FjaGUgPSBmYWxzZTtcblxuICBzdGF0aWMgdmVyc2lvbiA9IDA7XG5cbiAgc3RhdGljIGZvbnRzOiBhbnkgPSB7fTtcblxuICBzdGF0aWMgbG9hZGVyczogYW55ID0gW107XG5cbiAgc3RhdGljIGlzTG9hZGVkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChGb250TG9hZGVyLmZvbnRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICByZXR1cm4gRm9udExvYWRlci5mb250c1tuYW1lXS5sb2FkZWQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRGb250KG5hbWU6IHN0cmluZyk6IEZvbnQge1xuICAgIGlmIChGb250TG9hZGVyLmZvbnRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICByZXR1cm4gRm9udExvYWRlci5mb250c1tuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgbG9hZCh0YXJnZXQ6IGFueSwgZm9udHM6IHN0cmluZ1tdKSB7XG4gICAgLy9ubyBsb2FkZXJJZCBpbXBsaWVzIG5vIGxvYWRpbmcgZm9yIHRoaXMgdHh0IGZpZWxkXG4gICAgbGV0IGxvYWRlcjogYW55O1xuICAgIGlmICh0YXJnZXQubG9hZGVySWQgPT0gbnVsbCkge1xuICAgICAgbG9hZGVyID0ge307XG4gICAgICB0YXJnZXQubG9hZGVySWQgPSBGb250TG9hZGVyLmxvYWRlcnMucHVzaChsb2FkZXIpIC0gMTtcbiAgICAgIGxvYWRlci5faWQgPSB0YXJnZXQubG9hZGVySWQ7XG4gICAgICBsb2FkZXIuX3RhcmdldCA9IHRhcmdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9hZGVyID0gRm9udExvYWRlci5sb2FkZXJzW3RhcmdldC5sb2FkZXJJZF07XG4gICAgfVxuICAgIGNvbnN0IGZvbnRDb3VudCA9IGZvbnRzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvbnRDb3VudDsgKytpKSB7XG4gICAgICAvL21hcmsgbG9hZGVyIGZvciBmb250IGxvYWRpbmdcbiAgICAgIGxvYWRlcltmb250c1tpXV0gPSBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwcm9wIGluIGxvYWRlcikge1xuICAgICAgaWYgKHByb3AuY2hhckF0KDApICE9IFwiX1wiKSB7XG4gICAgICAgIEZvbnRMb2FkZXIubG9hZEZvbnQocHJvcCwgbG9hZGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2hlY2soaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGxvYWRlciA9IEZvbnRMb2FkZXIubG9hZGVyc1tpZF07XG4gICAgLy9kZXRlcm1pbmUgaWYgYWxsIGZvbnRzIGFyZSBsb2FkZWRcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gbG9hZGVyKSB7XG4gICAgICBpZiAocHJvcC5jaGFyQXQoMCkgIT0gXCJfXCIpIHtcbiAgICAgICAgbG9hZGVyW3Byb3BdID0gRm9udExvYWRlci5pc0xvYWRlZChwcm9wKTtcbiAgICAgICAgaWYgKGxvYWRlcltwcm9wXSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxvYWRlci5fdGFyZ2V0LmZvbnRMb2FkZWQoKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkRm9udChmb250TmFtZTogc3RyaW5nLCBsb2FkZXI6IGFueSkge1xuICAgIC8vZGV0ZXJtaW5lIGlmIGZvbnQgZXhpc3RzIGluIG1lbW9yeVxuICAgIGlmIChGb250TG9hZGVyLmZvbnRzLmhhc093blByb3BlcnR5KGZvbnROYW1lKSkge1xuICAgICAgLy9sb2FkaW5nIGNvbXBsZXRlXG4gICAgICBpZiAoRm9udExvYWRlci5mb250c1tmb250TmFtZV0ubG9hZGVkID09PSB0cnVlKSB7XG4gICAgICAgIEZvbnRMb2FkZXIuY2hlY2sobG9hZGVyLl9pZCk7XG5cbiAgICAgICAgLy9sb2FkaW5nIG5vdCBjb21wbGV0ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9hZGQgbG9hZGVyIGlkIHRvIGZvbnRcbiAgICAgICAgRm9udExvYWRlci5mb250c1tmb250TmFtZV0udGFyZ2V0cy5wdXNoKGxvYWRlci5faWQpO1xuICAgICAgfVxuICAgICAgLy9sb2FkIGZyb20gc2NyYXRjaFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmb250OiBGb250ID0gKEZvbnRMb2FkZXIuZm9udHNbZm9udE5hbWVdID0gbmV3IEZvbnQoKSk7XG4gICAgICBmb250LnRhcmdldHMucHVzaChsb2FkZXIuX2lkKTtcblxuICAgICAgLy9UT0RPIGxvY2Fsc3RvcmFnZSBjaGVjayAmIGdldFxuICAgICAgY29uc3QgcmVxOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZSAmJiBGb250TG9hZGVyLmNhY2hlKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gSlNPTi5wYXJzZShcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInR4dF9mb250X1wiICsgZm9udE5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJfXCIpKVxuICAgICAgICApO1xuICAgICAgICBpZiAobG9jYWwgIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChsb2NhbC52ZXJzaW9uID09PSBGb250TG9hZGVyLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHJlcS5jYWNoZVJlc3BvbnNlVGV4dCA9IGxvY2FsLmZvbnQ7XG4gICAgICAgICAgICByZXEuY2FjaGVGb250ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2xvY2Fsc3RvcmFnZSBzZXRcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZSAmJiBGb250TG9hZGVyLmNhY2hlICYmIHRoaXMuY2FjaGVGb250ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgXCJ0eHRfZm9udF9cIiArIGZvbnROYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiX1wiKSxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgZm9udDogdGhpcy5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICAgIHZlcnNpb246IEZvbnRMb2FkZXIudmVyc2lvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5yZXNwb25zZVRleHQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIC8vdXNlIGNhY2hlUmVzcG9uc2VUZXh0IGFzIHJlc3BvbnNlVGV4dCBpcyByZWFkb25seSB2aWEgWEhSXG4gICAgICAgIGlmICh0aGlzLmNhY2hlUmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgbGluZXMgPSB0aGlzLmNhY2hlUmVzcG9uc2VUZXh0LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbiA9IGxpbmVzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGluZTogc3RyaW5nW107XG4gICAgICAgIGxldCBnbHlwaDogR2x5cGg7XG4gICAgICAgIGxldCBsaW5lTGVuO1xuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICAgIGxpbmUgPSBsaW5lc1tpXS5zcGxpdChcInxcIik7XG4gICAgICAgICAgc3dpdGNoIChsaW5lWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxuICAgICAgICAgICAgICAvL3Byb3BlcnRpZXNcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGxpbmVbMV0gPT0gXCJpZFwiIHx8XG4gICAgICAgICAgICAgICAgbGluZVsxXSA9PSBcInBhbm9zZVwiIHx8XG4gICAgICAgICAgICAgICAgbGluZVsxXSA9PSBcImZhbWlseVwiIHx8XG4gICAgICAgICAgICAgICAgbGluZVsxXSA9PSBcImZvbnQtc3R5bGVcIiB8fFxuICAgICAgICAgICAgICAgIGxpbmVbMV0gPT0gXCJmb250LXN0cmV0Y2hcIlxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBmb250W2xpbmVbMV1dID0gbGluZVsyXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb250W2xpbmVbMV1dID0gcGFyc2VJbnQobGluZVsyXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCIxXCI6XG4gICAgICAgICAgICAgIC8vZ2x5cGhzXG5cbiAgICAgICAgICAgICAgZ2x5cGggPSBuZXcgR2x5cGgoKTtcbiAgICAgICAgICAgICAgZ2x5cGgub2Zmc2V0ID0gcGFyc2VJbnQobGluZVsyXSkgLyBmb250LnVuaXRzO1xuICAgICAgICAgICAgICBnbHlwaC5wYXRoID0gbGluZVszXTtcbiAgICAgICAgICAgICAgZm9udC5nbHlwaHNbbGluZVsxXV0gPSBnbHlwaDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgICAgICAgIC8va2VybmluZ1xuICAgICAgICAgICAgICBpZiAoZm9udC5rZXJuaW5nW2xpbmVbMV1dID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvbnQua2VybmluZ1tsaW5lWzFdXSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmb250LmdseXBoc1tsaW5lWzFdXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnbHlwaCA9IG5ldyBHbHlwaCgpO1xuICAgICAgICAgICAgICAgIGdseXBoLm9mZnNldCA9IGZvbnQuZGVmYXVsdCAvIGZvbnQudW5pdHM7XG4gICAgICAgICAgICAgICAgZ2x5cGgucGF0aCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZm9udC5nbHlwaHNbbGluZVsxXV0gPSBnbHlwaDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb250LmdseXBoc1tsaW5lWzFdXS5rZXJuaW5nW2xpbmVbMl1dID1cbiAgICAgICAgICAgICAgICBwYXJzZUludChsaW5lWzNdKSAvIGZvbnQudW5pdHM7XG4gICAgICAgICAgICAgIGZvbnQua2VybmluZ1tsaW5lWzFdXVtsaW5lWzJdXSA9IHBhcnNlSW50KGxpbmVbM10pIC8gZm9udC51bml0cztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICAgIGxpbmUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgbGluZUxlbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmVMZW47IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBsaW5lW2pdLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhMZW5ndGggPSBwYXRoLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZm9udC5saWdhdHVyZXM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwYXRoTGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbcGF0aFtrXV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtwYXRoW2tdXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gcGF0aExlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3BhdGhba11dLmdseXBoID0gZm9udC5nbHlwaHNbbGluZVtqXV07XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtwYXRoW2tdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9mb250LmxpZ2F0dXJlc1sgbGluZVsgaiBdIF0gPSBmb250LmdseXBoc1sgbGluZVtqXSBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICAvL2NoYXJhY3RlciBjbG9uaW5nXG4gICAgICAgIC8vY2xvbmUgYnVsbGV0IGludG8gbXVsdGlwbGUgYXJlYXNcbiAgICAgICAgZm9udC5jbG9uZUdseXBoKDE4MywgODIyNik7XG4gICAgICAgIGZvbnQuY2xvbmVHbHlwaCg4NzI5LCA4MjI2KTtcbiAgICAgICAgZm9udC5jbG9uZUdseXBoKDEyNTM5LCA4MjI2KTtcbiAgICAgICAgZm9udC5jbG9uZUdseXBoKDk3MDIsIDgyMjYpO1xuICAgICAgICBmb250LmNsb25lR2x5cGgoOTY3OSwgODIyNik7XG4gICAgICAgIGZvbnQuY2xvbmVHbHlwaCg5Njc1LCA4MjI2KTtcblxuICAgICAgICAvL2RlZmluZSBmb250IGFkanVzdG1lbnQgdmFsdWVzIGZvciBmb250LnRvcCwgZm9udC5taWRkbGUsIGZvbnQuYm90dG9tXG4gICAgICAgIGlmIChmb250LnRvcCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb250LnRvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvbnQubWlkZGxlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvbnQubWlkZGxlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9udC5ib3R0b20gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9udC5ib3R0b20gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sZXZlbCB0aGUgZm9udCBtZXRhZGF0YVxuICAgICAgICBjb25zdCBsTGVuID0gZm9udC50YXJnZXRzLmxlbmd0aDtcbiAgICAgICAgZm9udC5sb2FkZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IGxMZW47ICsrbCkge1xuICAgICAgICAgIEZvbnRMb2FkZXIuY2hlY2soZm9udC50YXJnZXRzW2xdKTtcbiAgICAgICAgfVxuICAgICAgICBmb250LnRhcmdldHMgPSBbXTtcbiAgICAgIH07XG4gICAgICAvL2NoZWNrIGlmIGNhY2hlZFxuICAgICAgaWYgKHJlcS5jYWNoZUZvbnQgPT0gdHJ1ZSkge1xuICAgICAgICByZXEub25sb2FkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXEub3BlbihcbiAgICAgICAgICBcImdldFwiLFxuICAgICAgICAgIEZvbnRMb2FkZXIucGF0aCArIGZvbnROYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiX1wiKSArIFwiLnR4dFwiLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==