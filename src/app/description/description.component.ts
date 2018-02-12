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
  dates: any[][] = [];
  nextDate: Date;
  locale: string;
  type: string;

  constructor(private dataService: DataService) {
    // Get locale from data service
    this.locale = dataService.locale;

    // Get sectors description 
    this.descriptionTitle = dataService.sectors[0].name;
    this.descriptionBoundary = dataService.sectors[0].boundary;
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = dataService.sectors[id].name;
        this.descriptionBoundary = dataService.sectors[id].boundary;
      }
    );

    // Build array with dates and types
    dataService.dates.forEach(sector => {
      for (let key in sector) {
        sector[key].forEach(term => {
          this.dates.push([new Date(term.term), term.type]);
        });
      }
    });
    let sortedDates = this.dates.filter(x => +x[0] > Date.now());
    this.nextDate = sortedDates[0][0];
    this.type = sortedDates[0][1];
    if (this.type === 'MIXED') {
      this.type = 'Zmieszane';
    } else if (this.type === 'SEGREGATED') {
      this.type = 'Segregowalne';
    } else if (this.type === 'BIO') {
      this.type = 'Biodegradowalne';
    }
    // console.log(sortedDates[0][1]);
    

    // this.nextDate = new Date(Math.min.apply(Math, this.dates.filter(x => +x > Date.now())));

    // TODO: Add garbage type

  }

  ngOnInit() {
  }

}
