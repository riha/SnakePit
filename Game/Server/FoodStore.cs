using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnakePit.Game.Server
{
    public static class FoodStore
    {
        public static readonly Dictionary<string, Point> test = new Dictionary<string, Point>();

        public static void AddFood(string key, Point p)
        {
            if (test.ContainsKey(key))
            {
                test[key] = p;
            }
            else
            {
                test.Add(key, p);
            }
        }
    }
}