import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  viewSector: string;
  sector = localStorage.lastSelectedSector || 'inherit';
  checked = false;
  // Get sectors object from dataService
  sectors: {value: string, viewValue: string, name: string, boundary: string}[] = this.dataService.getSectors();

  constructor(private dataService: DataService) { }

  // Switch checked state and set localStorage variable with sector to notify
  onToggle(event) {
    if (event.checked === true) {
      localStorage.notificationSector = this.sector;
      this.checked = true;
      // Get here directly to global window object. I know it is a bad practice
      (<any>window).window.OneSignal.sendTag('sector', localStorage.notificationSector).then(function(tagsSent) {
        console.log(`Subscribe user to:  ${localStorage.notificationSector} sector - with tags: ${JSON.stringify(tagsSent)}`);
      });
    } else {
      localStorage.notificationSector = null;
      this.checked = false;
      // Get here directly to global window object. I know it is a bad practice
      (<any>window).window.OneSignal.sendTag('sector', localStorage.notificationSector).then(function(tagsSent) {
        console.log(`Unsubscribe user - with tags: ${JSON.stringify(tagsSent)}`);
      });
    }
  }

  ngOnInit() {
    // Set viewSector to display it in the brackets
    this.viewSector = this.sectors.filter(dates => dates.value === this.sector)[0].viewValue;

    // Check if user set notifications to this sector
    // If yes set right checked state
    if (localStorage.notificationSector === this.sector) {
      this.checked = true;
    } else {
      this.checked = false;
    }

    // Fires on every sector change
    // Set new sector to notify and set right switch checked state
    this.dataService.sectorUpdated.subscribe((id: number) => {
      this.sector = this.sectors[id].value;
      localStorage.lastSelectedSector = this.sectors[id].value;
      this.viewSector = this.sectors[id].viewValue;
      if (localStorage.notificationSector === this.sector) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    });
  }

}
