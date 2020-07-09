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
var Word = /** @class */ (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.hasNewLine = false;
        _this.hasHyphen = false;
        _this.hasSpace = false;
        _this.spaceOffset = 0;
        return _this;
    }
    //CharacterText support
    Word.prototype.lastCharacter = function () {
        return this.children[this.children.length - 1];
    };
    return Word;
}(createjs.Container));
export default Word;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Xb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFrQyx3QkFBa0I7SUFRbEQ7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFURCxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsaUJBQVcsR0FBRyxDQUFDLENBQUM7O0lBSWhCLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsNEJBQWEsR0FBYjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQWMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFoQkQsQ0FBa0MsUUFBUSxDQUFDLFNBQVMsR0FnQm5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENoYXJhY3RlciBmcm9tIFwiLi9DaGFyYWN0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZCBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGhhc05ld0xpbmUgPSBmYWxzZTtcbiAgaGFzSHlwaGVuID0gZmFsc2U7XG4gIGhhc1NwYWNlID0gZmFsc2U7XG4gIG1lYXN1cmVkV2lkdGg6IG51bWJlcjtcbiAgbWVhc3VyZWRIZWlnaHQ6IG51bWJlcjtcbiAgc3BhY2VPZmZzZXQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvL0NoYXJhY3RlclRleHQgc3VwcG9ydFxuICBsYXN0Q2hhcmFjdGVyKCk6IENoYXJhY3RlciB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXSBhcyBDaGFyYWN0ZXI7XG4gIH1cbn1cbiJdfQ==