import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  // Get sector object from dataService
  sectors: {value: string, viewValue: string, name: string, boundary: string}[] = this.dataService.getSectors();
  // By default set descriptions to "Wszystkie" sector
  descriptionTitle: string = this.sectors[0].name;
  descriptionBoundary: string = this.sectors[0].boundary;
  nextDate: Date;
  // Get locale from dataService
  locale: string = this.dataService.getLocale();
  type: string;
  // Initial dates array to store dates from dataService.getDates()
  initialDates: {sector: string, term: Date, type: string}[] = [];
  // sorted dates array to grab nearest garbage collection
  sortedDates: {sector: string, term: Date, type: string}[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Fires on component init. when finish read data from JSON file
    this.dataService.getJSON().subscribe(data => {
      // Store initial dates once to filter and sort on different sectors is selected
      this.initialDates = this.dataService.getDates(data);
      // Default next garbage collection date and type - for "Wszystkie"
      this.sortedDates = this.initialDates.filter(dates => +dates.term > Date.now()).sort((a, b) => +a.term - +b.term);
      this.nextDate = this.sortedDates[0].term;
      this.type = this.sortedDates[0].type;

      // Get selected sectors description
      // Check if user select any sector before and sector is not "Wszystkie"
      if (localStorage.lastSelectedSector && localStorage.lastSelectedSector !== 'inherit') {
        // Use filter to get user selected sector title and boundary
        this.descriptionTitle = this.sectors.filter(dates => dates.value === localStorage.lastSelectedSector)[0].name;
        this.descriptionBoundary = this.sectors.filter(dates => dates.value === localStorage.lastSelectedSector)[0].boundary;
        // And selected sector nearest garbage collection date
        this.sortedDates = this.initialDates.filter(dates => {
          if (dates.sector === 'yellow') {
            dates.sector = 'gold';
          }
          return +dates.term > Date.now() && dates.sector === localStorage.lastSelectedSector;
        });

        // Sort dates from min to max
        this.sortedDates = this.sortedDates.sort((a, b) => +a.term - +b.term);
        this.nextDate = this.sortedDates[0].term;
        this.type = this.sortedDates[0].type;
      }
    });

    // Fires on sector change and do the same as above
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
        this.sortedDates = this.sortedDates.sort((a, b) => +a.term - +b.term);
        this.nextDate = this.sortedDates[0].term;
        this.type = this.sortedDates[0].type;
      }
    );
  }
}
