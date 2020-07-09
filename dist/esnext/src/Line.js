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
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super.call(this) || this;
    }
    //Text support
    Line.prototype.lastWord = function () {
        return this.children[this.children.length - 1];
    };
    //CharacterText support
    Line.prototype.lastCharacter = function () {
        return this.children[this.children.length - 1];
    };
    return Line;
}(createjs.Container));
export default Line;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9MaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQUFrQyx3QkFBa0I7SUFJbEQ7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFFRCxjQUFjO0lBQ2QsdUJBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQVMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLDRCQUFhLEdBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFjLENBQUM7SUFDOUQsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBakJELENBQWtDLFFBQVEsQ0FBQyxTQUFTLEdBaUJuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkIGZyb20gXCIuL1dvcmRcIjtcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vQ2hhcmFjdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBtZWFzdXJlZFdpZHRoOiBudW1iZXI7XG4gIG1lYXN1cmVkSGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8vVGV4dCBzdXBwb3J0XG4gIGxhc3RXb3JkKCk6IFdvcmQge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMV0gYXMgV29yZDtcbiAgfVxuXG4gIC8vQ2hhcmFjdGVyVGV4dCBzdXBwb3J0XG4gIGxhc3RDaGFyYWN0ZXIoKTogQ2hhcmFjdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdIGFzIENoYXJhY3RlcjtcbiAgfVxufVxuIl19