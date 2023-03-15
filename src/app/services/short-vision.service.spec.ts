import { TestBed } from '@angular/core/testing';

import { ShortVisionService } from './short-vision.service';

describe('ShortVisionService', () => {
  let service: ShortVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
