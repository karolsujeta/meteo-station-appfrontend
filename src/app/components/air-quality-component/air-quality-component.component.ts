import { Component, OnInit } from '@angular/core';
import { AirQualityService } from 'src/app/services/air-quality/air-quality.service';

@Component({
  selector: 'app-air-quality-component',
  templateUrl: './air-quality-component.component.html',
  styleUrls: ['./air-quality-component.component.css']
})
export class AirQualityComponentComponent implements OnInit {

  results: any;

  constructor(private service: AirQualityService) { }

  ngOnInit() {
  }

  showAirData() {
    return this.service.getAirData()
      .subscribe((results: any) => {
        console.log(results);
        this.results = results;
      })
  }
}
