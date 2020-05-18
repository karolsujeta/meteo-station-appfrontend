import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AirData } from './quality-module';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
let QualityServiceService = class QualityServiceService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&maxDistanceKM=100';
    }
    getAirData(lat, lng) {
        return this.http
            .get(`${this.apiUrl}&lat=${lat}&lng=${lng}&apikey=SV8Wb734fM470C2HYs8atebFRNg5LzU9`)
            .pipe(map((data) => [data].map((item) => new AirData(item.current))), catchError((error) => {
            return Observable.throw(error.message || "Server Message");
        }));
    }
};
QualityServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QualityServiceService);
export { QualityServiceService };
//# sourceMappingURL=quality-service.service.js.map