import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherServiceService } from '../../services/weather/weather-service.service';
import { Chart } from 'chart.js';
import { WeatherData } from '../../services/weather/weather-module';
import { isNull } from 'util';
declare var $: any;

/**
 * Komponent zakładki Strona główna.

 * Wyświetlanie aktualnego stanu pogody oraz prognozy pogody na najbliższe pięć dni dla wybranego przez użytkownila miasta.
 */
@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
/**
 * Klasa odpowiadająca za informacje wyświetlane na stronie głownej aplikacji
 */
export class WeatherComponentComponent implements OnInit {

 /**
  * Zmienna przechowująca dane z aktualnym stanem pogody analizowanego miasta.
  */
  public resultsWeather = [];
   /**
 * Zmienna przechowująca dane z prognozą pogody na najbliższe dni analizowanego miasta.
 */
  public resultsForecast: any;
  /**
 * Informacja o błędzie przy wprowadzaniu przez użytkownika nazwy miasta.
 */
  public errorMsg;
  /**
 * Przechowuje dane o czasie pomiaru, wyciągnięte z danych prognozy pogody.
 */
  public resultsForecastToChartData = [];
  /**
 * Przechowuje temperatury wyciągnięte z danych prognozy pogody.
 */
  public resultsForecastToChartTemp = [];
  /**
 * Przechowuje dane do wyświetlenia w tabeli z prognozą pogody.
 */
  public resultsForecastToTable = [];
  // public resultsForecastToTable: any;
  public dataTrigger: boolean = false;

/**
 *
 * @param http
 * @param service
 */
  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  ngOnInit() {
    //podstawowe animacje dla dwóch głownych okien na pierwszej stronie aplikacji
    $(document).ready(function () {
      $(".content").animate({ opacity: 1, }, 1500);
      $(".chart-area").animate({opacity:1,}, 32000);
      $(".nav").fadeTo("slow", 1);
    })
  }

  /**
   * Funkcja inicjue wyświetlanie się tabel z danymi oraz wykresu poprzez nacisnięcie przycisku "Pokaż dane!"
   * Odwołuje się do tabel z pogodą w danym momencie '.content__table', z prognozą pogody '.content__chart' oraz wykresem '.chart-area'.
   */
  showContent() {
    $(document).ready(function () {
      $(".chart-area").show();
      $(".content__table").show();
      $(".content__chart").show();
    })
  }
  /**
   * Przypisanie pod zmienną 'resultWeather' danych, które będą wyświetlone w tabeli z aktualnym stanem pogody
   * w miejscowości podanej przez użytkownika. Dane pobierane są dzięki funkcji 'getWeatherData()'.
   * @param {string} term Parametr określający miejscowość, dla której wyświetlamy dane
   */
  getWeatherService(term: string) {
    this.service
      .getWeatherData(term)
      .subscribe((records: any) => {
        console.log(records);
        this.resultsWeather.push(records);
      },
        error => this.errorMsg = "Nie wprowadzono miejscowości lub wprowadzono złą nazwę!",
      )
    this.errorMsg = null;
  }

    /**
   * Funkcja inicująca pobieranie danych z prognozą pogody oraz przypisanie ich pod odpowiednie zmienne.
   *
   * Przypisanie pod zmienną 'resultsForecast' danych do wyświetlenia
   * w tabeli z prognozą pogody na najbliższe dni.
   * Dane pobierane są dzięki funkcji 'getWeatherForecastData()' .
   *
   * Z danych uzyskanych przez funkcję 'getWeatherForecastData()' wyciągamy i przypisujemy pod odpowiednie zmienne czas pomiaru,
   * temperaturę, temperaturę minimalną i temperaturę maksymalną. Zmienne wykorzystujemy do rysowania wykresu,
   * funkcja 'drawChart()'
   * @param {string} term Parametr określający miejsowość, dla której pobieramy dane.
   * @return
   */
  getForecastService(term: string) {
    this.dataTrigger = true;
    this.service
      .getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.resultsForecastToTable = [];
        var maxTemp = data[0].list[0].main.temp_max;
        var minTemp = data[0].list[0].main.temp_min;
        var icon = data[0].list[0].weather[0].icon;
        for (let i = 0; i < data[0].list.length - 1; i++) {
          //console.log(data);
          var date = new Date(data[0].list[i].dt_txt);
          if (date.getHours() == 12) {
            icon = data[0].list[i].weather[0].icon;
          }

          if (date.getDate() == new Date(data[0].list[i + 1].dt_txt).getDate()) {
            if (maxTemp < data[0].list[i + 1].main.temp_max) {
              maxTemp = data[0].list[i + 1].main.temp_max;
            }
            if (minTemp > data[0].list[i + 1].main.temp_min) {
              minTemp = data[0].list[i + 1].main.temp_min;
            }

          }
          else {
            this.resultsForecastToTable.push({ date: date.getDate() + ".0" + (date.getMonth() + 1), minTemp: minTemp, maxTemp: maxTemp, icon: icon });
            console.log(this.resultsForecastToTable);
            maxTemp = data[0].list[i + 1].main.temp_max;
            minTemp = data[0].list[i + 1].main.temp_min;
          }
        }

        this.resultsForecastToChartData = [];
        this.resultsForecastToChartTemp = [];
        for (let i = 0; i < data[0].list.length; i++) {
          //console.log(data[0].list[i].main);
          var date = new Date(data[0].list[i].dt_txt);
          this.resultsForecastToChartData.push(date.getDate() + ".0" + (1 + date.getMonth()) + " " + date.getHours() + ":00");
          this.resultsForecastToChartTemp.push(data[0].list[i].main.temp);
        }
        //console.log(data);
        this.resultsForecast = data;
        this.drawChart();
      },
      )
  }

 /**
   * Funkcja rysująca wykres prognozy pogody. Odwołujemy się do niej w funkcji 'getForecastService()'.
   */
  drawChart() {
    //console.log(this.resultsForecastToChartData);
    var city = <HTMLInputElement>document.getElementById('cityInput');
    var myChart = <HTMLInputElement>document.getElementById('chart__forecast');
    if (myChart != null) {
      console.log(1000000);
      myChart.remove();
      var chartArea = <HTMLInputElement>document.getElementById('chart-area');
      chartArea.insertAdjacentHTML('afterbegin', '<canvas id="chart__forecast"></canvas>');
    }
    new Chart('chart__forecast', {
      type: 'line',
      data: {
        labels: this.resultsForecastToChartData, //dt_txt,

        datasets: [{
          label: 'Wartość temperatury',
          data: this.resultsForecastToChartTemp, //main.temp_max main.temp_min
          borderColor: '#037ffc',
          backgroundColor: '#E8B67C',

        }],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Prognozowana temperatura w przeciągu najbliższych 5 dni dla miejscowości ' + city.value.toUpperCase(),
        },
      }
    });
  }
}