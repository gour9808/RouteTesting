import { TestBed, inject } from '@angular/core/testing';

import { HandshakeService } from './handshake.service';

xdescribe('HandshakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandshakeService]
    });
  });

  it('should ...', inject([HandshakeService], (service: HandshakeService) => {
    expect(service).toBeTruthy();
  }));
});
