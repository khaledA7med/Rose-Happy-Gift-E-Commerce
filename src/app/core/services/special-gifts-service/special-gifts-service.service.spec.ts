import { TestBed } from '@angular/core/testing';

import { SpecialGiftsServiceService } from './special-gifts-service.service';

describe('SpecialGiftsServiceService', () => {
  let service: SpecialGiftsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialGiftsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
