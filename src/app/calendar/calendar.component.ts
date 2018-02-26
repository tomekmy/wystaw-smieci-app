import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
  view = 'month';
  clickedDate: Date;
  locale: string;
  refresh: Subject<any> = new Subject();
  EVENTS: CalendarEvent[] = [];
  sectors = this.dataService.getSectors();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Get locale from data service
    this.locale = this.dataService.getLocale();

    // Push data from json file to calendar events
    let color: string;
    this.dataService.getJSON().subscribe(data => {
      this.dataService.getDates(data).forEach(index => {
        if (index.sector === 'green') {
          color = 'green';
        } else if (index.sector === 'blue') {
          color = 'blue';
        } else if (index.sector === 'yellow') {
          color = 'gold';
        }

        this.events.push(
          {
            title: index.type,
            start: index.term,
            color: { primary: color, secondary: color }
          }
        );
      });
      this.EVENTS = this.events;
      if (localStorage.lastSelectedSector) {
        for (const key of Object.keys(this.sectors)) {
          if (this.sectors[key].value === localStorage.lastSelectedSector) {
            if (key !== '0') {
              this.events = this.EVENTS.filter(dates => dates.color.primary === this.dataService.getSectors()[key].value);
            }
          }
        }
      }
      this.refresh.next();
    });

    this.dataService.sectorUpdated.subscribe(
      (id: number) => {
        if (id !== 0) {
          this.events = this.EVENTS.filter(dates => dates.color.primary === this.dataService.getSectors()[id].value);
        } else {
          this.events = this.EVENTS;
        }
        this.refresh.next();
      }
    );
  }

}
