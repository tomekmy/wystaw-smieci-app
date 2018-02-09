import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  sectors = [
    {
      value: 'inherit',
      viewValue: 'Wszystkie',
      name: 'Harmonogram odbioru odpadów w Zielonce',
      boundary: 'Wybierz z menu interesujący cię sektor'
    },
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

  sectorUpdated = new EventEmitter<number>();

  constructor() { }

}
