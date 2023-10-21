import { TestBed } from '@angular/core/testing';

import { RecordResolverService } from './record-resolver.service';

describe('RecordResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordResolverService = TestBed.inject(RecordResolverService);
    expect(service).toBeTruthy();
  });
});
