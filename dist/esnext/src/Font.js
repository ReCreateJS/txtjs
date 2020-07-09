var Font = /** @class */ (function () {
    function Font() {
        this.glyphs = {};
        this.kerning = {};
        this.top = 0;
        this.middle = 0;
        this.bottom = 0;
        this.units = 1000;
        this.ligatures = {};
        this.loaded = false;
        this.targets = [];
    }
    Font.prototype.cloneGlyph = function (target, from) {
        if (this.glyphs[target] == undefined && this.glyphs[from] != undefined) {
            this.glyphs[target] = this.glyphs[from];
            this.kerning[target] = this.kerning[from];
        }
    };
    return Font;
}());
export default Font;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Gb250LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQUE7UUFDRSxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFNbEIsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFHcEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBYSxFQUFFLENBQUM7SUFTekIsQ0FBQztJQU5DLHlCQUFVLEdBQVYsVUFBVyxNQUFjLEVBQUUsSUFBWTtRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUExQkQsSUEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb250IHtcbiAgZ2x5cGhzOiBhbnkgPSB7fTtcbiAga2VybmluZzogYW55ID0ge307XG4gIG1pc3Npbmc6IG51bWJlcjtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIGRlZmF1bHQ6IG51bWJlcjtcbiAgZGVzY2VudDogbnVtYmVyO1xuICBhc2NlbnQ6IG51bWJlcjtcbiAgdG9wID0gMDtcbiAgbWlkZGxlID0gMDtcbiAgYm90dG9tID0gMDtcbiAgdW5pdHMgPSAxMDAwO1xuICBpZDogc3RyaW5nO1xuICBsaWdhdHVyZXM6IGFueSA9IHt9O1xuICBwYW5vc2U6IHN0cmluZztcbiAgYWxwaGFiZXRpYzogc3RyaW5nO1xuICBsb2FkZWQgPSBmYWxzZTtcbiAgdGFyZ2V0czogbnVtYmVyW10gPSBbXTtcbiAgbG9hZGVyOiBYTUxIdHRwUmVxdWVzdDtcblxuICBjbG9uZUdseXBoKHRhcmdldDogbnVtYmVyLCBmcm9tOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5nbHlwaHNbdGFyZ2V0XSA9PSB1bmRlZmluZWQgJiYgdGhpcy5nbHlwaHNbZnJvbV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmdseXBoc1t0YXJnZXRdID0gdGhpcy5nbHlwaHNbZnJvbV07XG4gICAgICB0aGlzLmtlcm5pbmdbdGFyZ2V0XSA9IHRoaXMua2VybmluZ1tmcm9tXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==