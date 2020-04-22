import { Component, OnInit } from '@angular/core';
import { StationList } from '../../services/meteo-stat/station-list';
import { Station } from '../../models/station';
import { StatisticTypeList, StatisticType } from '../../models/statistic-type';
import { MeteoStatsService } from '../../services/meteo-stat/meteo-stats.service';
import { Statistics } from '../../models/calculated-stats';
import { MeteoStatsData } from '../../models/meteo-stats-data';
import { CalculatedProps } from '../../models/statistics';
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
  radioSelected: any;
  radioSel: any;
  radioSelectedString: string;
  selectedStation: string;
  results: any;
  statData: Statistics;
  isDataLoaded: boolean;
  isRequestSended: boolean;
  isFormValid: boolean;
  validMessage: string;
  constructor(private service: MeteoStatsService) {
    this.isDataLoaded = false;
    this.isRequestSended = false;
    this.isFormValid = true;
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

  validateForm() {
    if (this.selectedStation === undefined) {
      this.validMessage = 'Proszę wybrać stację meteorologiczną';
      return false;
    }

    const fromDate = new Date(this.selectedFromDate);
    const toDate = new Date(this.selectedToDate);
    if (fromDate > toDate) {
      this.validMessage = 'Data rozpoczęcia musi być wcześniejsza niż data zakończenia'; //
      return false;
    }

    this.validMessage = '';
    return true;
  }
  generateReport() {
    this.isRequestSended = false;
    console.log(this.selectedFromDate);
    console.log(this.selectedToDate);
    console.log(this.radioSelected);
    console.log(this.selectedStation);
    const isValid = this.validateForm();
    this.isFormValid = isValid;
    if (isValid) {
      this.showMeteoStats();
    }
  }

  showMeteoStats() {
    return this.service.getStatsData(this.radioSelected, this.selectedStation, this.selectedFromDate, this.selectedToDate)
      .subscribe((results: any) => {
        console.log(results);
        this.results = results;
        this.calculateStats();
      });
  }

  calculateStats() {
    console.log(this.results.data.length);
    const dataLength = this.results.data.length;
    if (dataLength > 0) {
      const tempStats = this.calculateTemperatureStats(this.radioSelected, dataLength);
      const pressureStats = this.calculatePressureStats(this.radioSelected, dataLength);
      const windPowerStats = this.calculateWindPowerStats(this.radioSelected, dataLength);
      this.statData = new Statistics(tempStats, pressureStats, windPowerStats);
      this.isDataLoaded = this.isRequestSended = true;
    } else {
      // trzeba cos wyswietlic na UI ze nie dostaliśmy danych
      this.isDataLoaded = false;
      console.log('[StatsComponentComponent.calulateStats()] -> No data on API response');
    }
  }

  calculateTemperatureStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength ; j++) {
      if (this.results.data[j].temperature === null) {
        continue;
      } else {
        j++;
        break;
      }
    }
    j = j - 1;
    let minTemperature = this.results.data[j].temperature;
    let maxTemperature = this.results.data[j].temperature;
    const firstDate = radioSelected === '1' ? this.results.data[j].time : this.results.data[j].date;
    let minTempDate = firstDate;
    let maxTempDate = firstDate;
    let sumTemperature = 0;
    let dataCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
      const element = this.results.data[i];
      if (element.temperature != null) {
        const date = radioSelected === '1' ? element.time : element.date;
        sumTemperature += element.temperature;
        if (element.temperature < minTemperature) {
          minTemperature = element.temperature;
          minTempDate = date;
        }
        if (element.temperature > maxTemperature) {
          maxTemperature = element.temperature;
          maxTempDate = date;
        }
        dataCount++;
      }
    }
    const temp = new CalculatedProps(minTemperature, minTempDate, maxTemperature, maxTempDate, sumTemperature, dataCount);
    return temp;
  }

  calculatePressureStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength ; j++) {
      if (this.results.data[j].pressure === null) {
        continue;
      } else {
        j++;
        break;
      }
    }
    j = j - 1;
    let minPressure = this.results.data[j].pressure;
    let maxPressure = this.results.data[j].pressure;
    const firstDate = radioSelected === '1' ? this.results.data[j].time : this.results.data[j].date;
    let minPressureDate = firstDate;
    let maxPressureDate = firstDate;
    let sumPressure = 0;
    let dataCount = 0;
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
        const element = this.results.data[i];
        if (element.pressure != null) {
          const date = radioSelected === '1' ? element.time : element.date;
          sumPressure += element.pressure;
          if (element.pressure < minPressure) {
            minPressure = element.pressure;
            minPressureDate = date;
          }
          if (element.pressure > maxPressure) {
            maxPressure = element.pressure;
            maxPressureDate = date;
          }
          dataCount++;
          }
        }
    return new CalculatedProps(minPressure, minPressureDate, maxPressure, maxPressureDate, sumPressure, dataCount);
  }

  calculateWindPowerStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength ; j++) {
      if (this.results.data[j].windspeed === null) {
        continue;
      } else {
        j++;
        break;
      }
    }
    j = j - 1;
    let minWindPower = this.results.data[j].windspeed;
    let maxWindPower = this.results.data[j].windspeed;
    const firstDate = radioSelected === '1' ? this.results.data[j].time : this.results.data[j].date;
    let minWindPowerDate = firstDate;
    let maxWindPowerDate = firstDate;
    let sumWindPower = 0;
    let dataCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
      const element = this.results.data[i];
      if (element.windspeed != null) {
        const date = radioSelected === '1' ? element.time : element.date;
        sumWindPower += element.windspeed;
        if (element.windspeed < minWindPower) {
          minWindPower = element.windspeed;
          minWindPowerDate = date;
        }
        if (element.windspeed > maxWindPower) {
          maxWindPower = element.windspeed;
          maxWindPowerDate = date;
        }
        dataCount++;
      }
    }
    return new CalculatedProps(minWindPower, minWindPowerDate, maxWindPower, maxWindPowerDate, sumWindPower, dataCount);
  }
}
