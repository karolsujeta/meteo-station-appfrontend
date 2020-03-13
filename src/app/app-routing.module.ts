import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponentComponent } from './components/stats-component/stats-component.component';
import { WeatherComponentComponent } from './components/weather/weather-component.component';
import { MapComponentComponent } from './components/map/map-component.component';
import { AirQualityComponentComponent } from './components/air-quality-component/air-quality-component.component';


const routes: Routes = [
  { path: 'mainpage', component: WeatherComponentComponent },
  { path: 'statistics', component: StatsComponentComponent },
  { path: 'map', component: MapComponentComponent },
  { path: 'air-quality', component: AirQualityComponentComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routableComponent = [
  WeatherComponentComponent, StatsComponentComponent
];