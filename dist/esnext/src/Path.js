export var PathFit;
(function (PathFit) {
    PathFit[PathFit["Rainbow"] = 0] = "Rainbow";
    PathFit[PathFit["Stairstep"] = 1] = "Stairstep";
})(PathFit || (PathFit = {}));
export var PathAlign;
(function (PathAlign) {
    PathAlign[PathAlign["Center"] = 0] = "Center";
    PathAlign[PathAlign["Right"] = 1] = "Right";
    PathAlign[PathAlign["Left"] = 2] = "Left";
})(PathAlign || (PathAlign = {}));
var Path = /** @class */ (function () {
    function Path(path, start, end, flipped, fit, align) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        if (flipped === void 0) { flipped = false; }
        if (fit === void 0) { fit = PathFit.Rainbow; }
        if (align === void 0) { align = PathAlign.Center; }
        this.pathElement = null;
        this.path = null;
        this.start = 0;
        this.center = null;
        this.end = null;
        this.angles = null;
        this.flipped = false;
        this.fit = PathFit.Rainbow;
        this.align = PathAlign.Center;
        this.length = null;
        this.realLength = null;
        this.closed = false;
        this.clockwise = true;
        this.path = path;
        this.start = start;
        this.align = align;
        this.end = end;
        this.flipped = flipped;
        this.fit = fit;
        this.update();
    }
    Path.prototype.update = function () {
        this.pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.pathElement.setAttributeNS(null, "d", this.path);
        this.length = this.pathElement.getTotalLength();
        this.closed = this.path.toLowerCase().indexOf("z") != -1;
        var pointlength = this.length / 10;
        var points = [];
        points.push(this.getRealPathPoint(0));
        points.push(this.getRealPathPoint(pointlength));
        points.push(this.getRealPathPoint(pointlength * 2));
        points.push(this.getRealPathPoint(pointlength * 3));
        points.push(this.getRealPathPoint(pointlength * 4));
        points.push(this.getRealPathPoint(pointlength * 5));
        points.push(this.getRealPathPoint(pointlength * 6));
        points.push(this.getRealPathPoint(pointlength * 7));
        points.push(this.getRealPathPoint(pointlength * 8));
        points.push(this.getRealPathPoint(pointlength * 9));
        points.push(this.getRealPathPoint(pointlength * 10));
        var clock = (points[1].x - points[0].x) * (points[1].y + points[0].y) +
            (points[2].x - points[1].x) * (points[2].y + points[1].y) +
            (points[3].x - points[2].x) * (points[3].y + points[2].y) +
            (points[4].x - points[3].x) * (points[4].y + points[3].y) +
            (points[5].x - points[4].x) * (points[5].y + points[4].y) +
            (points[6].x - points[5].x) * (points[6].y + points[5].y) +
            (points[7].x - points[6].x) * (points[7].y + points[6].y) +
            (points[8].x - points[7].x) * (points[8].y + points[7].y) +
            (points[9].x - points[8].x) * (points[9].y + points[8].y) +
            (points[10].x - points[9].x) * (points[10].y + points[9].y);
        if (clock > 0) {
            this.clockwise = false;
        }
        else {
            this.clockwise = true;
        }
        if (this.end == null) {
            this.end = this.length;
        }
        if (this.closed == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.start - this.realLength / 2;
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.start - this.realLength / 2;
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
        }
        else if (this.clockwise == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.end + this.realLength / 2;
                }
                else {
                    this.realLength = this.start + this.length - this.end;
                    this.center = this.end + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.end + this.length - this.start;
                    this.center = this.start + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
        }
        else {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    this.realLength = this.end + this.length - this.start;
                    this.center = this.start + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
                else {
                    this.realLength = this.end - this.start;
                    this.center = this.start + this.realLength / 2;
                }
            }
            else {
                if (this.start > this.end) {
                    this.realLength = this.start - this.end;
                    this.center = this.end + this.realLength / 2;
                }
                else {
                    this.realLength = this.start + this.length - this.end;
                    this.center = this.end + this.realLength / 2;
                    if (this.center > this.length) {
                        this.center = this.center - this.length;
                    }
                }
            }
        }
    };
    Path.prototype.getRealPathPoint = function (distance) {
        if (distance > this.length) {
            return this.pathElement.getPointAtLength(distance - this.length);
        }
        else if (distance < 0) {
            return this.pathElement.getPointAtLength(distance + this.length);
        }
        else {
            return this.pathElement.getPointAtLength(distance);
        }
    };
    Path.prototype.getPathPoint = function (distance, characterLength, charOffset) {
        if (characterLength === void 0) { characterLength = 0; }
        if (charOffset === void 0) { charOffset = 0; }
        distance = distance * 0.99;
        characterLength = characterLength * 0.99;
        var point1;
        var point2;
        var position;
        var direction = true;
        var realStart = 0;
        if (this.closed == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart - distance;
                }
            }
        }
        else if (this.clockwise == false) {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                        position = realStart - distance;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                        position = realStart - distance;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                        position = realStart - distance;
                    }
                    if (position < 0) {
                        position = position + this.length;
                    }
                    direction = false;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                        position = realStart + distance;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                        position = realStart + distance;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                        position = realStart + distance;
                    }
                    if (position > this.length) {
                        position = position - this.length;
                    }
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
            }
        }
        else {
            if (this.flipped == false) {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                        position = realStart - distance;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                        position = realStart - distance;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                        position = realStart - distance;
                    }
                    if (position < 0) {
                        position = position + this.length;
                    }
                    direction = false;
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start - (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start - this.realLength - characterLength;
                    }
                    position = realStart - distance;
                    direction = false;
                }
            }
            else {
                if (this.start > this.end) {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                    }
                    position = realStart + distance;
                }
                else {
                    if (this.align == PathAlign.Left) {
                        realStart = this.start;
                        position = realStart + distance;
                    }
                    else if (this.align == PathAlign.Center) {
                        realStart = this.start + (this.realLength - characterLength) / 2;
                        position = realStart + distance;
                    }
                    else if (this.align == PathAlign.Right) {
                        realStart = this.start + this.realLength - characterLength;
                        position = realStart + distance;
                    }
                    if (position > this.length) {
                        position = position - this.length;
                    }
                }
            }
        }
        point1 = this.getRealPathPoint(position);
        var segment = this.pathElement.pathSegList.getItem(this.pathElement.getPathSegAtLength(position)).pathSegType;
        if (segment == 4 &&
            !direction &&
            this.pathElement.getPathSegAtLength(position) !=
                this.pathElement.getPathSegAtLength(position - charOffset)) {
            var pp0 = this.getRealPathPoint(position);
            var pp1 = this.getRealPathPoint(position - charOffset);
            var ppc = this.pathElement.pathSegList.getItem(this.pathElement.getPathSegAtLength(position) - 1);
            var d0 = Math.sqrt(Math.pow(pp0.x - ppc["x"], 2) + Math.pow(pp0.y - ppc["y"], 2));
            var d1 = Math.sqrt(Math.pow(pp1.x - ppc["x"], 2) + Math.pow(pp1.y - ppc["y"], 2));
            if (d0 > d1) {
                point1 = pp0;
                point2 = { x: ppc["x"], y: ppc["y"] };
                var rot12_1 = (Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180) /
                    Math.PI;
                if (point1.x > point2.x) {
                    rot12_1 = rot12_1 + 180;
                }
                if (rot12_1 < 0) {
                    rot12_1 = rot12_1 + 360;
                }
                if (rot12_1 > 360) {
                    rot12_1 = rot12_1 - 360;
                }
                point1.rotation = rot12_1;
                return point1;
            }
            else {
                point1 = { x: ppc["x"], y: ppc["y"] };
                point1.offsetX = -d0;
                point1["next"] = true;
                return point1;
            }
        }
        if (direction) {
            point2 = this.getRealPathPoint(position + charOffset);
        }
        else {
            point2 = this.getRealPathPoint(position - charOffset);
        }
        var rot12 = (Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180) /
            Math.PI;
        if (point1.x > point2.x) {
            rot12 = rot12 + 180;
        }
        if (rot12 < 0) {
            rot12 = rot12 + 360;
        }
        if (rot12 > 360) {
            rot12 = rot12 - 360;
        }
        point1.rotation = rot12;
        return point1;
    };
    return Path;
}());
export default Path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9QYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsMkNBQU8sQ0FBQTtJQUNQLCtDQUFTLENBQUE7QUFDWCxDQUFDLEVBSFcsT0FBTyxLQUFQLE9BQU8sUUFHbEI7QUFTRCxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLDZDQUFNLENBQUE7SUFDTiwyQ0FBSyxDQUFBO0lBQ0wseUNBQUksQ0FBQTtBQUNOLENBQUMsRUFKVyxTQUFTLEtBQVQsU0FBUyxRQUlwQjtBQUVEO0lBZUUsY0FDRSxJQUFZLEVBQ1osS0FBUyxFQUNULEdBQWtCLEVBQ2xCLE9BQWUsRUFDZixHQUE4QixFQUM5QixLQUFtQztRQUpuQyxzQkFBQSxFQUFBLFNBQVM7UUFDVCxvQkFBQSxFQUFBLFVBQWtCO1FBQ2xCLHdCQUFBLEVBQUEsZUFBZTtRQUNmLG9CQUFBLEVBQUEsTUFBZSxPQUFPLENBQUMsT0FBTztRQUM5QixzQkFBQSxFQUFBLFFBQW1CLFNBQVMsQ0FBQyxNQUFNO1FBcEI3QixnQkFBVyxHQUFtQixJQUFJLENBQUM7UUFDM0MsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFXLElBQUksQ0FBQztRQUN0QixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBVSxJQUFJLENBQUM7UUFDckIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixRQUFHLEdBQVksT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixVQUFLLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFVZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUN6Qyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNXLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFNLEtBQUssR0FDVCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoRSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRVYsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDckI7UUFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNyQjtRQUNELElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUNmLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBblpELElBbVpDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gUGF0aEZpdCB7XG4gIFJhaW5ib3csXG4gIFN0YWlyc3RlcFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhdGhQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICByb3RhdGlvbj86IG51bWJlcjtcbiAgb2Zmc2V0WD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gUGF0aEFsaWduIHtcbiAgQ2VudGVyLFxuICBSaWdodCxcbiAgTGVmdFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcbiAgcHJpdmF0ZSBwYXRoRWxlbWVudDogU1ZHUGF0aEVsZW1lbnQgPSBudWxsO1xuICBwYXRoOiBzdHJpbmcgPSBudWxsO1xuICBzdGFydCA9IDA7XG4gIGNlbnRlcjogbnVtYmVyID0gbnVsbDtcbiAgZW5kOiBudW1iZXIgPSBudWxsO1xuICBhbmdsZXM6IGFueVtdID0gbnVsbDtcbiAgZmxpcHBlZCA9IGZhbHNlO1xuICBmaXQ6IFBhdGhGaXQgPSBQYXRoRml0LlJhaW5ib3c7XG4gIGFsaWduOiBQYXRoQWxpZ24gPSBQYXRoQWxpZ24uQ2VudGVyO1xuICBsZW5ndGg6IG51bWJlciA9IG51bGw7XG4gIHJlYWxMZW5ndGg6IG51bWJlciA9IG51bGw7XG4gIGNsb3NlZCA9IGZhbHNlO1xuICBjbG9ja3dpc2UgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBzdGFydCA9IDAsXG4gICAgZW5kOiBudW1iZXIgPSBudWxsLFxuICAgIGZsaXBwZWQgPSBmYWxzZSxcbiAgICBmaXQ6IFBhdGhGaXQgPSBQYXRoRml0LlJhaW5ib3csXG4gICAgYWxpZ246IFBhdGhBbGlnbiA9IFBhdGhBbGlnbi5DZW50ZXJcbiAgKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIHRoaXMuZmxpcHBlZCA9IGZsaXBwZWQ7XG4gICAgdGhpcy5maXQgPSBmaXQ7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnBhdGhFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgICAgXCJwYXRoXCJcbiAgICApIGFzIFNWR1BhdGhFbGVtZW50O1xuICAgIHRoaXMucGF0aEVsZW1lbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJkXCIsIHRoaXMucGF0aCk7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLnBhdGhFbGVtZW50LmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgdGhpcy5jbG9zZWQgPSB0aGlzLnBhdGgudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwielwiKSAhPSAtMTtcbiAgICBjb25zdCBwb2ludGxlbmd0aCA9IHRoaXMubGVuZ3RoIC8gMTA7XG4gICAgY29uc3QgcG9pbnRzID0gW107XG5cbiAgICBwb2ludHMucHVzaCh0aGlzLmdldFJlYWxQYXRoUG9pbnQoMCkpO1xuICAgIHBvaW50cy5wdXNoKHRoaXMuZ2V0UmVhbFBhdGhQb2ludChwb2ludGxlbmd0aCkpO1xuICAgIHBvaW50cy5wdXNoKHRoaXMuZ2V0UmVhbFBhdGhQb2ludChwb2ludGxlbmd0aCAqIDIpKTtcbiAgICBwb2ludHMucHVzaCh0aGlzLmdldFJlYWxQYXRoUG9pbnQocG9pbnRsZW5ndGggKiAzKSk7XG4gICAgcG9pbnRzLnB1c2godGhpcy5nZXRSZWFsUGF0aFBvaW50KHBvaW50bGVuZ3RoICogNCkpO1xuICAgIHBvaW50cy5wdXNoKHRoaXMuZ2V0UmVhbFBhdGhQb2ludChwb2ludGxlbmd0aCAqIDUpKTtcbiAgICBwb2ludHMucHVzaCh0aGlzLmdldFJlYWxQYXRoUG9pbnQocG9pbnRsZW5ndGggKiA2KSk7XG4gICAgcG9pbnRzLnB1c2godGhpcy5nZXRSZWFsUGF0aFBvaW50KHBvaW50bGVuZ3RoICogNykpO1xuICAgIHBvaW50cy5wdXNoKHRoaXMuZ2V0UmVhbFBhdGhQb2ludChwb2ludGxlbmd0aCAqIDgpKTtcbiAgICBwb2ludHMucHVzaCh0aGlzLmdldFJlYWxQYXRoUG9pbnQocG9pbnRsZW5ndGggKiA5KSk7XG4gICAgcG9pbnRzLnB1c2godGhpcy5nZXRSZWFsUGF0aFBvaW50KHBvaW50bGVuZ3RoICogMTApKTtcblxuICAgIGNvbnN0IGNsb2NrID1cbiAgICAgIChwb2ludHNbMV0ueCAtIHBvaW50c1swXS54KSAqIChwb2ludHNbMV0ueSArIHBvaW50c1swXS55KSArXG4gICAgICAocG9pbnRzWzJdLnggLSBwb2ludHNbMV0ueCkgKiAocG9pbnRzWzJdLnkgKyBwb2ludHNbMV0ueSkgK1xuICAgICAgKHBvaW50c1szXS54IC0gcG9pbnRzWzJdLngpICogKHBvaW50c1szXS55ICsgcG9pbnRzWzJdLnkpICtcbiAgICAgIChwb2ludHNbNF0ueCAtIHBvaW50c1szXS54KSAqIChwb2ludHNbNF0ueSArIHBvaW50c1szXS55KSArXG4gICAgICAocG9pbnRzWzVdLnggLSBwb2ludHNbNF0ueCkgKiAocG9pbnRzWzVdLnkgKyBwb2ludHNbNF0ueSkgK1xuICAgICAgKHBvaW50c1s2XS54IC0gcG9pbnRzWzVdLngpICogKHBvaW50c1s2XS55ICsgcG9pbnRzWzVdLnkpICtcbiAgICAgIChwb2ludHNbN10ueCAtIHBvaW50c1s2XS54KSAqIChwb2ludHNbN10ueSArIHBvaW50c1s2XS55KSArXG4gICAgICAocG9pbnRzWzhdLnggLSBwb2ludHNbN10ueCkgKiAocG9pbnRzWzhdLnkgKyBwb2ludHNbN10ueSkgK1xuICAgICAgKHBvaW50c1s5XS54IC0gcG9pbnRzWzhdLngpICogKHBvaW50c1s5XS55ICsgcG9pbnRzWzhdLnkpICtcbiAgICAgIChwb2ludHNbMTBdLnggLSBwb2ludHNbOV0ueCkgKiAocG9pbnRzWzEwXS55ICsgcG9pbnRzWzldLnkpO1xuICAgIGlmIChjbG9jayA+IDApIHtcbiAgICAgIHRoaXMuY2xvY2t3aXNlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvY2t3aXNlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xvc2VkID09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5mbGlwcGVkID09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgICB0aGlzLnJlYWxMZW5ndGggPSB0aGlzLnN0YXJ0IC0gdGhpcy5lbmQ7XG4gICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlYWxMZW5ndGggPSB0aGlzLmVuZCAtIHRoaXMuc3RhcnQ7XG4gICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLnN0YXJ0ICsgdGhpcy5yZWFsTGVuZ3RoIC8gMjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPiB0aGlzLmVuZCkge1xuICAgICAgICAgIHRoaXMucmVhbExlbmd0aCA9IHRoaXMuc3RhcnQgLSB0aGlzLmVuZDtcbiAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuc3RhcnQgLSB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVhbExlbmd0aCA9IHRoaXMuZW5kIC0gdGhpcy5zdGFydDtcbiAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsb2Nrd2lzZSA9PSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMuZmxpcHBlZCA9PSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgICAgdGhpcy5yZWFsTGVuZ3RoID0gdGhpcy5zdGFydCAtIHRoaXMuZW5kO1xuICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5lbmQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVhbExlbmd0aCA9IHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCAtIHRoaXMuZW5kO1xuICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5lbmQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICAgIGlmICh0aGlzLmNlbnRlciA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuY2VudGVyIC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgICAgdGhpcy5yZWFsTGVuZ3RoID0gdGhpcy5lbmQgKyB0aGlzLmxlbmd0aCAtIHRoaXMuc3RhcnQ7XG4gICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLnN0YXJ0ICsgdGhpcy5yZWFsTGVuZ3RoIC8gMjtcbiAgICAgICAgICBpZiAodGhpcy5jZW50ZXIgPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNlbnRlciAtIHRoaXMubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlYWxMZW5ndGggPSB0aGlzLmVuZCAtIHRoaXMuc3RhcnQ7XG4gICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLnN0YXJ0ICsgdGhpcy5yZWFsTGVuZ3RoIC8gMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5mbGlwcGVkID09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgICB0aGlzLnJlYWxMZW5ndGggPSB0aGlzLmVuZCArIHRoaXMubGVuZ3RoIC0gdGhpcy5zdGFydDtcbiAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICAgIGlmICh0aGlzLmNlbnRlciA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuY2VudGVyIC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVhbExlbmd0aCA9IHRoaXMuZW5kIC0gdGhpcy5zdGFydDtcbiAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgICAgdGhpcy5yZWFsTGVuZ3RoID0gdGhpcy5zdGFydCAtIHRoaXMuZW5kO1xuICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5lbmQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVhbExlbmd0aCA9IHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCAtIHRoaXMuZW5kO1xuICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5lbmQgKyB0aGlzLnJlYWxMZW5ndGggLyAyO1xuICAgICAgICAgIGlmICh0aGlzLmNlbnRlciA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuY2VudGVyIC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVhbFBhdGhQb2ludChkaXN0YW5jZTogbnVtYmVyKTogUGF0aFBvaW50IHtcbiAgICBpZiAoZGlzdGFuY2UgPiB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aEVsZW1lbnQuZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSAtIHRoaXMubGVuZ3RoKTtcbiAgICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aEVsZW1lbnQuZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSArIHRoaXMubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aEVsZW1lbnQuZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UGF0aFBvaW50KFxuICAgIGRpc3RhbmNlOiBudW1iZXIsXG4gICAgY2hhcmFjdGVyTGVuZ3RoID0gMCxcbiAgICBjaGFyT2Zmc2V0ID0gMFxuICApOiBQYXRoUG9pbnQge1xuICAgIGRpc3RhbmNlID0gZGlzdGFuY2UgKiAwLjk5O1xuICAgIGNoYXJhY3Rlckxlbmd0aCA9IGNoYXJhY3Rlckxlbmd0aCAqIDAuOTk7XG5cbiAgICBsZXQgcG9pbnQxOiBQYXRoUG9pbnQ7XG4gICAgbGV0IHBvaW50MjogUGF0aFBvaW50O1xuICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuICAgIGxldCBkaXJlY3Rpb24gPSB0cnVlO1xuICAgIGxldCByZWFsU3RhcnQgPSAwO1xuXG4gICAgaWYgKHRoaXMuY2xvc2VkID09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5mbGlwcGVkID09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCAtIGRpc3RhbmNlO1xuICAgICAgICAgIGRpcmVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5MZWZ0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uQ2VudGVyKSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0ICsgKHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aCkgLyAyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uUmlnaHQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0ICsgZGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCAtIGRpc3RhbmNlO1xuICAgICAgICAgIGRpcmVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5MZWZ0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uQ2VudGVyKSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0ICsgKHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aCkgLyAyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uUmlnaHQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0IC0gZGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2xvY2t3aXNlID09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5mbGlwcGVkID09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0IC0gZGlzdGFuY2U7XG4gICAgICAgICAgZGlyZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkxlZnQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCAtIGRpc3RhbmNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uQ2VudGVyKSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gKHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aCkgLyAyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgLSBkaXN0YW5jZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgLSBkaXN0YW5jZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uICsgdGhpcy5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRpcmVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkxlZnQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCArIGRpc3RhbmNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uQ2VudGVyKSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0ICsgKHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aCkgLyAyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgKyBkaXN0YW5jZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0ICsgdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgKyBkaXN0YW5jZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocG9zaXRpb24gPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiAtIHRoaXMubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCArICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0ICsgdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCArIGRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmZsaXBwZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPiB0aGlzLmVuZCkge1xuICAgICAgICAgIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5MZWZ0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgLSBkaXN0YW5jZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0IC0gZGlzdGFuY2U7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5SaWdodCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtIHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aDtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0IC0gZGlzdGFuY2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiArIHRoaXMubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkaXJlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkNlbnRlcikge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCAtICh0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLlJpZ2h0KSB7XG4gICAgICAgICAgICByZWFsU3RhcnQgPSB0aGlzLnN0YXJ0IC0gdGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCAtIGRpc3RhbmNlO1xuICAgICAgICAgIGRpcmVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT0gUGF0aEFsaWduLkxlZnQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5DZW50ZXIpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQgKyAodGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoKSAvIDI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5SaWdodCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydCArIHRoaXMucmVhbExlbmd0aCAtIGNoYXJhY3Rlckxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSByZWFsU3RhcnQgKyBkaXN0YW5jZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uTGVmdCkge1xuICAgICAgICAgICAgcmVhbFN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcmVhbFN0YXJ0ICsgZGlzdGFuY2U7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09IFBhdGhBbGlnbi5DZW50ZXIpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQgKyAodGhpcy5yZWFsTGVuZ3RoIC0gY2hhcmFjdGVyTGVuZ3RoKSAvIDI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCArIGRpc3RhbmNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbGlnbiA9PSBQYXRoQWxpZ24uUmlnaHQpIHtcbiAgICAgICAgICAgIHJlYWxTdGFydCA9IHRoaXMuc3RhcnQgKyB0aGlzLnJlYWxMZW5ndGggLSBjaGFyYWN0ZXJMZW5ndGg7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlYWxTdGFydCArIGRpc3RhbmNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcG9pbnQxID0gdGhpcy5nZXRSZWFsUGF0aFBvaW50KHBvc2l0aW9uKTtcbiAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5wYXRoRWxlbWVudC5wYXRoU2VnTGlzdC5nZXRJdGVtKFxuICAgICAgdGhpcy5wYXRoRWxlbWVudC5nZXRQYXRoU2VnQXRMZW5ndGgocG9zaXRpb24pXG4gICAgKS5wYXRoU2VnVHlwZTtcblxuICAgIGlmIChcbiAgICAgIHNlZ21lbnQgPT0gNCAmJlxuICAgICAgIWRpcmVjdGlvbiAmJlxuICAgICAgdGhpcy5wYXRoRWxlbWVudC5nZXRQYXRoU2VnQXRMZW5ndGgocG9zaXRpb24pICE9XG4gICAgICAgIHRoaXMucGF0aEVsZW1lbnQuZ2V0UGF0aFNlZ0F0TGVuZ3RoKHBvc2l0aW9uIC0gY2hhck9mZnNldClcbiAgICApIHtcbiAgICAgIGNvbnN0IHBwMCA9IHRoaXMuZ2V0UmVhbFBhdGhQb2ludChwb3NpdGlvbik7XG4gICAgICBjb25zdCBwcDEgPSB0aGlzLmdldFJlYWxQYXRoUG9pbnQocG9zaXRpb24gLSBjaGFyT2Zmc2V0KTtcbiAgICAgIGNvbnN0IHBwYyA9IHRoaXMucGF0aEVsZW1lbnQucGF0aFNlZ0xpc3QuZ2V0SXRlbShcbiAgICAgICAgdGhpcy5wYXRoRWxlbWVudC5nZXRQYXRoU2VnQXRMZW5ndGgocG9zaXRpb24pIC0gMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGQwID0gTWF0aC5zcXJ0KFxuICAgICAgICBNYXRoLnBvdyhwcDAueCAtIHBwY1tcInhcIl0sIDIpICsgTWF0aC5wb3cocHAwLnkgLSBwcGNbXCJ5XCJdLCAyKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgZDEgPSBNYXRoLnNxcnQoXG4gICAgICAgIE1hdGgucG93KHBwMS54IC0gcHBjW1wieFwiXSwgMikgKyBNYXRoLnBvdyhwcDEueSAtIHBwY1tcInlcIl0sIDIpXG4gICAgICApO1xuXG4gICAgICBpZiAoZDAgPiBkMSkge1xuICAgICAgICBwb2ludDEgPSBwcDA7XG4gICAgICAgIHBvaW50MiA9IHsgeDogcHBjW1wieFwiXSwgeTogcHBjW1wieVwiXSB9O1xuXG4gICAgICAgIGxldCByb3QxMiA9XG4gICAgICAgICAgKE1hdGguYXRhbigocG9pbnQyLnkgLSBwb2ludDEueSkgLyAocG9pbnQyLnggLSBwb2ludDEueCkpICogMTgwKSAvXG4gICAgICAgICAgTWF0aC5QSTtcbiAgICAgICAgaWYgKHBvaW50MS54ID4gcG9pbnQyLngpIHtcbiAgICAgICAgICByb3QxMiA9IHJvdDEyICsgMTgwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvdDEyIDwgMCkge1xuICAgICAgICAgIHJvdDEyID0gcm90MTIgKyAzNjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdDEyID4gMzYwKSB7XG4gICAgICAgICAgcm90MTIgPSByb3QxMiAtIDM2MDtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvaW50MS5yb3RhdGlvbiA9IHJvdDEyO1xuICAgICAgICByZXR1cm4gcG9pbnQxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9pbnQxID0geyB4OiBwcGNbXCJ4XCJdLCB5OiBwcGNbXCJ5XCJdIH07XG4gICAgICAgIHBvaW50MS5vZmZzZXRYID0gLWQwO1xuICAgICAgICBwb2ludDFbXCJuZXh0XCJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHBvaW50MTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICBwb2ludDIgPSB0aGlzLmdldFJlYWxQYXRoUG9pbnQocG9zaXRpb24gKyBjaGFyT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnQyID0gdGhpcy5nZXRSZWFsUGF0aFBvaW50KHBvc2l0aW9uIC0gY2hhck9mZnNldCk7XG4gICAgfVxuXG4gICAgbGV0IHJvdDEyID1cbiAgICAgIChNYXRoLmF0YW4oKHBvaW50Mi55IC0gcG9pbnQxLnkpIC8gKHBvaW50Mi54IC0gcG9pbnQxLngpKSAqIDE4MCkgL1xuICAgICAgTWF0aC5QSTtcblxuICAgIGlmIChwb2ludDEueCA+IHBvaW50Mi54KSB7XG4gICAgICByb3QxMiA9IHJvdDEyICsgMTgwO1xuICAgIH1cblxuICAgIGlmIChyb3QxMiA8IDApIHtcbiAgICAgIHJvdDEyID0gcm90MTIgKyAzNjA7XG4gICAgfVxuICAgIGlmIChyb3QxMiA+IDM2MCkge1xuICAgICAgcm90MTIgPSByb3QxMiAtIDM2MDtcbiAgICB9XG5cbiAgICBwb2ludDEucm90YXRpb24gPSByb3QxMjtcbiAgICByZXR1cm4gcG9pbnQxO1xuICB9XG59XG4iXX0=