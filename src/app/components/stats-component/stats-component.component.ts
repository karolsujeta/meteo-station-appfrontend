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
declare var $: any;

/**
 * Stats component
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
   * Funkcja inicjalizująca komponent. Dodaje rozwijalną listę miaast możliwych do wyboru,
   * ustawia domyślnie typ statystyk na godzinowy (zostaje zaznaczony radio button) oraz inicjalizuje daty przedziału czasowego.
   */
  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
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
   * Funkcja pobierająca zaznaczony typo statystyk za każdym razem, gdy zostanie on zmieniony.
   * Czy za każdym razem gdy użytkownik zaznaczy któryś radio button, pobierana będzie wartość wyboru.
   */
  onItemChange(item) {
    this.getSelecteditem();
  }

  /**
   * Funkcja sprawdzająca czy wszystkie dane podane przez użytkownika są poprawne oraz czy zostały podane wszystkie wymagane dane.
   * Funkcja sprawsza czy została wybrana miejscowość oraz czy początkowa data
   * podanego przedziału czasowego jest wczesńiejsza niż data końcowa.
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
        const temperatureChart = new CanvasJS.Chart('temperatureChart', {
          title: {
            text: 'Temperatura'
          },
          height: 300,
          data: [
            {
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
            text: 'Ciśnienie'
          },
          axisY: {
            minimum: Number(pressureStats.min) - 5
          },
          height: 300,
          data: [
            {
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
}