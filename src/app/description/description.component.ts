import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  descriptionTitle: string;
  descriptionBoundary: string;
  dates: Array<Date> = [];
  nextDate: Date;

  constructor(private dataService: DataService) { 
    this.descriptionTitle = dataService.sectors[0].name;
    this.descriptionBoundary = dataService.sectors[0].boundary;
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = dataService.sectors[id].name;
        this.descriptionBoundary = dataService.sectors[id].boundary;
      }
    );

    // Build array with dates
    dataService.dates.forEach(sector => {
      for (let key in sector) {
        sector[key].forEach(term => {
          this.dates.push(new Date(term.term));
        });
      }
    });

    this.nextDate = new Date(Math.min.apply(Math, this.dates.filter(x => +x > Date.now())));

    // TODO: Add garbage type

    // console.log(nextDate);
  }

  ngOnInit() {
  }

}
