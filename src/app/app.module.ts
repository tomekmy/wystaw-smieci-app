import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {CalendarModule} from 'angular-calendar';

import { AppComponent } from './app.component';
import { SectorsComponent } from './sectors/sectors.component';
import { ToggleComponent } from './toggle/toggle.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DescriptionComponent } from './description/description.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';

registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent,
    SectorsComponent,
    ToggleComponent,
    CalendarComponent,
    DescriptionComponent,
    HeaderComponent,
    FooterComponent,
    CalendarHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieLawModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatButtonModule,
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
