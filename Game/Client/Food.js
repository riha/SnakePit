var Food = function (context, position) {
    var self = this;
    var thickness = 8;
    var lastDraw = undefined;
    var request;
    var degrees = 0;

    var position = position;

    //    function clear() {
    //        if (self.position != undefined) {
    //            console.log("clear;");
    //            context.save();
    //            context.translate(self.position.x + thickness, self.position.y + thickness);
    //            context.clearRect(-9, -9, thickness * 2 + 3, thickness * 2 + 3);
    //            context.restore();
    //        };
    //    };

    //    function spin() {
    //        console.log("enter spin", lastDraw)
    //        if (lastDraw == undefined || Date.now() - lastDraw > 50) {
    //            //console.log("spin food 1");
    //            degrees += 0.200;
    //            clear();
    //            draw(degrees);
    //            //console.log("spin food 2");
    //            lastDraw = Date.now();
    //        };

    //        request = requestAnimFrame(spin);
    //    };

    function draw(rotation) {
        if (rotation == undefined)
            rotation = 0;
        console.log("draw");

        context.save();
        context.translate(position.toFixed().x + thickness, position.toFixed().y + thickness);
        //context.rotate(rotation);
        context.fillStyle = "#000";

        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'rgba(0, 0, 0, 0.2)';

        roundRect(context, -8, -4, thickness * 2, thickness, 3, true, false);
        roundRect(context, -4, -8, thickness, thickness * 2, 3, true, false);

        context.fillStyle = "#AACC99";

        context.strokeStyle = "#000";
        roundRect(context, -2.5, -2.5, 5, 5, 2, true, false);
        context.restore();
    };

    //    function calculatePosition() {
    //        var position = new Point(Math.round(Math.random() * 490 / 20) * 20, Math.round(Math.random() * 490 / 20) * 20);
    //        for (var i = 0; i < snake.parts.length - 1; i++) {
    //            var part = snake.parts[i];
    //            if (part.equal(position)) {
    //                position = undefined;
    //                break;
    //            };
    //        };

    //        return position;
    //    };

    // clear();

    //    do {
    //        self.position = calculatePosition();
    //    } while (self.position == undefined);

    draw();
};