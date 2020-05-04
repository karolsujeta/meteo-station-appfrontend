import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { MeteoStatsModel } from '../../models/stats-api-model';

@Injectable({
  providedIn: 'root'
})


/**
 * Klasa łącząca się z API meteostat oraz pobierająca dane z danej stacji w podanym przedziale czasowym o podanym typie statystyk:
 * 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne
 */
export class MeteoStatsService {

  apiBaseUrl = 'https://api.meteostat.net/v1/history/';
  apiKey = '&key=XWfTSLqc';
  apiURL: string;
  statsType: string;
  constructor(private http: HttpClient) { }

  getStatsData(type, station, dateFrom, dateTo): Observable<MeteoStatsModel> {
    this.getType(type);
    this.apiURL = this.apiBaseUrl + this.statsType + '?station=' + station + '&start=' + dateFrom + '&end=' + dateTo + this.apiKey;
    return this.http
      .get<MeteoStatsModel>(this.apiURL);
  }

  getType(type) {
    switch (type) {
      case '1': this.statsType = 'hourly'; break;
      case '2': this.statsType = 'daily'; break;
      case '3': this.statsType = 'monthly'; break;
    }
  }
}
