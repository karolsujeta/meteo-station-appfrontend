import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AirData } from './quality-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * Pobieranie danych z api airly.eu.
 */
@Injectable({
  providedIn: 'root'
})
export class QualityServiceService {

  /**
   * @ignore
   */
  list: any;
  /**
   * Adres api, z którego pobieramy dane o jakości powietrza. 
   */
  apiUrl = 'https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&maxDistanceKM=100';  unsubscribe: any;

  /**
   * Konstruktor klasy 'QualityServiceService'.
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Funkcja pobiera dane z api o jakości powietrza w wybranym miejscu opisanym poprzez szerokość i długość geograficzną.
   * @param lat szerokość geograficzna
   * @param lng długość geograficzna
   */
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
