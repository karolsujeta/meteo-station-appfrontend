import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AirData } from './quality-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class QualityServiceService {

  list: any;
  apiUrl = 'https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&maxDistanceKM=100';  unsubscribe: any;

  constructor(private http: HttpClient) { }

  public getAirData(lat: string, lng: string): Observable<AirData[]> {
    return this.http
      .get<AirData[]>(`${this.apiUrl}&lat=${lat}&lng=${lng}&apikey=SV8Wb734fM470C2HYs8atebFRNg5LzU9`)
      .pipe(
        map((data: any) =>
          [data].map((item: any) =>
            new AirData(item.current))),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message || "Server Message");
        })
      )
  }
}
