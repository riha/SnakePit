var Snake = function (startPoint, context, grid) {
    var self = this;

    self.position = currentHeadPoint = startPoint;

    //Parts array contains all x, y positions for each part.
    //Initiates with the starting position of the snake head. 
    var parts = [startPoint];

    //Sets the initial parts and initial length of the snake.
    setParts(14);

    function setParts(numberOfStartParts) {
        var x = startPoint.x;

        for (var i = 0; i < numberOfStartParts; i++) {
            x -= 20;
            parts.push(new Point(x, startPoint.y));
        };
    };

    function setPosition(direction) {
        currentHeadPoint.x += direction.x * 20;
        currentHeadPoint.y += direction.y * 20;
    }

    self.grow = function () {
        setParts(1);
    }

    self.parts = function () {
        var relativeParts = [];
        for (var i = 0; i < parts.length; i++) {
            relativeParts.push(grid.getGridPosition(parts[i]));
        }

        return relativeParts;
    };

    function shouldDraw(lastRun) {
        if (lastDraw === undefined)
            return true;

        return (lastRun - lastDraw > 80);
    };

    var lastDraw = undefined;
    self.draw = function (direction, lastRun) {

        if (lastDraw === undefined) {
            lastDraw = lastRun;
            //console.log("first run")
        }

        if (shouldDraw(lastRun)) {
            context.save();
            context.fillStyle = "#000";
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'rgba(0, 0, 0, 0.2)';
            
            //Loop the array from last part to first (first being the head). For each position we give it one "in front of it". 
            //The first one in the array (the head) we'll give the new caluclated position
            for (var i = parts.length - 1; i >= 0; i--) {
                if (i == 0) {
                    setPosition(direction);
                    parts[i] = new Point(currentHeadPoint.x, currentHeadPoint.y);
                    //console.log("head", 0, parts[0]);
                }
                else {
                    parts[i] = new Point(parts[i - 1].x, parts[i - 1].y);
                    //console.log("part ", i, parts[i]);
                }
                //console.log("part last", i, " ", parts[i]);
            };

            context.clearRect(parts[parts.length - 1].x, parts[parts.length - 1].y, 20, 20);
            roundRect(context, parts[0].x, parts[0].y, 18, 18, 7, true, false)

            context.restore();
            lastDraw = Date.now();
            return true;
        };

        return false;
    };

    //    self.checkSelfCollision = function () {
    //        //We start on the third parts as the head can't collide with the first two parts
    //        for (var i = 3; i < parts.length - 1; i++) {
    //            var partPosition = parts[i];
    //            if (grid.getGridPosition(partPosition).equal(grid.getGridPosition(self.position))) {
    //                //console.log("crash");
    //                return true;
    //                break;
    //            };
    //        };
    //        return false;
    //    };

    //    self.checkBorderCollision = function () {
    //        var relativePosition = grid.getGridPosition(self.position);
    //        if (relativePosition.x >= grid.maxWidth
    //                || relativePosition.y >= grid.maxHeight
    //                || relativePosition.y < 0
    //                || relativePosition.x < 0)
    //            return true;

    //        return false;
    //    };

    //    self.checkFoodCollision = function (food) {
    //        if (grid.getGridPosition(food.position).equal(grid.getGridPosition(self.position)))
    //            return true;

    //        return false;
    //    };

};