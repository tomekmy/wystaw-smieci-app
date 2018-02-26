import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  viewSector = 'Wszystkie';
  sector = localStorage.lastSelectedSector || 'inherit';
  checked = false;

  constructor(private dataService: DataService) { }

  onToggle(event) {
    console.log('Zaznaczony: ' + event.checked);
    if (event.checked === true) {
      localStorage.notificationSector = this.sector;
      this.checked = true;
    } else {
      localStorage.notificationSector = null;
      this.checked = false;
    }
  }

  ngOnInit() {
    if (localStorage.notificationSector === this.sector) {
      this.checked = true;
      // console.log('Make it green: ' + this.checked);
    } else {
      this.checked = false;
      // console.log('Make it grey: ' + this.checked);
    }

    this.dataService.sectorUpdated.subscribe((id: number) => {
      this.sector = this.dataService.getSectors()[id].value;
      localStorage.lastSelectedSector = this.sector;
      this.viewSector = this.dataService.getSectors()[id].viewValue;
      if (localStorage.notificationSector === this.sector) {
        this.checked = true;
        // console.log('Make it green: ' + this.checked);
      } else {
        this.checked = false;
        // console.log('Make it grey: ' + this.checked);
      }
    });
  }

}
