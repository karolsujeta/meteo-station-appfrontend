import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WeatherData, ForecastData } from './weather-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";

  constructor(private http: HttpClient) { }

  public getWeatherData(term: string): Observable<WeatherData[]> {
    // return this.http
    //   .get<WeatherData[]>(this.apiUrl)         // do sprawdzenia wszystkich endpointów

    return this.http
      .get<WeatherData[]>(`${this.apiUrl}${term}&appid=9a3485ea70ca20151b5d5d7b29054807&units=metric`)
      .pipe(
        map((data: any) =>
          [data].map((item: any) =>
            new WeatherData(item.name, item.visibility, item.main, item.weather))),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message || "Server Message");
        })
      )
  }

  public getWeatherForecastData(term: string): Observable<ForecastData[]> {
    return this.http
      .get<ForecastData[]>(`${this.apiUrlForecast}${term}&appid=b742a4225977a8a94a092feb673aad31&units=metric`)
      .pipe(
        map((data: any) =>
          [data].map((item: any) =>
            new ForecastData(item.list)))
      )
  }
}
