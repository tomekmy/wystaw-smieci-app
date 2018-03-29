import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SectorsComponent } from './sectors/sectors.component';
import { ToggleComponent } from './toggle/toggle.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DescriptionComponent } from './description/description.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { DataService } from './data.service';
import { WINDOW_PROVIDERS } from './window.service';

registerLocaleData(localePl);

// Default tooltip options
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 500
};


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
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    BrowserAnimationsModule,
    CookieLawModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    CalendarModule.forRoot()
  ],
  providers: [
    DataService,
    WINDOW_PROVIDERS,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
