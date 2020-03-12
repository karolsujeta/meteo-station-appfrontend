import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherServiceService } from 'src/app/services/weather/weather-service.service';
import { WeatherData } from 'src/app/services/weather/weather-module';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {

  records: any;

  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  ngOnInit() {
  }

  getWeatherService(term: string) {
    this.service
      .getWeatherData(term)
      .subscribe((records: any) => {
        console.log(records);
        this.records = records;
      })
  }
}
