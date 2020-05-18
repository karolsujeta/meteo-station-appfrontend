import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { StationList } from '../../services/meteo-stat/station-list';
import { StatisticTypeList } from '../../models/statistic-type';
let StatsComponentComponent = class StatsComponentComponent {
    constructor() {
        this.statisticTypes = StatisticTypeList;
    }
    ngOnInit() {
        // tslint:disable-next-line:only-arrow-functions
        $(document).ready(function () {
            $('.nav').fadeTo('slow', 1);
        });
        this.stationList = new StationList().stationList;
        this.radioSelected = '1';
        this.initializeDate();
    }
    // selectStationChange(station){
    //   this.selectedStaion
    // }
    initializeDate() {
        this.selectedFromDate = this.getDateNow();
        this.selectedToDate = this.getDateNow();
    }
    getSelecteditem() {
        // tslint:disable-next-line:no-shadowed-variable
        this.radioSel = StatisticTypeList.find(StatisticType => StatisticType.id === this.radioSelected);
        this.radioSelectedString = JSON.stringify(this.radioSel);
    }
    getDateNow() {
        const dateNow = Date.now();
        const date = new Date(dateNow);
        return date.toISOString().split('T')[0];
    }
    onItemChange(item) {
        this.getSelecteditem();
    }
    generateReport() {
        console.log(this.selectedFromDate);
        console.log(this.selectedToDate);
        console.log(this.radioSelected);
        console.log(this.selectedStation);
    }
};
StatsComponentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-stats-component',
        templateUrl: './stats-component.component.html',
        styleUrls: ['./stats-component.component.css']
    })
], StatsComponentComponent);
export { StatsComponentComponent };
//# sourceMappingURL=stats-component.component.js.map