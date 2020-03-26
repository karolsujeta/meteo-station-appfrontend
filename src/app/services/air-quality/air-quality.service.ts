import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AirQualityData } from './air-quality-module';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {

  constructor(private http: HttpClient) { }

  api = 'http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/52';

  getAirData(): Observable<AirQualityData[]> {
    return this.http
      .get<AirQualityData[]>(this.api)        // airly kay:  SV8Wb734fM470C2HYs8atebFRNg5LzU9
      .pipe(
        map((data: any) =>
          [data].map((item: any) =>
            new AirQualityData(item.id, item.stIndexLevel, item.stSourceDataDate)))
      )
  }
}
