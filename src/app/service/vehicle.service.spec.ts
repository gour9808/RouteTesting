import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';

xdescribe('VehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService]
    });
  });

  it('should ...', inject([VehicleService], (service: VehicleService) => {
    expect(service).toBeTruthy();
  }));
});
