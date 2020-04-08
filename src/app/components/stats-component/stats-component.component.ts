import { Component, OnInit } from '@angular/core';
import { StationList } from '../../services/meteo-stat/station-list';
import { Station } from '../../models/station';
import { StatisticTypeList, StatisticType } from '../../models/statistic-type';
declare var $: any;

@Component({
  selector: 'app-stats-component',
  templateUrl: './stats-component.component.html',
  styleUrls: ['./stats-component.component.css']
})
export class StatsComponentComponent implements OnInit {

  selectedFromDate: string;
  selectedToDate: string;
  stationList: any[];
  statisticTypes: StatisticType[] = StatisticTypeList;
  radioSelected: string;
  radioSel: string;
  radioSelectedString: string;
  selectedStation: string;
  constructor() {

  }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
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
}
