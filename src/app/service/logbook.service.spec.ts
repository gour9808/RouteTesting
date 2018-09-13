import { TestBed, inject } from '@angular/core/testing';

import { LogbookService } from './logbook.service';

xdescribe('LogbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogbookService]
    });
  });

  it('should ...', inject([LogbookService], (service: LogbookService) => {
    expect(service).toBeTruthy();
  }));
});
