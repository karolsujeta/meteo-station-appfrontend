import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WeatherData, ForecastData } from './weather-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
let WeatherServiceService = class WeatherServiceService {
    constructor(http) {
        this.http = http;
        this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
    }
    getWeatherData(term) {
        // return this.http
        //   .get<WeatherData[]>(this.apiUrl)         // do sprawdzenia wszystkich endpointów
        return this.http
            .get(`${this.apiUrl}${term}&appid=9a3485ea70ca20151b5d5d7b29054807&units=metric`)
            .pipe(map((data) => [data].map((item) => new WeatherData(item.name, item.visibility, item.main, item.weather))), catchError((error) => {
            return Observable.throw(error.message || "Server Message");
        }));
    }
    getWeatherForecastData(term) {
        return this.http
            .get(`${this.apiUrlForecast}${term}&appid=b742a4225977a8a94a092feb673aad31&units=metric`)
            .pipe(map((data) => [data].map((item) => new ForecastData(item.list))));
    }
};
WeatherServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], WeatherServiceService);
export { WeatherServiceService };
//# sourceMappingURL=weather-service.service.js.map