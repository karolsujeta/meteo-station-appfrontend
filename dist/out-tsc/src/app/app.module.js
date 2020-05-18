import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponentComponent } from './components/weather/weather-component.component';
import { MapComponentComponent } from './components/map/map-component.component';
import { StatsComponentComponent } from './components/stats-component/stats-component.component';
import { QualityComponentComponent } from './components/quality/quality-component.component';
// import { AirQualityComponentComponent } from './components/air-quality-component/air-quality-component.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            FormsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map