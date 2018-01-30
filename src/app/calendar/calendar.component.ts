import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
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

  constructor() { }

  ngOnInit() {
  }

}
