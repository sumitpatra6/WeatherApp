import { TestBed, inject } from '@angular/core/testing';

import { WeatherserviceService } from './weatherservice.service';

describe('WeatherserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherserviceService]
    });
  });

  it('should be created', inject([WeatherserviceService], (service: WeatherserviceService) => {
    expect(service).toBeTruthy();
  }));
});
