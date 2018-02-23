import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
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
  initialDates = [];
  sortedDates = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Get locale from data service
    this.locale = this.dataService.getLocale();

    // Get selected sectors description
    this.descriptionTitle = this.dataService.getSectors()[0].name;
    this.descriptionBoundary = this.dataService.getSectors()[0].boundary;

    // Default sorted dates
    this.dataService.getJSON().subscribe(data => {
      this.initialDates = this.dataService.getDates(data);
      this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now()).sort((a, b) =>  a.term - b.term);
      this.nextDate = this.sortedDates[0].term;
      this.type = this.sortedDates[0].type;
    });

    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = this.dataService.getSectors()[id].name;
        this.descriptionBoundary = this.dataService.getSectors()[id].boundary;

        // Get nearest garbage collection date
        if (id === 0) {
          this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now());
        } else {
          this.sortedDates = this.initialDates.filter(dates => {
            if (dates.sector === 'yellow') {
              dates.sector = 'gold';
            }
            return +dates.term > Date.now() && dates.sector === this.dataService.getSectors()[id].value;
          });
        }

        // Sort dates from min to max
        this.sortedDates = this.sortedDates.sort((a, b) =>  a.term - b.term);
        this.nextDate = this.sortedDates[0].term;
        this.type = this.sortedDates[0].type;
      }
    );
  }
}
