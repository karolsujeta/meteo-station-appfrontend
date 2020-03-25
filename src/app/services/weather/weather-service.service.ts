import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WeatherData } from './weather-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  list: any;
  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  unsubscribe: any;

  constructor(private http: HttpClient) { }

  public getWeatherData(term: string): Observable<WeatherData[]> {
    // return this.http
    //   .get<WeatherData[]>(this.apiUrl)         // do sprawdzenia wszystkich endpointów

    return this.http
      .get<WeatherData[]>(`${this.apiUrl}${term}&appid=9a3485ea70ca20151b5d5d7b29054807`)
      .pipe(
        map((data: any) =>
          [data].map((item: any) =>
            new WeatherData(item.name, item.visibility, item.main))),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message || "Server Message");
        })
      )
  }
}
