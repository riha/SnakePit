using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnakePit.Game.Server
{
    public static class FoodStore
    {
        public static readonly ConcurrentDictionary<string, Point> Food = new ConcurrentDictionary<string, Point>();

        //public static void AddFood(string key, Point p)
        //{
        //    if (Food.ContainsKey(key))
        //    {
        //        Food[key] = p;
        //    }
        //    else
        //    {
        //        Food.Add(key, p);
        //    }
        //}
    }
}