using System;
using System.Collections.Generic;

public interface IHero
{
    string name { get; set; }
    string power { get; set; }
    List<KeyValuePair<string, int>> stats { get; set; }
    void evolve(int statIncrease = 5);
}

public class Hero : IHero
{
    public string name{ get; set; }
    public string power { get; set; }
    public List<KeyValuePair<string, int>> stats { get; set; }

    public void evolve(int statIncrease = 5)
    {
        // creating a new list called updatedStats to store the updated stat values.
        var updatedStats = new List<KeyValuePair<string, int>>();
        foreach (var stat in stats)
        {
            var originalValue = stat.Value;
            var incrementValue = originalValue / 2;
            updatedStats.Add(new KeyValuePair<string, int>(stat.Key, (int)(originalValue + incrementValue)));
        }
        stats = updatedStats;
    }
}