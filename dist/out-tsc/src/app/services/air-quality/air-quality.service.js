import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AirQualityData } from './air-quality-module';
let AirQualityService = class AirQualityService {
    constructor(http) {
        this.http = http;
        this.api = 'http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/52';
    }
    getAirData() {
        return this.http
            .get(this.api) // airly kay:  SV8Wb734fM470C2HYs8atebFRNg5LzU9
            .pipe(map((data) => [data].map((item) => new AirQualityData(item.id, item.stIndexLevel, item.stSourceDataDate))));
    }
};
AirQualityService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AirQualityService);
export { AirQualityService };
//# sourceMappingURL=air-quality.service.js.map