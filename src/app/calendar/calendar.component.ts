import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { DataService } from '../data.service';
import {
  addDays,
  addHours,
  startOfDay,
  subWeeks,
  startOfMonth,
  endOfMonth,
  addWeeks
} from 'date-fns';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';

export class MyCalendarUtils extends CalendarUtils {
  getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = subWeeks(startOfMonth(args.viewDate), 1);
    args.viewEnd = addWeeks(endOfMonth(args.viewDate), 1);
    return getMonthView(args);
  }
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarUtils,
      useClass: MyCalendarUtils
    }
  ]
})
export class CalendarComponent implements OnInit {
  log(val) {
    console.log(val);
  }

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  view: string = 'month';
  clickedDate: Date;
  locale: string = 'pl';

  constructor(private dataService: DataService) {
    // Push data from firebase json to calendar events
    let color: string;
    let type: string;
    this.dataService.dates.forEach(sector => {
      for (let key in sector) {
        sector[key].forEach(term => {
          if (key === 'green') {
            color = 'green';
          } else if(key === 'blue') {
            color = 'blue';
          } else if(key === 'yellow') {
            color = 'gold';
          }

          if (term.type === 'MIXED') {
            type = 'Zmieszane';
          } else if (term.type === 'SEGREGATED') {
            type = 'Segregowalne';
          } else if (term.type === 'BIO') {
            type = 'Biodegradowalne';
          }

          this.events.push(
            { 
              title: type,
              start: new Date(term.term),
              color: {primary: color,secondary: color}
            }
          );
        });
      }
    });
  }

  ngOnInit() {
  }

}
