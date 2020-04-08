import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoStatsService {

  constructor() { }

  apiBaseUrl = 'https://api.meteostat.net/v1/';
  apiKey = 'XWfTSLqc';
}
