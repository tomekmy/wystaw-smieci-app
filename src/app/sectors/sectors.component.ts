import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  sectors = [
    {
      value: 'green',
      viewValue: 'Zielony',
      name: 'Sektor I - Zielonka północna',
      boundary: 'Od torów kolejowych w kierunku Marek'
    },
    {
      value: 'blue',
      viewValue: 'Niebieski',
      name: 'Sektor II - Zielonka centralna',
      boundary: 'Od torów w kierunku ul. Wyszyńskiego oraz Poniatowskiego, Południowa i Wąska'
    },
    {
      value: 'gold',
      viewValue: 'Żółty',
      name: 'Sektor III - Zielonka południowa',
      boundary: 'Od ulicy Wyszyńskiego (włącznie) w kierunku Rembertowa'
    }
  ];

  // Set material select text color to selected sector color
  setSelectColor(select){
    let selectElement = select.source.controlType + '-value';
    let selectElementClass = document.getElementsByClassName(selectElement);
    selectElementClass[0].setAttribute('style', 'color:' + select.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
