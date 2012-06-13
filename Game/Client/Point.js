var Point = function (x, y) {
    var self = this;
    self.x = x;
    self.y = y;

    self.equal = function (pointToCompare) {
        if (self.x == pointToCompare.x
        && self.y == pointToCompare.y)
            return true;

        return false;
    }
};