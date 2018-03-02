import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  // Default application locale
  private locale = 'pl';

  // Sectors descriptions and colors
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

  // outputDates array is returned by getDates method
  private outputDates = [];

  // sectorUpdated emitter is emitted on every sector change
  sectorUpdated = new EventEmitter<number>();

  // Method to return default locale
  getLocale(): string {
    return this.locale;
  }

  // Method to return sectors array of objects
  getSectors(): {value: string, viewValue: string, name: string, boundary: string}[] {
    return this.sectors;
  }

  // Method to return JSON file observable to subscribe
  getJSON(): Observable<any> {
    return this.http.get('assets/data.json');
  }

  // Method to build and return array of objects when JSON data subscription occurs
  getDates(data: Observable<any>): {sector: string, term: Date, type: string}[] {
    let type: string;
    // outputDates need to be flushed of each time when getDates is called to avoid duplicate records
    this.outputDates = [];
    // Read data parameter given from getJSON subscription method
    for (const key of Object.keys(data)) {
      data[key].forEach(value => {
        // Polish translation of garbage type
        if (value.type === 'MIXED') {
          type = 'Zmieszane';
        } else if (value.type === 'SEGREGATED') {
          type = 'Segregowalne';
        } else if (value.type === 'BIO') {
          type = 'Biodegradowalne';
        }

        // Build outputDates
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
