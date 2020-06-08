import { Component, OnInit } from '@angular/core';
import { StationList } from '../../services/meteo-stat/station-list';
import { Station } from '../../models/station';
import { StatisticTypeList, StatisticType } from '../../models/statistic-type';
import { MeteoStatsService } from '../../services/meteo-stat/meteo-stats.service';
import { Statistics } from '../../models/calculated-stats';
import { MeteoStatsData } from '../../models/meteo-stats-data';
import { CalculatedProps } from '../../models/statistics';
import * as CanvasJS from '../../../canvasjs/canvasjs.min';
import { ChartService } from '../../services/meteo-stat/chart-service';
import Utility from '../../helpers/utility';
declare var $: any;

/**
 * Stats component
 * 
 * Komponent odpowiedzialny za pobranie danych z API, obliczenie podstawowych statystyk temperatury, ciśnienia oraz siły wiatru
 * bazując na wybranych przez użytkownika parametrach, czyli: miejscowość, przedział czasowy,
 * typ statystyk oraz wyświetlenie statystyk na stronie.
 */
@Component({
  selector: 'app-stats-component',
  templateUrl: './stats-component.component.html',
  styleUrls: ['./stats-component.component.css']
})

/**
 * Klasa odpowiadająca za obliczenie i wyświetlenie statystyk pogodowych
 */
export class StatsComponentComponent implements OnInit {

  /**
   * Zmienna przechowująca początkową datę przedziału czasowego, dla którego liczone są statystyki - jest wybierana przez użytkownika.
   */
  selectedFromDate: string;
  /**
   * Zmienna przechowująca końcową datę przedziału czasowego, dla którego liczone są statystyki - jest wybierana przez użytkownika.
   */
  selectedToDate: string;
  /**
   * Zmienna przechowująca listę miejscowości, dla których możliwe jest policzenie statystyk.
   * Ograniczona lista miejscowości wynika z dostępności zasobów API
   */
  stationList: any[];
  /**
   * Zmienna przechowująca listę dostępnych typów statystyk - statystyki godzinowe,
   * dzienne oraz miesięczne. Typ oznacza jakie dane są pobierane z API,
   * czy są to pomiary miesięczne, dzienne czy godzinowe.
   * Wybrany typ ma wpływ na dokładność statystyk, które są najbardziej dokładne przy danych rejestrowanych z częstotliwością godzinową.
   */
  statisticTypes: StatisticType[] = StatisticTypeList;
  /**
   * Zmienna przechowująca id typu statystyk wybranego przez użytkownika.
   */
  radioSelected: any;
  /**
   * Zmienna przechowująca obiekt składający się z id i nazwy typu statystyk wybranego przez użytkownika.
   */
  radioSel: any;
  /**
   * Zmienna przechowująca nazwę typu statystyk wybranego przez użytkownika.
   */
  radioSelectedString: string;
  /**
   * Zmienna przechowująca nazwę miejscowości wybranej przez użytkownika.
   */
  selectedStation: string;
  /**
   * Zmienna przechowująca dane pobrane z API z podanego przedziału czasowego.
   */
  results: any;
  /**
   * Zmienna przechowująca obiekt Statistics, czyli obiekt zawierający obliczone statystyki temperatury, ciśnienia oraz wiatru.
   */
  statData: Statistics;
  /**
   * Zmienna przechowująca informację na temat tego, czy dane zostały poprawnie pobrane z API oraz że są kompletne.
   */
  isDataLoaded: boolean;
  /**
   * Zmienna przechowująca informację na temat tego, czy obliczone statystyki zostały wyświetlone użytkownikowi na stronie.
   */
  isRequestSended: boolean;
  /**
   * Zmienna przechowująca informację na temat poprawności podanych przez użytkownika danych niezbędnych do wygenerowania statystyk.
   */
  isFormValid: boolean;
  /**
   * Zmienna przechowująca informację wyświetloną w przypadku, gdy podane przez użytkownika dane nie są poprawne.
   */
  validMessage: string;
  /**
   * Zmienna przechowująca informację na temat tego, czy siła wiatru została policzona.
   */
  isWindCalculated: boolean;

  title: string;

  popupResult: any;

  chartService: ChartService = new ChartService();
  /**
   *
   * Konstruktor klasy głównej: StatsComponentComponent
   */
  constructor(private service: MeteoStatsService) {
    this.isDataLoaded = false;
    this.isRequestSended = false;
    this.isFormValid = true;
    this.isWindCalculated = false;
  }

  /**
   * Funkcja inicjalizująca komponent. Dodaje rozwijalną listę miast możliwych do wyboru,
   * ustawia domyślnie typ statystyk na godzinowy (zostaje zaznaczony radio button) oraz inicjalizuje daty przedziału czasowego.
   */
  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function () {
      $('.nav').fadeTo('slow', 1);
    });
    this.stationList = new StationList().stationList;
    this.radioSelected = '1';
    this.selectedStation = '0: -1';
    this.initializeDate();
  }

  /**
   * Funkcja ustawia domyślną początkową i końcową datę przedziału czasowego do obliczania statystyk.
   * Użytkownik po wyświetleniu strony widzi na obu kalendarzach zaznaczony aktualny dzień.
   */
  initializeDate() {
    this.selectedFromDate = this.getDateNow();
    this.selectedToDate = this.getDateNow();
  }

  /**
   * Funkcja pobierająca obiekt z listy typów statystyk, odpowiadający aktualnie zaznaczonemu przez użytkownika.
   * Obiekt przypisywany jest do pola radioSel.
   * Przypisywana zostaje również sama nazwa wybranego typu statystyk do pola radioSelectedString.
   */
  getSelecteditem() {
    // tslint:disable-next-line:no-shadowed-variable
    this.radioSel = StatisticTypeList.find(StatisticType => StatisticType.id === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  /**
   * Funkcja pobierająca oraz konwertująca na tekst aktualną datę.
   */
  getDateNow() {
    const dateNow = Date.now();
    const date = new Date(dateNow);
    return date.toISOString().split('T')[0];
  }

  /**
   * Funkcja pobierająca zaznaczony typ statystyk za każdym razem, gdy zostanie on zmieniony.
   * Czyli za każdym razem gdy użytkownik zaznaczy któryś radio button, pobierana będzie wartość wyboru.
   */
  onItemChange(item) {
    this.getSelecteditem();
  }

  /**
   * Funkcja sprawdzająca czy wszystkie dane podane przez użytkownika są poprawne oraz czy zostały podane wszystkie wymagane dane.
   * Funkcja sprawdza czy została wybrana miejscowość oraz czy początkowa data
   * podanego przedziału czasowego jest wcześniejsza niż data końcowa.
   */
  validateForm() {
    if (this.selectedStation === undefined || this.selectedStation === '0: -1') {
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

  /**
   * Funkcja wywołująca funkcję wyświetlającą statystyki, o ile wszystkie dane konieczne
   * do wygenerowania statystyk, zostały poprawnie wprowadzone przez użytkownika.
   */
  generateReport() {
    this.isRequestSended = false;
    this.destroyChart('temperatureChart');
    this.destroyChart('pressureChart');
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


  /**
   * Funkcja pobierająca dane z API.
   */
  showMeteoStats() {
    this.isWindCalculated = !(this.radioSelected === '3');
    const startDate = this.radioSelected === '3' ? this.selectedFromDate.substring(0, 7) : this.selectedFromDate;
    const endDate = this.radioSelected === '3' ? this.selectedToDate.substring(0, 7) : this.selectedToDate;
    return this.service.getStatsData(this.radioSelected, this.selectedStation, startDate, endDate)
      .subscribe((results: any) => {
        console.log(results);
        this.results = results;
        this.calculateStats();
      });
  }

  getDataAndRenderPopupChart(type: number, dateType: string, dateFrom: string, dateTo: string) {
    return this.service.getStatsData(dateType, this.selectedStation, dateFrom, dateTo)
      .subscribe((results: any) => {
        this.popupResult = results;
        const popupData = type === 1 ?
          this.chartService.CalculateTemperatureData(dateType, this.popupResult.data) :
          this.chartService.CalculatePressureData(dateType, this.popupResult.data);
        const me = this;
        if (popupData.length > 0) {
          const popupChart = new CanvasJS.Chart('popupChart', {
            title: {
              text: me.getChartTitle(dateFrom, null, dateType, type === 1 ? 'temperatura' : 'ciśnienie')
            },
            height: 300,
            width: 800,
            axisY: {
              minimum: Utility.FindMinDataPoint(popupData) - 5,
              title: type === 1 ? '°C' : 'hPa'
            },
            data: [
              {
                // type: 'bar',
                type: 'line',
                color: type === 1 ? 'blue' : 'red',
                dataPoints: popupData
              }
            ]
          });
          popupChart.render();
        }
      });
  }

  displayDaily(day: string, type: number) {
    this.destroyChart('popupChart');
    const dateType = '1';
    const dateFrom = day;
    const dateTo = day;
    this.getDataAndRenderPopupChart(type, dateType, dateFrom, dateTo);
    $('#modalTitle').text(day);
    $('#chartModal').modal('show');
  }

  displayMonthly(month: string, type: number) {
    this.destroyChart('popupChart');
    const dateType = '2';
    const monthDate = new Date(month);
    const dateFrom = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const parsedDateFrom = this.getDateToRequest(dateFrom);
    const dateTo = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const parsedDateTo = this.getDateToRequest(dateTo);
    this.getDataAndRenderPopupChart(type, dateType, parsedDateFrom, parsedDateTo);
    $('#modalTitle').text(month);
    $('#chartModal').modal('show');
  }

  /**
   * Funkcja generująca oraz wyświetlająca statystyki, jeżeli dane pobrane z API są kompletne.
   * Jeżeli dane z API nie są kompletne, wyświetlona zostaje informacja o braku danych.
   */
  calculateStats() {
    console.log(this.results.data.length);
    const dataLength = this.results.data.length;
    this.isRequestSended = true;
    if (dataLength > 0) {
      const tempStats = this.calculateTemperatureStats(this.radioSelected, dataLength);
      const pressureStats = this.calculatePressureStats(this.radioSelected, dataLength);
      const windPowerStats = this.calculateWindPowerStats(this.radioSelected, dataLength);
      this.statData = new Statistics(tempStats, pressureStats, windPowerStats);
      this.isDataLoaded = true;
      const tempCharList = this.chartService.CalculateTemperatureData(this.radioSelected, this.results.data);
      if (tempCharList.length > 0) {
        const me = this;
        const temperatureChart = new CanvasJS.Chart('temperatureChart', {
          title: {
            text: me.getChartTitle(me.selectedFromDate, me.selectedToDate, me.radioSelected, 'temperatura')
          },
          axisY: {
            title: '°C'
          },
          height: 300,
          data: [
            {
              // tslint:disable-next-line:only-arrow-functions
              click(e) {
                if (me.radioSelected === '2') {
                  me.displayDaily(e.dataPoint.label, 1);
                } else if (me.radioSelected === '3') {
                  me.displayMonthly(e.dataPoint.label, 1);
                }
              },
              // type: 'bar',
              color: 'blue',
              dataPoints: tempCharList
            }
          ]
        });
        temperatureChart.render();
        const pressCharList = this.chartService.CalculatePressureData(this.radioSelected, this.results.data);
        const pressureChart = new CanvasJS.Chart('pressureChart', {
          title: {
            text: me.getChartTitle(me.selectedFromDate, me.selectedToDate, me.radioSelected, 'ciśnienie')
          },
          axisY: {
            minimum: Number(pressureStats.min) - 5,
            title: 'hPa'
          },
          height: 300,
          data: [
            {
              click(e) {
                if (me.radioSelected === '2') {
                  me.displayDaily(e.dataPoint.label, 2);
                } else if (me.radioSelected === '3') {
                  me.displayMonthly(e.dataPoint.label, 2);
                }
              },
              color: 'red',
              dataPoints: pressCharList
            }
          ]
        });
        pressureChart.render();
      }
    } else {
      // trzeba cos wyswietlic na UI ze nie dostaliśmy danych
      this.isDataLoaded = false;
      console.log('[StatsComponentComponent.calulateStats()] -> No data on API response');
    }
  }

  /**
   * Funkcja wyznaczająca maksymalną i minimalną temperaturę, daty w których te temperatury zostały zarejestrowane
   * oraz sumę temperatur i liczbę pomiarów w danych przedziale czasowym.
   * Wartości te zostają przekazane do konstruktora obiektu CalculatedProps.
   */
  calculateTemperatureStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength; j++) {
      if (radioSelected === '3' ? this.results.data[j].temperature_mean === null : this.results.data[j].temperature === null) {
        continue;
      } else {
        j++;
        break;
      }
    }
    j = j - 1;
    let minTemperature = radioSelected === '3' ? this.results.data[j].temperature_mean : this.results.data[j].temperature;
    let maxTemperature = radioSelected === '3' ? this.results.data[j].temperature_mean : this.results.data[j].temperature;
    const firstDate = radioSelected === '1' ? this.results.data[j].time :
      radioSelected === '2' ? this.results.data[j].date :
        this.results.data[j].month;
    let minTempDate = firstDate;
    let maxTempDate = firstDate;
    let sumTemperature = 0;
    let dataCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
      const element = this.results.data[i];
      const temperature = radioSelected === '3' ? element.temperature_mean : element.temperature;
      if (temperature != null) {
        const date = radioSelected === '1' ? element.time :
          radioSelected === '2' ? element.date :
            element.month;
        sumTemperature += temperature;
        if (temperature < minTemperature) {
          minTemperature = temperature;
          minTempDate = date;
        }
        if (temperature > maxTemperature) {
          maxTemperature = temperature;
          maxTempDate = date;
        }
        dataCount++;
      }
    }
    const temp = new CalculatedProps(minTemperature, minTempDate, maxTemperature, maxTempDate, sumTemperature, dataCount);
    return temp;
  }

  /**
   * Funkcja wyznaczająca maksymalne i minimalne ciśnienie, daty w których te ciśniania zostały zarejestrowane
   * oraz sumę ciśnień i liczbę pomiarów w danych przedziale czasowym.
   * Wartości te zostają przekazane do konstruktora obiektu CalculatedProps.
   */
  calculatePressureStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength; j++) {
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
    const firstDate = radioSelected === '1' ? this.results.data[j].time :
      radioSelected === '2' ? this.results.data[j].date :
        this.results.data[j].month;
    let minPressureDate = firstDate;
    let maxPressureDate = firstDate;
    let sumPressure = 0;
    let dataCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
      const element = this.results.data[i];
      if (element.pressure != null) {
        const date = radioSelected === '1' ? element.time :
          radioSelected === '2' ? element.date :
            element.month;
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

  /**
   * Funkcja wyznaczająca maksymalną i minimalną siłę wiatru, daty w których zostało to zarejestrowane
   * oraz sumę sił wiatru i liczbę pomiarów w danych przedziale czasowym.
   * Wartości te zostają przekazane do konstruktora obiektu CalculatedProps.
   */
  calculateWindPowerStats(radioSelected, dataLength): CalculatedProps {
    let j = 0;
    for (j; j < dataLength; j++) {
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
    const firstDate = radioSelected === '1' ? this.results.data[j].time :
      radioSelected === '2' ? this.results.data[j].date :
        this.results.data[j].month;
    let minWindPowerDate = firstDate;
    let maxWindPowerDate = firstDate;
    let sumWindPower = 0;
    let dataCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.results.data.length; i++) {
      const element = this.results.data[i];
      if (element.windspeed != null) {
        const date = radioSelected === '1' ? element.time :
          radioSelected === '2' ? element.date :
            element.month;
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

  destroyChart(id: string) {
    const temperatureChart = new CanvasJS.Chart(id);
    temperatureChart.destroy();
  }

  getDateToRequest(date: Date): string {
    const parsedDate = date.toLocaleString();
    const length = parsedDate.length;
    const offset = length === 20 ? 1 : 0;

    let day = parsedDate.substring(0, 1 + offset);
    if (offset === 0) {
      day = '0' + day;
    }
    const month = parsedDate.substring(2 + offset, 4 + offset);
    const year = parsedDate.substring(5 + offset, 9 + offset);
    const result = year + '-' + month + '-' + day;
    console.log(result);
    return result;
  }

  getChartTypeTitle(radioSelected: string): string {
    return radioSelected === '1' ? 'godzinow' :
      radioSelected === '2' ? 'dzienn'
        : 'miesięczn';
  }

  getChartDateTitle(date: any, radioSelected: string): string {
    return radioSelected === '3' ? date.substring(0, 7) : date;
  }

  resolveLastLetter(type: string): string {
    return type === 'temperatura' ? 'a' : 'e';
  }

  getChartTitle(dateFrom: any, dateTo: any, radioSelected: string, type: string): string {
    const lastLetter = this.resolveLastLetter(type);
    let resultEnd = '';
    let resultMid = '';
    let chartTypeTitle = '';

    if (dateTo != null) {
      resultEnd = ' do ' + this.getChartDateTitle(dateTo, radioSelected);
      resultMid = ' w okresie od ';
      chartTypeTitle = this.getChartTypeTitle(radioSelected) + lastLetter;
    } else {
      resultMid = radioSelected === '2' ? 'w miesiącu ' : 'dnia ';
      radioSelected = (Number(radioSelected) + 1).toString();
    }
    const result = 'Średni' + lastLetter + ' ' + type + ' ' + chartTypeTitle +
      resultMid + this.getChartDateTitle(dateFrom, radioSelected) + resultEnd;
    return result;
  }
}
