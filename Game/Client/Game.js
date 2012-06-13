var Game = function () {
    //console.log("Start")
    var shouldCheckBorderCollision = true;
    var self = this;
    var snake1;
    var direction = Directions.Right;
    var lastDirection;
    var canvas;
    var gridContext;
    var snakeContext;
    var foodContext;
    var request;
    var lastRun = undefined;
    console.log("Init")

    $(window).bind('keydown', function (event) {
        if (event.keyCode == KeyCodeEnum.Left && lastDirection != Directions.Right)
            direction = Directions.Left;
        else if (event.keyCode == KeyCodeEnum.Up && lastDirection != Directions.Down) {
            direction = Directions.Up;
        }
        else if (event.keyCode == KeyCodeEnum.Right && lastDirection != Directions.Left) {
            direction = Directions.Right;
        }
        else if (event.keyCode == KeyCodeEnum.Down && lastDirection != Directions.Up) {
            direction = Directions.Down
        };
    });

    snakeContext = $("#snake").get(0).getContext('2d');
    foodContext = $("#food").get(0).getContext('2d');
    gridContext = $("#grid").get(0).getContext('2d');

    var grid = new Grid(gridContext);
    snake1 = new Snake(new Point(100, 40), snakeContext, grid);
    var food = new Food(foodContext, snake1);

    (function gameLoop() {
        lastRun = Date.now();

        //TODO: Start by calculating new position, then do all test - if everythings ok draw the new position
        if (snake1.draw(direction, lastRun)) {
            lastDirection = direction;
            if (snake1.checkSelfCollision() || snake1.checkBorderCollision()) {
                gameOver();
            } else {
                if (snake1.checkFoodCollision(food)) {
                    snake1.grow();
                    //food.clear();
                    food = new Food(foodContext, snake1);
                }

                request = requestAnimFrame(gameLoop);
            }
        } else {
            request = requestAnimFrame(gameLoop);
        }
    })();

    function gameOver() {
        //console.log(request);
        cancelRequestAnimFrame(request);
    };
};