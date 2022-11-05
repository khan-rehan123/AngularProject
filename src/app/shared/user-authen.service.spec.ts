import { TestBed } from '@angular/core/testing';

import { UserAuthenService } from './user-authen.service';

describe('UserAuthenService', () => {
  let service: UserAuthenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
