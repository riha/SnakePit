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

        public void Setup(Point[] parts)
        {
            Clients["foo"].generateNewFood(CalculateFoodPosition(parts));
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

        public void CheckFoodCollision(IList<Point> parts)
        {
            if(FoodStore.Food["foo"].Equals(parts[0]))
                Clients["foo"].generateNewFood(CalculateFoodPosition(parts));
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
            
            //We start on the third parts as the head can't collide with the first two parts
            return parts.Skip(2).Any(point => point.X == headPosition.X && point.Y == headPosition.Y);
        }

        private static Point CalculateFoodPosition(ICollection<Point> parts)
        {
            Point point;

            do
            {
                var random = new Random((int)DateTime.Now.Ticks);
                point = new Point(random.Next(0, 24), random.Next(0, 24));
                
            } while (parts.Contains(point)); //To make sure we don't generate food at the current position of any aprts of the snake

            FoodStore.Food.AddOrUpdate("foo", point, (key, value) => point);

            return point;
        }

        //    self.checkSelfCollision = function () {
        //        
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