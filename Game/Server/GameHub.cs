using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalR.Hubs;

namespace SnakePit.Game.Server
{

    public class GameHub : Hub, IDisconnect
    {
        private int maxWidth = 25; //TODO: should be set at init
        private int maxHeight = 25; //TODO: should be set at init

        public Task Join()
        {
            return Groups.Add(Context.ConnectionId, "foo");
        }

        public bool ValidateMove(Point[] parts)
        {
            if (IsBorderCollision(parts[0]))
            {
                Clients["foo"].borderCollision();
                return false;
            }

            if (IsSelfCollision(parts))
            {
                Clients["foo"].selfCollision();
                return false;
            }

            return true;
        }

        public Task CheckFoodCollision(Point part)
        {
            return FoodStore.test["foo"] == part
                ? Clients["foo"].foodCollision()
                : Clients["foo"].noFood();
        }

        private bool IsBorderCollision(Point headPosition)
        {
            return headPosition.X >= maxWidth
                   || headPosition.Y >= maxHeight
                   || headPosition.Y < 0
                   || headPosition.X < 0;
        }

        private static bool IsSelfCollision(IList<Point> parts)
        {
            var headPosition = parts[0];

            return parts.Skip(1).Any(point => point.X == headPosition.X && point.Y == headPosition.Y);
        }

        public Task CalculateFoodPosition()
        {
            //TODO: Måste kontrollera att den inte skapas i ormen!
            var r = new Random((int)DateTime.Now.Ticks);
            var x = r.Next(0, 25);
            var y = r.Next(0, 25);
            var point = new Point(x, y);
            //foods.Add("foo", point);
            FoodStore.AddFood("foo", point);
            return Clients["foo"].foodPosition(point);
            //return null; // new Point((x * 490 / 20 * 20), (y * 490 / 20 * 20));
        }

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

        public Task Disconnect()
        {
            return Clients["foo"].leave(Context.ConnectionId);
        }
    }
}