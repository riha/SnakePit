using System.Threading.Tasks;
using SignalR.Hubs;

namespace SnakePit.Game.Server
{
   
    public class GameHub : Hub, IDisconnect
    {
        public Task Join()
        {
            return Groups.Add(Context.ConnectionId, "foo");
        }

        //public Task Move(Direction direction)
        //{
        //    if(direction == Direction.Left)
        //        return Clients["foo"].crash();

        //    return Clients["foo"].ok();
        //}

        public Task Disconnect()
        {
            return Clients["foo"].leave(Context.ConnectionId);
        }
    }
}