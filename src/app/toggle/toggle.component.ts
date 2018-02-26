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
  sectors = this.dataService.getSectors();

  constructor(private dataService: DataService) { }

  onToggle(event) {
    if (event.checked === true) {
      localStorage.notificationSector = this.sector;
      this.checked = true;
    } else {
      localStorage.notificationSector = null;
      this.checked = false;
    }
  }

  ngOnInit() {
    for (const key of Object.keys(this.sectors)) {
      if (this.sector === this.sectors[key].value) {
        this.viewSector = this.sectors[key].viewValue;
      }
    }

    if (localStorage.notificationSector === this.sector) {
      this.checked = true;
    } else {
      this.checked = false;
    }

    this.dataService.sectorUpdated.subscribe((id: number) => {
      this.sector = this.sectors[id].value;
      localStorage.lastSelectedSector = this.sector;
      this.viewSector = this.sectors[id].viewValue;
      if (localStorage.notificationSector === this.sector) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    });
  }

}
