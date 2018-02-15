import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  locale = 'pl';

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

  inputDates = [{
    'blue': [{
      'term': '2018-01-02',
      'type': 'MIXED'
    }, {
      'term': '2018-01-15',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-01-16',
      'type': 'MIXED'
    }, {
      'term': '2018-01-19',
      'type': 'BIO'
    }, {
      'term': '2018-01-30',
      'type': 'MIXED'
    }, {
      'term': '2018-02-12',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-02-13',
      'type': 'MIXED'
    }, {
      'term': '2018-02-16',
      'type': 'BIO'
    }, {
      'term': '2018-02-27',
      'type': 'MIXED'
    }, {
      'term': '2018-03-12',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-03-13',
      'type': 'MIXED'
    }, {
      'term': '2018-03-16',
      'type': 'BIO'
    }, {
      'term': '2018-03-27',
      'type': 'MIXED'
    }],
    'green': [{
      'term': '2018-01-08',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-01-12',
      'type': 'MIXED'
    }, {
      'term': '2018-01-18',
      'type': 'BIO'
    }, {
      'term': '2018-01-26',
      'type': 'MIXED'
    }, {
      'term': '2018-02-05',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-02-09',
      'type': 'MIXED'
    }, {
      'term': '2018-02-15',
      'type': 'BIO'
    }, {
      'term': '2018-02-23',
      'type': 'MIXED'
    }, {
      'term': '2018-03-05',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-03-09',
      'type': 'MIXED'
    }, {
      'term': '2018-03-15',
      'type': 'BIO'
    }, {
      'term': '2018-03-23',
      'type': 'MIXED'
    }],
    'yellow': [{
      'term': '2018-01-09',
      'type': 'MIXED'
    }, {
      'term': '2018-01-22',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-01-23',
      'type': 'MIXED'
    }, {
      'term': '2018-01-25',
      'type': 'BIO'
    }, {
      'term': '2018-02-06',
      'type': 'MIXED'
    }, {
      'term': '2018-02-19',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-02-20',
      'type': 'MIXED'
    }, {
      'term': '2018-02-22',
      'type': 'BIO'
    }, {
      'term': '2018-03-06',
      'type': 'MIXED'
    }, {
      'term': '2018-03-19',
      'type': 'SEGREGATED'
    }, {
      'term': '2018-03-20',
      'type': 'MIXED'
    }, {
      'term': '2018-03-22',
      'type': 'BIO'
    }]
  }];

  outputDates = [];

  sectorUpdated = new EventEmitter<number>();

  constructor() {
    // Rewrite inputDates to outputDates
    let type: string;
    this.inputDates.forEach(sector => {
      for (const key of Object.keys(sector)) {
        sector[key].forEach(value => {
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
    });
  }

}
