import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private locale = 'pl';

  private sectors = [
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

  private outputDates = [];

  sectorUpdated = new EventEmitter<number>();

  getLocale() {
    return this.locale;
  }

  getSectors() {
    return this.sectors;
  }

  getJSON(): Observable<any> {
    return this.http.get('assets/data.json');
  }

  getDates(data: Observable<any>) {
    // Rewrite inputDates to outputDates
    let type: string;
    for (const key of Object.keys(data)) {
      data[key].forEach(value => {
        if (value.type === 'MIXED') {
          type = 'Zmieszane';
        } else if (value.type === 'SEGREGATED') {
          type = 'Segregowalne';
        } else if (value.type === 'BIO') {
          type = 'Biodegradowalne';
        }

        this.outputDates.push(
          {
            sector: key,
            term: new Date(value.term),
            type: type
          }
        );
      });
    }
    return this.outputDates;
  }

  constructor(private http: HttpClient) { }
}
