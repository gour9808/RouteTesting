import { TestBed, inject } from '@angular/core/testing';

import { FleetService } from './fleet.service';

xdescribe('FleetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FleetService]
    });
  });

  it('should ...', inject([FleetService], (service: FleetService) => {
    expect(service).toBeTruthy();
  }));
});
