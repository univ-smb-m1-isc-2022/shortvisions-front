import { TestBed } from '@angular/core/testing';

import { TokenBearerInterceptor } from './token-bearer.interceptor';

describe('TokenBearerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenBearerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenBearerInterceptor = TestBed.inject(TokenBearerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
