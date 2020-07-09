var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Case from "./Case";
import FontLoader from "./FontLoader";
/**
 * Represents a styled character
 */
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(character, style, index) {
        if (index === void 0) { index = null; }
        var _this = _super.call(this) || this;
        _this.character = "";
        _this.characterCode = null;
        _this.font = null;
        _this.tracking = null;
        _this.characterCase = null;
        _this.characterCaseOffset = 0;
        _this.index = null;
        _this.size = null;
        _this.fillColor = null;
        _this.strokeColor = null;
        _this.strokeWidth = null;
        _this.measuredWidth = null;
        _this.measuredHeight = null;
        _this.hPosition = null;
        _this.missing = false;
        _this.set(style);
        _this.index = index;
        var upperSmall;
        // flip case depending on characterCase property
        if (_this.characterCase == Case.NORMAL) {
            _this.character = character;
        }
        else if (_this.characterCase == Case.UPPER) {
            _this.character = character.toUpperCase();
        }
        else if (_this.characterCase == Case.LOWER) {
            _this.character = character.toLowerCase();
        }
        else if (_this.characterCase == Case.SMALL_CAPS) {
            _this.character = character.toUpperCase();
            upperSmall = !(character === _this.character);
        }
        else {
            //fallback case for unknown.
            _this.character = character;
        }
        _this.characterCode = _this.character.charCodeAt(0);
        _this._font = FontLoader.getFont(_this.font);
        if (_this._font.glyphs[_this.characterCode]) {
            _this._glyph = _this._font.glyphs[_this.characterCode];
            //flip lower
        }
        else if (_this._font.glyphs[String.fromCharCode(_this.characterCode)
            .toLowerCase()
            .charCodeAt(0)]) {
            _this._glyph = _this._font.glyphs[String.fromCharCode(_this.characterCode)
                .toLowerCase()
                .charCodeAt(0)];
            //flip upper
        }
        else if (_this._font.glyphs[String.fromCharCode(_this.characterCode)
            .toUpperCase()
            .charCodeAt(0)]) {
            _this._glyph = _this._font.glyphs[String.fromCharCode(_this.characterCode)
                .toUpperCase()
                .charCodeAt(0)];
        }
        //missing glyph
        if (_this._glyph === undefined) {
            console.log("MISSING GLYPH:" + _this.character);
            _this._glyph = _this._font.glyphs[42];
            _this.missing = true;
        }
        _this.graphics = _this._glyph.graphic();
        // scale x
        if (_this.characterCase === Case.SMALL_CAPS) {
            if (upperSmall) {
                _this.scaleX = (_this.size / _this._font.units) * 0.8;
                _this.characterCaseOffset = -0.2 * (_this._glyph.offset * _this.size);
            }
            else {
                _this.scaleX = _this.size / _this._font.units;
            }
        }
        else {
            _this.scaleX = _this.size / _this._font.units;
        }
        _this.scaleY = -_this.scaleX;
        _this.measuredHeight =
            (_this._font.ascent - _this._font.descent) * _this.scaleX;
        _this.measuredWidth = _this.scaleX * _this._glyph.offset * _this._font.units;
        var ha = new createjs.Shape();
        ha.graphics
            .beginFill("#000")
            .drawRect(0, _this._font.descent, _this._glyph.offset * _this._font.units, _this._font.ascent - _this._font.descent);
        _this.hitArea = ha;
        return _this;
    }
    Character.prototype.setGlyph = function (glyph) {
        this._glyph = glyph;
        this.graphics = this._glyph.graphic();
    };
    Character.prototype.trackingOffset = function () {
        return this.size * (2.5 / this._font.units + 1 / 900 + this.tracking / 990);
    };
    Character.prototype.draw = function (ctx) {
        this._glyph._fill.style = this.fillColor;
        this._glyph._fill.matrix = null;
        this._glyph._stroke.style = this.strokeColor;
        this._glyph._strokeStyle.width = this.strokeWidth;
        return this._glyph.draw(ctx);
    };
    Character.prototype.getWidth = function () {
        return this.size * this._glyph.offset;
    };
    return Character;
}(createjs.Shape));
export default Character;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NoYXJhY3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUd0Qzs7R0FFRztBQUNIO0lBQXVDLDZCQUFjO0lBb0JuRCxtQkFBWSxTQUFpQixFQUFFLEtBQVMsRUFBRSxLQUFvQjtRQUFwQixzQkFBQSxFQUFBLFlBQW9CO1FBQTlELFlBQ0UsaUJBQU8sU0E0RlI7UUFoSEQsZUFBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixtQkFBYSxHQUFTLElBQUksQ0FBQztRQUMzQix5QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDeEIsV0FBSyxHQUFXLElBQUksQ0FBQztRQUNyQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFDN0Isb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFDOUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUN6QixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBT2QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLFVBQVUsQ0FBQztRQUVmLGdEQUFnRDtRQUNoRCxJQUFJLEtBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM1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LFVBQVMsS0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQUssR0FBNkI7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2SUQsQ0FBdUMsUUFBUSxDQUFDLEtBQUssR0F1SXBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhc2UgZnJvbSBcIi4vQ2FzZVwiO1xuaW1wb3J0IEdseXBoIGZyb20gXCIuL0dseXBoXCI7XG5pbXBvcnQgRm9udExvYWRlciBmcm9tIFwiLi9Gb250TG9hZGVyXCI7XG5pbXBvcnQgRm9udCBmcm9tIFwiLi9Gb250XCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0eWxlZCBjaGFyYWN0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgY3JlYXRlanMuU2hhcGUge1xuICBjaGFyYWN0ZXIgPSBcIlwiO1xuICBjaGFyYWN0ZXJDb2RlOiBudW1iZXIgPSBudWxsO1xuICBmb250OiBzdHJpbmcgPSBudWxsO1xuICB0cmFja2luZzogbnVtYmVyID0gbnVsbDtcbiAgY2hhcmFjdGVyQ2FzZTogQ2FzZSA9IG51bGw7XG4gIGNoYXJhY3RlckNhc2VPZmZzZXQgPSAwO1xuICBpbmRleDogbnVtYmVyID0gbnVsbDtcbiAgc2l6ZTogbnVtYmVyID0gbnVsbDtcbiAgZmlsbENvbG9yOiBzdHJpbmcgPSBudWxsO1xuICBzdHJva2VDb2xvcjogc3RyaW5nID0gbnVsbDtcbiAgc3Ryb2tlV2lkdGg6IG51bWJlciA9IG51bGw7XG4gIG1lYXN1cmVkV2lkdGg6IG51bWJlciA9IG51bGw7XG4gIG1lYXN1cmVkSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICBoUG9zaXRpb246IG51bWJlciA9IG51bGw7XG4gIG1pc3NpbmcgPSBmYWxzZTtcblxuICBfZ2x5cGg6IEdseXBoO1xuICBfZm9udDogRm9udDtcblxuICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXI6IHN0cmluZywgc3R5bGU6IHt9LCBpbmRleDogbnVtYmVyID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZXQoc3R5bGUpO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcblxuICAgIGxldCB1cHBlclNtYWxsO1xuXG4gICAgLy8gZmxpcCBjYXNlIGRlcGVuZGluZyBvbiBjaGFyYWN0ZXJDYXNlIHByb3BlcnR5XG4gICAgaWYgKHRoaXMuY2hhcmFjdGVyQ2FzZSA9PSBDYXNlLk5PUk1BTCkge1xuICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoYXJhY3RlckNhc2UgPT0gQ2FzZS5VUFBFUikge1xuICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhcmFjdGVyQ2FzZSA9PSBDYXNlLkxPV0VSKSB7XG4gICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3Rlci50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaGFyYWN0ZXJDYXNlID09IENhc2UuU01BTExfQ0FQUykge1xuICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgIHVwcGVyU21hbGwgPSAhKGNoYXJhY3RlciA9PT0gdGhpcy5jaGFyYWN0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2ZhbGxiYWNrIGNhc2UgZm9yIHVua25vd24uXG4gICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICB9XG4gICAgdGhpcy5jaGFyYWN0ZXJDb2RlID0gdGhpcy5jaGFyYWN0ZXIuY2hhckNvZGVBdCgwKTtcblxuICAgIHRoaXMuX2ZvbnQgPSBGb250TG9hZGVyLmdldEZvbnQodGhpcy5mb250KTtcblxuICAgIGlmICh0aGlzLl9mb250LmdseXBoc1t0aGlzLmNoYXJhY3RlckNvZGVdKSB7XG4gICAgICB0aGlzLl9nbHlwaCA9IHRoaXMuX2ZvbnQuZ2x5cGhzW3RoaXMuY2hhcmFjdGVyQ29kZV07XG5cbiAgICAgIC8vZmxpcCBsb3dlclxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLl9mb250LmdseXBoc1tcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmNoYXJhY3RlckNvZGUpXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAuY2hhckNvZGVBdCgwKVxuICAgICAgXVxuICAgICkge1xuICAgICAgdGhpcy5fZ2x5cGggPSB0aGlzLl9mb250LmdseXBoc1tcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmNoYXJhY3RlckNvZGUpXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAuY2hhckNvZGVBdCgwKVxuICAgICAgXTtcblxuICAgICAgLy9mbGlwIHVwcGVyXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuX2ZvbnQuZ2x5cGhzW1xuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuY2hhcmFjdGVyQ29kZSlcbiAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgIC5jaGFyQ29kZUF0KDApXG4gICAgICBdXG4gICAgKSB7XG4gICAgICB0aGlzLl9nbHlwaCA9IHRoaXMuX2ZvbnQuZ2x5cGhzW1xuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuY2hhcmFjdGVyQ29kZSlcbiAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgIC5jaGFyQ29kZUF0KDApXG4gICAgICBdO1xuICAgIH1cblxuICAgIC8vbWlzc2luZyBnbHlwaFxuICAgIGlmICh0aGlzLl9nbHlwaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk1JU1NJTkcgR0xZUEg6XCIgKyB0aGlzLmNoYXJhY3Rlcik7XG4gICAgICB0aGlzLl9nbHlwaCA9IHRoaXMuX2ZvbnQuZ2x5cGhzWzQyXTtcbiAgICAgIHRoaXMubWlzc2luZyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuZ3JhcGhpY3MgPSB0aGlzLl9nbHlwaC5ncmFwaGljKCk7XG5cbiAgICAvLyBzY2FsZSB4XG4gICAgaWYgKHRoaXMuY2hhcmFjdGVyQ2FzZSA9PT0gQ2FzZS5TTUFMTF9DQVBTKSB7XG4gICAgICBpZiAodXBwZXJTbWFsbCkge1xuICAgICAgICB0aGlzLnNjYWxlWCA9ICh0aGlzLnNpemUgLyB0aGlzLl9mb250LnVuaXRzKSAqIDAuODtcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJDYXNlT2Zmc2V0ID0gLTAuMiAqICh0aGlzLl9nbHlwaC5vZmZzZXQgKiB0aGlzLnNpemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY2FsZVggPSB0aGlzLnNpemUgLyB0aGlzLl9mb250LnVuaXRzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjYWxlWCA9IHRoaXMuc2l6ZSAvIHRoaXMuX2ZvbnQudW5pdHM7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZVkgPSAtdGhpcy5zY2FsZVg7XG5cbiAgICB0aGlzLm1lYXN1cmVkSGVpZ2h0ID1cbiAgICAgICh0aGlzLl9mb250LmFzY2VudCAtIHRoaXMuX2ZvbnQuZGVzY2VudCkgKiB0aGlzLnNjYWxlWDtcbiAgICB0aGlzLm1lYXN1cmVkV2lkdGggPSB0aGlzLnNjYWxlWCAqIHRoaXMuX2dseXBoLm9mZnNldCAqIHRoaXMuX2ZvbnQudW5pdHM7XG5cbiAgICBjb25zdCBoYSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIGhhLmdyYXBoaWNzXG4gICAgICAuYmVnaW5GaWxsKFwiIzAwMFwiKVxuICAgICAgLmRyYXdSZWN0KFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLl9mb250LmRlc2NlbnQsXG4gICAgICAgIHRoaXMuX2dseXBoLm9mZnNldCAqIHRoaXMuX2ZvbnQudW5pdHMsXG4gICAgICAgIHRoaXMuX2ZvbnQuYXNjZW50IC0gdGhpcy5fZm9udC5kZXNjZW50XG4gICAgICApO1xuICAgIHRoaXMuaGl0QXJlYSA9IGhhO1xuICB9XG5cbiAgc2V0R2x5cGgoZ2x5cGg6IEdseXBoKSB7XG4gICAgdGhpcy5fZ2x5cGggPSBnbHlwaDtcbiAgICB0aGlzLmdyYXBoaWNzID0gdGhpcy5fZ2x5cGguZ3JhcGhpYygpO1xuICB9XG5cbiAgdHJhY2tpbmdPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zaXplICogKDIuNSAvIHRoaXMuX2ZvbnQudW5pdHMgKyAxIC8gOTAwICsgdGhpcy50cmFja2luZyAvIDk5MCk7XG4gIH1cblxuICBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogYm9vbGVhbiB7XG4gICAgdGhpcy5fZ2x5cGguX2ZpbGwuc3R5bGUgPSB0aGlzLmZpbGxDb2xvcjtcbiAgICB0aGlzLl9nbHlwaC5fZmlsbC5tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX2dseXBoLl9zdHJva2Uuc3R5bGUgPSB0aGlzLnN0cm9rZUNvbG9yO1xuICAgIHRoaXMuX2dseXBoLl9zdHJva2VTdHlsZS53aWR0aCA9IHRoaXMuc3Ryb2tlV2lkdGg7XG4gICAgcmV0dXJuIHRoaXMuX2dseXBoLmRyYXcoY3R4KTtcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgKiB0aGlzLl9nbHlwaC5vZmZzZXQ7XG4gIH1cbn1cbiJdfQ==