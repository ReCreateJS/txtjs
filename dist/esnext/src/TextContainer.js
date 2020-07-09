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
import FontLoader from "./FontLoader";
import Case from "./Case";
import Accessibility from "./Accessibility";
/**
 * Common aspects of top-level Text classes
 */
var TextContainer = /** @class */ (function (_super) {
    __extends(TextContainer, _super);
    function TextContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        _this.original = null;
        _this.style = null;
        _this.font = "belinda";
        _this.characterCase = Case.NORMAL;
        //accessibility
        _this.accessibilityText = null;
        _this.accessibilityPriority = 2;
        _this.accessibilityId = null;
        return _this;
    }
    TextContainer.prototype.loadFonts = function () {
        var fonts = [this.font].concat(this.fontsFromCharacterStyles(this.style));
        FontLoader.load(this, fonts);
    };
    //called when text is rendered
    TextContainer.prototype.complete = function () {
        //placeholder
    };
    //called when font has loaded
    TextContainer.prototype.fontLoaded = function () {
        this.layout();
    };
    //call stage.update to render canvas
    //overload to support deferred rendering
    TextContainer.prototype.render = function () {
        this.stage.update();
    };
    TextContainer.prototype.addAccessibility = function () {
        Accessibility.set(this);
    };
    TextContainer.prototype.fontsFromCharacterStyles = function (styles) {
        var styleFonts = [];
        if (styles) {
            for (var i = 0; i < styles.length; ++i) {
                if (styles[i] != undefined && styles[i].font != undefined) {
                    styleFonts.push(styles[i].font);
                }
            }
        }
        return styleFonts;
    };
    TextContainer.prototype.getCharCodeAt = function (index) {
        if (this.characterCase == Case.NORMAL) {
            return this.text.charAt(index).charCodeAt(0);
        }
        else if (this.characterCase == Case.UPPER) {
            return this.text
                .charAt(index)
                .toUpperCase()
                .charCodeAt(0);
        }
        else if (this.characterCase == Case.LOWER) {
            return this.text
                .charAt(index)
                .toLowerCase()
                .charCodeAt(0);
        }
        else if (this.characterCase == Case.SMALL_CAPS) {
            return this.text
                .charAt(index)
                .toUpperCase()
                .charCodeAt(0);
        }
        else {
            //fallback case for unknown.
            return this.text.charAt(index).charCodeAt(0);
        }
    };
    // TODO: this code needs unit tests before it gets changed any further
    /**
     * Figure out how many characters a ligature covers,
     * and swap character glyph
     * @param char
     * @param ligTarget
     */
    TextContainer.prototype.ligatureSwap = function (char, ligTarget) {
        var advanceBy = 0;
        var firstChar = ligTarget.charAt(0);
        var firstLigature = char._font.ligatures[firstChar];
        //1 char match
        if (firstLigature) {
            //2 char match
            if (firstLigature[ligTarget.charAt(1)]) {
                //3 char match
                if (firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)]) {
                    //4 char match
                    if (firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)]) {
                        //swap 4 char ligature
                        char.setGlyph(firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)].glyph);
                        advanceBy = 3;
                    }
                    else {
                        //swap 3 char ligature
                        char.setGlyph(firstLigature[ligTarget.charAt(1)][ligTarget.charAt(2)].glyph);
                        advanceBy = 2;
                    }
                }
                else {
                    //swap 2 char ligature
                    char.setGlyph(firstLigature[ligTarget.charAt(1)].glyph);
                    advanceBy = 1;
                }
            }
        }
        return advanceBy;
    };
    return TextContainer;
}(createjs.Container));
export default TextContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXh0Q29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBRzVDOztHQUVHO0FBQ0g7SUFBb0QsaUNBQWtCO0lBQXRFO1FBQUEscUVBeUhDO1FBeEhDLFVBQUksR0FBRyxFQUFFLENBQUM7UUFDVixjQUFRLEdBQWlCLElBQUksQ0FBQztRQUM5QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFVBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsbUJBQWEsR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWxDLGVBQWU7UUFDZix1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFDakMsMkJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLHFCQUFlLEdBQVcsSUFBSSxDQUFDOztJQStHakMsQ0FBQztJQTdHVyxpQ0FBUyxHQUFuQjtRQUNFLElBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixnQ0FBUSxHQUFSO1FBQ0UsYUFBYTtJQUNmLENBQUM7SUFFRCw2QkFBNkI7SUFDN0Isa0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLHdDQUF3QztJQUN4Qyw4QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBSUQsd0NBQWdCLEdBQWhCO1FBQ0UsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sZ0RBQXdCLEdBQWhDLFVBQWlDLE1BQU07UUFDckMsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtvQkFDekQsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxxQ0FBYSxHQUFiLFVBQWMsS0FBYTtRQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNDLE9BQU8sSUFBSSxDQUFDLElBQUk7aUJBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDYixXQUFXLEVBQUU7aUJBQ2IsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSTtpQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUNiLFdBQVcsRUFBRTtpQkFDYixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJO2lCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2IsV0FBVyxFQUFFO2lCQUNiLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsNEJBQTRCO1lBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVELHNFQUFzRTtJQUN0RTs7Ozs7T0FLRztJQUNPLG9DQUFZLEdBQXRCLFVBQXVCLElBQWUsRUFBRSxTQUFpQjtRQUN2RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxjQUFjO1FBQ2QsSUFBSSxhQUFhLEVBQUU7WUFDakIsY0FBYztZQUNkLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdEMsY0FBYztnQkFDZCxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzRCxjQUFjO29CQUNkLElBQ0UsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JELFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ3BCLEVBQ0Q7d0JBQ0Esc0JBQXNCO3dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUNYLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyRCxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNwQixDQUFDLEtBQUssQ0FDUixDQUFDO3dCQUNGLFNBQVMsR0FBRyxDQUFDLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsc0JBQXNCO3dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUNYLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDOUQsQ0FBQzt3QkFDRixTQUFTLEdBQUcsQ0FBQyxDQUFDO3FCQUNmO2lCQUNGO3FCQUFNO29CQUNMLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4RCxTQUFTLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO2FBQ0Y7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF6SEQsQ0FBb0QsUUFBUSxDQUFDLFNBQVMsR0F5SHJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvbnRMb2FkZXIgZnJvbSBcIi4vRm9udExvYWRlclwiO1xuaW1wb3J0IENhc2UgZnJvbSBcIi4vQ2FzZVwiO1xuaW1wb3J0IHsgQ29uc3RydWN0T2JqLCBTdHlsZSB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcbmltcG9ydCBBY2Nlc3NpYmlsaXR5IGZyb20gXCIuL0FjY2Vzc2liaWxpdHlcIjtcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vQ2hhcmFjdGVyXCI7XG5cbi8qKlxuICogQ29tbW9uIGFzcGVjdHMgb2YgdG9wLWxldmVsIFRleHQgY2xhc3Nlc1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBUZXh0Q29udGFpbmVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgdGV4dCA9IFwiXCI7XG4gIG9yaWdpbmFsOiBDb25zdHJ1Y3RPYmogPSBudWxsO1xuICBzdHlsZTogU3R5bGVbXSA9IG51bGw7XG4gIGZvbnQgPSBcImJlbGluZGFcIjtcbiAgY2hhcmFjdGVyQ2FzZTogQ2FzZSA9IENhc2UuTk9STUFMO1xuXG4gIC8vYWNjZXNzaWJpbGl0eVxuICBhY2Nlc3NpYmlsaXR5VGV4dDogc3RyaW5nID0gbnVsbDtcbiAgYWNjZXNzaWJpbGl0eVByaW9yaXR5ID0gMjtcbiAgYWNjZXNzaWJpbGl0eUlkOiBudW1iZXIgPSBudWxsO1xuXG4gIHByb3RlY3RlZCBsb2FkRm9udHMoKSB7XG4gICAgY29uc3QgZm9udHMgPSBbdGhpcy5mb250XS5jb25jYXQodGhpcy5mb250c0Zyb21DaGFyYWN0ZXJTdHlsZXModGhpcy5zdHlsZSkpO1xuICAgIEZvbnRMb2FkZXIubG9hZCh0aGlzLCBmb250cyk7XG4gIH1cblxuICAvL2NhbGxlZCB3aGVuIHRleHQgaXMgcmVuZGVyZWRcbiAgY29tcGxldGUoKSB7XG4gICAgLy9wbGFjZWhvbGRlclxuICB9XG5cbiAgLy9jYWxsZWQgd2hlbiBmb250IGhhcyBsb2FkZWRcbiAgZm9udExvYWRlZCgpIHtcbiAgICB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgLy9jYWxsIHN0YWdlLnVwZGF0ZSB0byByZW5kZXIgY2FudmFzXG4gIC8vb3ZlcmxvYWQgdG8gc3VwcG9ydCBkZWZlcnJlZCByZW5kZXJpbmdcbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuc3RhZ2UudXBkYXRlKCk7XG4gIH1cblxuICBhYnN0cmFjdCBsYXlvdXQoKTtcblxuICBhZGRBY2Nlc3NpYmlsaXR5KCkge1xuICAgIEFjY2Vzc2liaWxpdHkuc2V0KHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb250c0Zyb21DaGFyYWN0ZXJTdHlsZXMoc3R5bGVzKSB7XG4gICAgY29uc3Qgc3R5bGVGb250cyA9IFtdO1xuICAgIGlmIChzdHlsZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChzdHlsZXNbaV0gIT0gdW5kZWZpbmVkICYmIHN0eWxlc1tpXS5mb250ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN0eWxlRm9udHMucHVzaChzdHlsZXNbaV0uZm9udCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlRm9udHM7XG4gIH1cblxuICBnZXRDaGFyQ29kZUF0KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmNoYXJhY3RlckNhc2UgPT0gQ2FzZS5OT1JNQUwpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQuY2hhckF0KGluZGV4KS5jaGFyQ29kZUF0KDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaGFyYWN0ZXJDYXNlID09IENhc2UuVVBQRVIpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHRcbiAgICAgICAgLmNoYXJBdChpbmRleClcbiAgICAgICAgLnRvVXBwZXJDYXNlKClcbiAgICAgICAgLmNoYXJDb2RlQXQoMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoYXJhY3RlckNhc2UgPT0gQ2FzZS5MT1dFUikge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dFxuICAgICAgICAuY2hhckF0KGluZGV4KVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAuY2hhckNvZGVBdCgwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhcmFjdGVyQ2FzZSA9PSBDYXNlLlNNQUxMX0NBUFMpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHRcbiAgICAgICAgLmNoYXJBdChpbmRleClcbiAgICAgICAgLnRvVXBwZXJDYXNlKClcbiAgICAgICAgLmNoYXJDb2RlQXQoMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vZmFsbGJhY2sgY2FzZSBmb3IgdW5rbm93bi5cbiAgICAgIHJldHVybiB0aGlzLnRleHQuY2hhckF0KGluZGV4KS5jaGFyQ29kZUF0KDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IHRoaXMgY29kZSBuZWVkcyB1bml0IHRlc3RzIGJlZm9yZSBpdCBnZXRzIGNoYW5nZWQgYW55IGZ1cnRoZXJcbiAgLyoqXG4gICAqIEZpZ3VyZSBvdXQgaG93IG1hbnkgY2hhcmFjdGVycyBhIGxpZ2F0dXJlIGNvdmVycyxcbiAgICogYW5kIHN3YXAgY2hhcmFjdGVyIGdseXBoXG4gICAqIEBwYXJhbSBjaGFyXG4gICAqIEBwYXJhbSBsaWdUYXJnZXRcbiAgICovXG4gIHByb3RlY3RlZCBsaWdhdHVyZVN3YXAoY2hhcjogQ2hhcmFjdGVyLCBsaWdUYXJnZXQ6IHN0cmluZykge1xuICAgIGxldCBhZHZhbmNlQnkgPSAwO1xuICAgIGNvbnN0IGZpcnN0Q2hhciA9IGxpZ1RhcmdldC5jaGFyQXQoMCk7XG4gICAgY29uc3QgZmlyc3RMaWdhdHVyZSA9IGNoYXIuX2ZvbnQubGlnYXR1cmVzW2ZpcnN0Q2hhcl07XG4gICAgLy8xIGNoYXIgbWF0Y2hcbiAgICBpZiAoZmlyc3RMaWdhdHVyZSkge1xuICAgICAgLy8yIGNoYXIgbWF0Y2hcbiAgICAgIGlmIChmaXJzdExpZ2F0dXJlW2xpZ1RhcmdldC5jaGFyQXQoMSldKSB7XG4gICAgICAgIC8vMyBjaGFyIG1hdGNoXG4gICAgICAgIGlmIChmaXJzdExpZ2F0dXJlW2xpZ1RhcmdldC5jaGFyQXQoMSldW2xpZ1RhcmdldC5jaGFyQXQoMildKSB7XG4gICAgICAgICAgLy80IGNoYXIgbWF0Y2hcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmaXJzdExpZ2F0dXJlW2xpZ1RhcmdldC5jaGFyQXQoMSldW2xpZ1RhcmdldC5jaGFyQXQoMildW1xuICAgICAgICAgICAgICBsaWdUYXJnZXQuY2hhckF0KDMpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvL3N3YXAgNCBjaGFyIGxpZ2F0dXJlXG4gICAgICAgICAgICBjaGFyLnNldEdseXBoKFxuICAgICAgICAgICAgICBmaXJzdExpZ2F0dXJlW2xpZ1RhcmdldC5jaGFyQXQoMSldW2xpZ1RhcmdldC5jaGFyQXQoMildW1xuICAgICAgICAgICAgICAgIGxpZ1RhcmdldC5jaGFyQXQoMylcbiAgICAgICAgICAgICAgXS5nbHlwaFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGFkdmFuY2VCeSA9IDM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vc3dhcCAzIGNoYXIgbGlnYXR1cmVcbiAgICAgICAgICAgIGNoYXIuc2V0R2x5cGgoXG4gICAgICAgICAgICAgIGZpcnN0TGlnYXR1cmVbbGlnVGFyZ2V0LmNoYXJBdCgxKV1bbGlnVGFyZ2V0LmNoYXJBdCgyKV0uZ2x5cGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhZHZhbmNlQnkgPSAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL3N3YXAgMiBjaGFyIGxpZ2F0dXJlXG4gICAgICAgICAgY2hhci5zZXRHbHlwaChmaXJzdExpZ2F0dXJlW2xpZ1RhcmdldC5jaGFyQXQoMSldLmdseXBoKTtcbiAgICAgICAgICBhZHZhbmNlQnkgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhZHZhbmNlQnk7XG4gIH1cbn1cbiJdfQ==