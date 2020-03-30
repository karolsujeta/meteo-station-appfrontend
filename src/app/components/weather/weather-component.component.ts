import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherServiceService } from '../../services/weather/weather-service.service';
declare var $: any;

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {

  private resultsWeather = [];
  public resultsForecast: any;
  public errorMsg;

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
        console.log(data);
        this.resultsForecast = data;
      },
      )
  }
}
