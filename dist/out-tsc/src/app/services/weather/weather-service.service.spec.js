import { TestBed } from '@angular/core/testing';
import { WeatherServiceService } from './weather-service.service';
describe('WeatherServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(WeatherServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=weather-service.service.spec.js.map