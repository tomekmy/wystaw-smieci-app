import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  sector = 'Wszystkie';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sectorUpdated.subscribe((id: number) => {
      this.sector = this.dataService.getSectors()[id].viewValue;
    });
  }

}
