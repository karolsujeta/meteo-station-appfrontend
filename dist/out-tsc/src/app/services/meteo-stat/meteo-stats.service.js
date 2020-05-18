import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let MeteoStatsService = class MeteoStatsService {
    constructor() {
        this.apiBaseUrl = 'https://api.meteostat.net/v1/';
        this.apiKey = 'XWfTSLqc';
    }
};
MeteoStatsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], MeteoStatsService);
export { MeteoStatsService };
//# sourceMappingURL=meteo-stats.service.js.map