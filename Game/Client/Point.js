var Point = function (x, y) {
    var self = this;
    self.x = x;
    self.y = y;

    self.toFixed = function () {
        return new Point(self.x * 20, self.y * 20)
    };
};