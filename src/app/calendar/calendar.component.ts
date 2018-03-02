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
  // Events array to display in calendar
  events: CalendarEvent[] = [];
  view = 'month';
  // Get locale from data service
  locale: string = this.dataService.getLocale();
  // Needed to refresh calendar view on change
  refresh: Subject<any> = new Subject();
  // Events store once to use filter on it
  EVENTS: CalendarEvent[] = [];
  // Get sector object from dataService
  sectors: {value: string, viewValue: string, name: string, boundary: string}[] = this.dataService.getSectors();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Create calendar events array
    // Push data from JSON file to calendar events
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
      // Store unfiltered events array to EVENTS
      this.EVENTS = this.events;
      // Filter events to recently selected sector
      if (localStorage.lastSelectedSector && localStorage.lastSelectedSector !== 'inherit') {
        this.events = this.EVENTS.filter(dates => dates.color.primary === localStorage.lastSelectedSector);
      }
      // Refresh calendar view
      this.refresh.next();
    });

    // Fires when new sector is selected
    this.dataService.sectorUpdated.subscribe(
      // If selected sector is not "Wszystkie" filter events by sector selector
      // If selected sector is "Wszystkie" show all events in calendar
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
