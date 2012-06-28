using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnakePit.Game.Server
{
    public static class SharedCache
    {
        public static readonly ConcurrentDictionary<string, Point> FoodPositions = new ConcurrentDictionary<string, Point>();
        public static readonly ConcurrentDictionary<string, int> Scores = new ConcurrentDictionary<string, int>();
    }
}