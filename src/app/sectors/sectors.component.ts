import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  
  sectors = [
    {value: 'blue', viewValue: 'Niebieski'},
    {value: 'green', viewValue: 'Zielony'},
    {value: 'yellow', viewValue: 'Żółty'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
