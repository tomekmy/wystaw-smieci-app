import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  // Default user sector is "Wszystkie" but user selection is stored in local storage
  userSector = localStorage.lastSelectedSector || 'inherit';
  sectors: {value: string, viewValue: string, name: string, boundary: string}[] = [];
  sectorLabel: string;

  constructor(private dataService: DataService) { }

  // Set material select text color to selected sector color
  setSelectColor(select: any) {
    const selectElementClass = select.source.trigger.nativeElement.childNodes[0];
    selectElementClass.setAttribute('style', 'color:' + select.value);
    // Get selected item id from $event object and use replace to change each letter to empty char - leave only number
    const id: any = select.source.selected.id.replace( /^\D+/g, '');
    // Update aria-label on sector change
    this.sectorLabel = this.sectors.filter(dates => dates.value === select.value)[0].viewValue;
    // Emit sectorUpdated
    this.dataService.sectorUpdated.emit(+id);
  }

  ngOnInit() {
    this.sectors = this.dataService.getSectors();
    document.querySelector('.mat-select-value').setAttribute('style', 'color:' + this.userSector);
    this.sectorLabel = this.sectors.filter(dates => dates.value === this.userSector)[0].viewValue;
  }

}
