import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
=======
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
>>>>>>> b9652ae7b3d8ddee47649552b189b89faee3b8e8
import { WeatherComponentComponent } from './components/weather/weather-component.component';
import { MapComponentComponent } from './components/map/map-component.component';
import { StatsComponentComponent } from './components/stats-component/stats-component.component';
import { QualityComponentComponent } from './components/quality/quality-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatInputModule } from '@angular/material'
// import { AirQualityComponentComponent } from './components/air-quality-component/air-quality-component.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponentComponent,
    MapComponentComponent,
    StatsComponentComponent,
    QualityComponentComponent
    // AirQualityComponentComponent
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
