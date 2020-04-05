import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherServiceService } from '../../services/weather/weather-service.service';
import { Chart } from 'chart.js';
import { WeatherData } from '../../services/weather/weather-module';
declare var $: any;

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {

  public resultsWeather = [];
  public resultsForecast: any;
  public errorMsg;
  public resultsForecastToChartData = [];
  public resultsForecastToChartTemp = [];
  public resultsForecastToChartMinTemp = [];
  public resultsForecastToChartMaxTemp = [];


  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".content").animate({ opacity: 1, }, 1500);
      $(".nav").fadeTo("slow", 1);
    })
  }

  showTableContent() {
    $(document).ready(function () {
      $(".content__table").show();
      $(".content__chart").show();
    })
  }

  //metoda do wyświetlania głównych danych pogodowych dla wskazanego miejsca
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

  //metoda do wyświetlania danych pogodowych dla przyszłych pięciu dni
  getForecastService(term: string) {
    this.service
      .getWeatherForecastData(term)
      .subscribe((data: any) => {
        for (let i = 0; i < data[0].list.length; i++) {
          console.log(data[0].list[i].main);
          this.resultsForecastToChartData.push(data[0].list[i].dt_txt);
          this.resultsForecastToChartTemp.push(data[0].list[i].main.temp);
          this.resultsForecastToChartMinTemp.push(data[0].list[i].main.temp_min);
          this.resultsForecastToChartMaxTemp.push(data[0].list[i].main.temp_max);
        }
        this.resultsForecast = data;
        this.drawChart();
      },
      )
  }

  drawChart() {
    console.log(this.resultsForecastToChartData);
    var myChart = new Chart('chart__forecast', {
      type: 'line',
      data: {
        labels: this.resultsForecastToChartData, //dt_txt,

        datasets: [{
          label: 'Wartość temperatury',
          data: this.resultsForecastToChartTemp, //main.temp_max main.temp_min
          borderColor:'#5599EC'
        }],
      }
    });
  }
}