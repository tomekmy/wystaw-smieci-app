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

  constructor(private dataService: DataService) { 
    this.descriptionTitle = this.dataService.sectors[0].name;
    this.descriptionBoundary = this.dataService.sectors[0].boundary;
    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        this.descriptionTitle = this.dataService.sectors[id].name;
        this.descriptionBoundary = this.dataService.sectors[id].boundary;
      }
    );
  }

  ngOnInit() {
  }

}
