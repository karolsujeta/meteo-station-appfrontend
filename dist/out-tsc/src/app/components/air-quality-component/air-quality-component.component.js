import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AirQualityComponentComponent = class AirQualityComponentComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
    }
    showAirData() {
        return this.service.getAirData()
            .subscribe((results) => {
            console.log(results);
            this.results = results;
        });
    }
};
AirQualityComponentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-air-quality-component',
        templateUrl: './air-quality-component.component.html',
        styleUrls: ['./air-quality-component.component.css']
    })
], AirQualityComponentComponent);
export { AirQualityComponentComponent };
//# sourceMappingURL=air-quality-component.component.js.map