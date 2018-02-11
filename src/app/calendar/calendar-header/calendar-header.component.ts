import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {
  @Input() view: string;
  @Input() viewDate: Date;
  @Input() locale: string;  
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();  

  constructor(private dataService: DataService) {
    // Get locale from data service
    this.locale = dataService.locale;
  }

  ngOnInit() {
  }

}
