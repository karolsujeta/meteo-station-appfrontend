import { TestBed } from '@angular/core/testing';

import { QualityServiceService } from './quality-service.service';

describe('QualityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualityServiceService = TestBed.get(QualityServiceService);
    expect(service).toBeTruthy();
  });
});
