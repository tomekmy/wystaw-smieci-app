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
    let sortedDates = dataService.outputDates.filter(dates => +dates.term > Date.now());
    // Get locale from data service
    this.locale = dataService.locale;

    // Get selected sectors description
    this.descriptionTitle = dataService.sectors[0].name;
    this.descriptionBoundary = dataService.sectors[0].boundary;
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = dataService.sectors[id].name;
        this.descriptionBoundary = dataService.sectors[id].boundary;

        // Get nearest garbage collection date

        if (id === 0) {
          sortedDates = dataService.outputDates.filter(dates => +dates.term > Date.now());
          console.log(sortedDates);
        } else {
          sortedDates = dataService.outputDates.filter(dates => {
            if (dates.sector === 'yellow') {
              dates.sector = 'gold';
            }
            return +dates.term > Date.now() && dates.sector === dataService.sectors[id].value;
          });
        }
        this.nextDate = sortedDates[0].term;
        this.type = sortedDates[0].type;
      }
    );
    this.nextDate = sortedDates[0].term;
    this.type = sortedDates[0].type;
  }

  ngOnInit() {
  }

}
