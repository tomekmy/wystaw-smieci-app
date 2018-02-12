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
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  view: string = 'month';
  clickedDate: Date;
  locale: string;

  constructor(private dataService: DataService) {
    // Get locale from data service
    this.locale = dataService.locale;

    // Push data from firebase json to calendar events
    let color: string;
    let type: string;
    dataService.outputDates.forEach(index => {
      if (index.sector === 'green') {
        color = 'green';
      } else if(index.sector === 'blue') {
        color = 'blue';
      } else if(index.sector === 'yellow') {
        color = 'gold';
      }

      this.events.push(
        { 
          title: index.type,
          start: index.term,
          color: {primary: color,secondary: color}
        }
      );
    });
  }

  ngOnInit() {
  }

}
