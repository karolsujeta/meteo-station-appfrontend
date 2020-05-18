import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatsComponentComponent } from './components/stats-component/stats-component.component';
import { WeatherComponentComponent } from './components/weather/weather-component.component';
import { MapComponentComponent } from './components/map/map-component.component';
import { QualityComponentComponent } from './components/quality/quality-component.component';
// import { AirQualityComponentComponent } from './components/air-quality-component/air-quality-component.component';
const routes = [
    { path: 'mainpage', component: WeatherComponentComponent },
    { path: 'statistics', component: StatsComponentComponent },
    { path: 'map', component: MapComponentComponent },
    { path: 'quality', component: QualityComponentComponent },
    // { path: 'air-quality', component: AirQualityComponentComponent },
    { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
export const routableComponent = [
    WeatherComponentComponent, StatsComponentComponent
];
//# sourceMappingURL=app-routing.module.js.map