import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherServiceService } from 'src/app/services/weather/weather-service.service';
declare var $: any;

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {

  results = [];

  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".content").animate({ height: "200px", opacity: 1, }, 1500);
      $(".nav").fadeTo("slow", 1);
    })
  }

  getWeatherService(term: string) {
    this.service
      .getWeatherData(term)
      .subscribe((records: any) => {
        console.log(records);
        this.results.push(records);
      })
  }

}
