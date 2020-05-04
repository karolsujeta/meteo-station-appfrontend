import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QualityServiceService } from './quality-service.service';

describe('QualityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, HttpClientModule ],
    providers: [QualityServiceService]}));

  it('should be created', () => {
    const service: QualityServiceService = TestBed.get(QualityServiceService);
    expect(service).toBeTruthy();
  });
});
