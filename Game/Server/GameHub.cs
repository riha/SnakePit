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

        public Task ValidateMove(Point[] parts)
        {
            if (IsBorderCollision(parts[0]))
                return Clients["foo"].borderCollision();

            if (IsSelfCollision(parts))
                return Clients["foo"].selfCollision();

            return Clients["foo"].ok();
        }

        private bool IsBorderCollision(Point headPosition)
        {
            return headPosition.X >= maxWidth
                   || headPosition.Y >= maxHeight
                   || headPosition.Y < 0
                   || headPosition.X < 0
                   ;
        }

        private bool IsSelfCollision(Point[] parts)
        {
            var headPosition = parts[0];

            return parts.Skip(1).Any(point => point.X == headPosition.X && point.Y == headPosition.Y);
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