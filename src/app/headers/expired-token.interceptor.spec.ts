import { TestBed } from '@angular/core/testing';

import { ExpiredTokenInterceptor } from './expired-token.interceptor';

describe('ExpiredTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExpiredTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExpiredTokenInterceptor = TestBed.inject(ExpiredTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
