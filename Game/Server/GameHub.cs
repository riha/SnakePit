using System.Collections.Generic;
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
            {
                return Clients["foo"].borderCollision();
            }

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

        public Task Disconnect()
        {
            return Clients["foo"].leave(Context.ConnectionId);
        }
    }
}