using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnakePit.Game.Server
{
    public class Point
    {
        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }
        public int X { get; set; }
        public int Y { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;
            
            var p = (Point)obj;
            return (X == p.X) && (Y == p.Y);

        }

        public override int GetHashCode()
        {
            return X ^ Y;
        }
    }
}