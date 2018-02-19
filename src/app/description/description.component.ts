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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Default sorted dates
    let sortedDates = this.dataService.getDates().filter(dates => +dates.term > Date.now());
    sortedDates = sortedDates.sort((a, b) =>  a.term - b.term);
    // Get locale from data service
    this.locale = this.dataService.getLocale();

    // Get selected sectors description
    this.descriptionTitle = this.dataService.getSectors()[0].name;
    this.descriptionBoundary = this.dataService.getSectors()[0].boundary;
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = this.dataService.getSectors()[id].name;
        this.descriptionBoundary = this.dataService.getSectors()[id].boundary;

        // Get nearest garbage collection date
        if (id === 0) {
          sortedDates = this.dataService.getDates().filter(dates => dates.term > Date.now());
        } else {
          sortedDates = this.dataService.getDates().filter(dates => {
            if (dates.sector === 'yellow') {
              dates.sector = 'gold';
            }
            return +dates.term > Date.now() && dates.sector === this.dataService.getSectors()[id].value;
          });
        }

        // Sort dates from min to max
        sortedDates = sortedDates.sort((a, b) =>  a.term - b.term);
        this.nextDate = sortedDates[0].term;
        this.type = sortedDates[0].type;
      }
    );
    this.nextDate = sortedDates[0].term;
    this.type = sortedDates[0].type;
  }
}
