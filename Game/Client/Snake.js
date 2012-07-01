var Snake = function (startPoint, context, grid) {
    var self = this;
    self.currentHeadPoint = startPoint;

    //Parts array contains all x, y positions for each part.
    //Initiates with the starting position of the snake head. 
    self.parts = [startPoint];

    //Sets the initial parts and initial length of the snake.
    addParts(14);

    function addParts(numberParts) {
        console.log("Adding number of parts to snake", numberParts);

        var x = startPoint.x;

        for (var i = 0; i < numberParts; i++) {
            x -= 1;
            self.parts.push(new Point(x, startPoint.y));
        }
    }

    function setHeadPosition(direction) {
        self.currentHeadPoint.x += direction.x * 1;
        self.currentHeadPoint.y += direction.y * 1;
    }

    self.grow = function () {
        addParts(1);
    };

    function shouldDraw(lastRun) {
        if (lastDraw === undefined) {
            return true;
        }

        return (lastRun - lastDraw > 80);
    }

    var lastDraw;
    self.draw = function (direction, lastRun) {

        if (lastDraw === undefined) {
            lastDraw = lastRun;
        }

        if (shouldDraw(lastRun)) {

            context.save();
            context.fillStyle = "#000";
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'rgba(0, 0, 0, 0.2)';

            //Loop the array from last part to first (first being the head). For each position we give it one "in front of it". 
            //The first one in the array (the head) we'll give the new caluclated position
            for (var i = self.parts.length - 1; i >= 0; i--) {
                if (i === 0) {
                    setHeadPosition(direction);
                    self.parts[i] = new Point(self.currentHeadPoint.x, self.currentHeadPoint.y);
                    //console.log("head", 0, self.parts[0]);
                }
                else {
                    self.parts[i] = new Point(self.parts[i - 1].x, self.parts[i - 1].y);
                    //console.log("part ", i, self.parts[i]);
                }
                //console.log("part last", i, " ", self.parts[i]);
            }

            context.clearRect(self.parts[self.parts.length - 1].toFixed().x, self.parts[self.parts.length - 1].toFixed().y, 20, 20);
            roundRect(context, self.parts[0].toFixed().x, self.parts[0].toFixed().y, 18, 18, 7, true, false);

            context.restore();
            lastDraw = Date.now();

            //console.log("Draw snake at x:", self.currentHeadPoint.x, " y:", self.currentHeadPoint.y);

            return true;
        }

        return false;
    };
};