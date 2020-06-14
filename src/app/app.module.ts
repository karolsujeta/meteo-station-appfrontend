import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WeatherComponentComponent } from './components/weather/weather-component.component';
import { MapComponentComponent } from './components/map/map-component.component';
import { StatsComponentComponent } from './components/stats-component/stats-component.component';
import { QualityComponentComponent } from './components/quality/quality-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponentComponent,
    MapComponentComponent,
    StatsComponentComponent,
    QualityComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
