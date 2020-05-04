import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MeteoStatsService } from './meteo-stats.service';

describe('MeteoStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, HttpClientModule ],
    providers: [MeteoStatsService]}));

  it('should be created', () => {
    const service: MeteoStatsService = TestBed.get(MeteoStatsService);
    expect(service).toBeTruthy();
  });
});
