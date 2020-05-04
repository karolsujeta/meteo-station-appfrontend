import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherServiceService } from './weather-service.service';

describe('WeatherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, HttpClientModule ],
    providers: [WeatherServiceService]}));

  it('should be created', () => {
    const service: WeatherServiceService = TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
  });
});
