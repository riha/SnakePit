using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalR.Hubs;

namespace SnakePit.Game.Server
{

    public class GameHub : Hub, IDisconnect
    {
        private const int MaxWidth = 24; //TODO: should be set at init, skall också kallas Columns och Rows genomgående
        private const int MaxHeight = 24; //TODO: should be set at Setup call ...

        public Task Join()
        {
            return Groups.Add(Context.ConnectionId, "foo");
        }

        public void Setup(Point[] parts)
        {
            int i;
            Point p;
            SharedCache.Scores.TryRemove("foo", out i);
            SharedCache.FoodPositions.TryRemove("foo", out p);
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

        public bool CheckFoodCollision(IList<Point> parts)
        {
            if (SharedCache.FoodPositions["foo"].Equals(parts[0]))
            {
                var point = CalculateFoodPosition(parts);
                Clients["foo"].generateNewFood(point);

                var score = SharedCache.Scores.AddOrUpdate("foo", 1, (key, oldScore) => oldScore + 1);
                Clients["foo"].updateScore(score);

                return true;
            }

            return false;
        }

        private static bool IsBorderCollision(Point headPosition)
        {
            return headPosition.X > MaxWidth
                   || headPosition.Y > MaxHeight
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

            SharedCache.FoodPositions.AddOrUpdate("foo", point, (key, value) => point);

            return point;
        }

        public Task Disconnect()
        {
            return Clients["foo"].leave(Context.ConnectionId);
        }
    }
}