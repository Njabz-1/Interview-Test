import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Hero } from "../models/hero";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  updatedStats: string;
  heroes: Hero[];
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.getHeroes().subscribe((res) => {
      this.heroes = res as Hero[];
    });
  }

  evolveHero(hero: Hero): void {
    this.service.postHeroAction(hero).subscribe((res) => {
      console.log(res);
      // Not clear on the instructions
      // display the updated stats above the table "Hero updated with Stats", replacing the name and the stats
      // Where we supposed to update the table only or where we supposed to have the updated stats above the current table/list we already had?
      // Also it says we must replace the name, didn't quite understand what replacing the name meant. 
      this.updatedStats = `${res.name} updated with Stats: ${res.stats.map(stat => `${stat.key}: ${stat.value}`).join(", ")}`;
      const updatedHero: Hero = res;
      const index = this.heroes.findIndex(h => h.name === updatedHero.name);
      this.heroes[index] = updatedHero;
    },
      (err: any) => {
        console.error(err);
      });
  }

  private colorClasses = ['skyblue', 'teal', 'yellow', 'pink'];

  randomClass(): string {
    const index = Math.floor(Math.random() * this.colorClasses.length);
    return this.colorClasses[index];
  }
}