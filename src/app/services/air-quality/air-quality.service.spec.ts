import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { AirQualityService } from './air-quality.service';

describe('AirQualityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, HttpClientModule],
    providers: [AirQualityService]
  }));

  it('should be created', () => {
    const service: AirQualityService = TestBed.get(AirQualityService);
    expect(service).toBeTruthy();
  });
});
