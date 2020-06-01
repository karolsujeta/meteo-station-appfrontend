import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { MeteoStatsModel } from '../../models/stats-api-model';

/**
 * Klasa łącząca się z API meteostat oraz pobierająca dane z danej stacji w podanym przedziale czasowym o podanym typie statystyk:
 * 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne
 */
@Injectable({
  providedIn: 'root'
})

export class MeteoStatsService {
  /**
   * zmienna przechowująca bazowy adres API, z którego pobierane będą dane historyczne 
   * wykorzystywane przy wyznaczaniu statystyk.
   * API meteostat.net jest darmowe, występuje jedynie limit 200 zgłoszeń na godzine.
   */
  apiBaseUrl = 'https://api.meteostat.net/v1/history/';
  /**
   * zmienna zawierająca klucz API
   */
  apiKey = '&key=XWfTSLqc';
  /**
   * zmienna przechowująca adres API umożliwiający pobranie konkretnie ustalonych wartości. 
   * Stworzony adres odwołuje się do danych o określonym typie statystyk, konkretnej stacji, w danym przedziale czasowym.
   */
  apiURL: string;
    /**
   * zmienna przechowująca typ statystyk: 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne
   */
  statsType: string;
  /**
   * Konstruktor klasy MeteoStatsService
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Funkcja łącząca się z API, pobierająca dane o określonych parametrach.
   * @param type zmienna określająca typ statystyk.
   * @param station zmienna przechowująca stację, z którą mamy się połączyć przez API.
   * @param dateFrom zmienna przechowująca datę od której chcemy pobrać dane.
   * @param dateTo zmienna przechowująca datę do której chcemy pobrać dane.
   */
  getStatsData(type, station, dateFrom, dateTo): Observable<MeteoStatsModel> {
    this.getType(type);
    this.apiURL = this.apiBaseUrl + this.statsType + '?station=' + station + '&start=' + dateFrom + '&end=' + dateTo + this.apiKey;
    return this.http
      .get<MeteoStatsModel>(this.apiURL);
  }
  /**
   * Funkcja pobierająca informację o typie statystyk wybranych przez użytkownika.
   * @param type zmienna określająca typ statystyk: 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne.
   */
  getType(type) {
    switch (type) {
      case '1': this.statsType = 'hourly'; break;
      case '2': this.statsType = 'daily'; break;
      case '3': this.statsType = 'monthly'; break;
    }
  }
}
