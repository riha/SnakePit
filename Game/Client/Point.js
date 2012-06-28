var Point = function (x, y) {
    var self = this;
    self.x = x;
    self.y = y;

    self.toFixed = function () {
        return new Point(self.x * 20, self.y * 20)
    };

//    self.toRelative = function () {
//        return new Point(self.x / 25, self.y / 25)
//    };


    //    self.equal = function (pointToCompare) {
    //        if (self.x == pointToCompare.x
    //        && self.y == pointToCompare.y)
    //            return true;

    //        return false;
    //    }
};