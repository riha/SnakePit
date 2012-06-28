var Grid = function (context) {
    var self = this;
    var shouldShowGrid = false;

    self.maxWidth = maxWidth = 25;
    self.maxHeight = maxHeight = 25;

    context.save();
    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(350, 0);
    context.quadraticCurveTo(250, 250, 200, 500);
    context.lineTo(30, 500);
    context.quadraticCurveTo(80, 80, 100, 0);
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.fill();
    context.restore();

    if (shouldShowGrid) {
        context.save();
        context.strokeStyle = "#ccc";

        for (var y = 0; y <= maxWidth; y++) {
            context.moveTo(y * 20, 0);
            context.lineTo(y * 20, context.canvas.height);
            context.stroke();
        }
        for (var x = 0; x <= maxHeight; x++) {
            context.moveTo(0, x * 20);
            context.lineTo(context.canvas.width, x * 20);
            context.stroke();
        }
        context.restore();
    }
};