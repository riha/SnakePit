var Food = function (context, position) {
    var self = this;
    var thickness = 8;
    var lastDraw;
    var request;
    var degrees = 0;

    self.remove = function () {
        //console.log("Removing food!");
        clear();
        cancelRequestAnimFrame(request);
    };

    function clear() {
        context.save();
        context.translate(position.toFixed().x + thickness + 3, position.toFixed().y + thickness + 1);
        context.clearRect(-9, -9, 20, 20);
        context.restore();
    }

    function spin() {
        //console.log("enter spin", lastDraw)
        if (lastDraw === undefined || Date.now() - lastDraw > 80) {
            //console.log("Draw rotated food");
            degrees += 0.300;
            clear();
            draw(degrees);
            //console.log("spin food 2");
            lastDraw = Date.now();
        }

        request = requestAnimFrame(spin);
    }

    function draw(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }

        context.save();
        context.translate(position.toFixed().x + thickness + 3, position.toFixed().y + thickness + 1);
        context.rotate(rotation);
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
    }

    spin();
};