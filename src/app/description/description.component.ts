import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  // Get sector object from dataService
  sectors: Object = this.dataService.getSectors();
  // By default set descriptions to "Wszystkie" sector
  descriptionTitle: string = this.sectors[0].name;
  descriptionBoundary: string = this.sectors[0].boundary;
  nextDate: Date;
  // Get locale from dataService
  locale: string = this.dataService.getLocale();
  type: string;
  initialDates: Array<any> = [];
  sortedDates: Array<any> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Fires when finish read data from JSON file
    this.dataService.getJSON().subscribe(data => {
      this.initialDates = this.dataService.getDates(data);
      this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now()).sort((a, b) => a.term - b.term);
      this.nextDate = this.sortedDates[0].term;
      this.type = this.sortedDates[0].type;

      // Get selected sectors description
      // Check if user select any sector before
      if (localStorage.lastSelectedSector) {
        for (const key of Object.keys(this.sectors)) {
          if (this.sectors[key].value === localStorage.lastSelectedSector) {
            this.descriptionTitle = this.sectors[key].name;
            this.descriptionBoundary = this.sectors[key].boundary;

            // Get nearest garbage collection date
            if (key === '0') {
              this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now());
            } else {
              this.sortedDates = this.initialDates.filter(dates => {
                if (dates.sector === 'yellow') {
                  dates.sector = 'gold';
                }
                return +dates.term > Date.now() && dates.sector === this.sectors[key].value;
              });
            }

            // Sort dates from min to max
            this.sortedDates = this.sortedDates.sort((a, b) => a.term - b.term);
            this.nextDate = this.sortedDates[0].term;
            this.type = this.sortedDates[0].type;
          }
        }
      }
    });

    // Fires on sector change
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = this.sectors[id].name;
        this.descriptionBoundary = this.sectors[id].boundary;

        // Get nearest garbage collection date
        if (id === 0) {
          this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now());
        } else {
          this.sortedDates = this.initialDates.filter(dates => {
            if (dates.sector === 'yellow') {
              dates.sector = 'gold';
            }
            return +dates.term > Date.now() && dates.sector === this.sectors[id].value;
          });
        }

        // Sort dates from min to max
        this.sortedDates = this.sortedDates.sort((a, b) => a.term - b.term);
        this.nextDate = this.sortedDates[0].term;
        this.type = this.sortedDates[0].type;
      }
    );
  }
}
