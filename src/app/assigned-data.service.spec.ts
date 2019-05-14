import { TestBed } from '@angular/core/testing';

import { AssignedDataService } from './assigned-data.service';

describe('AssignedDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignedDataService = TestBed.get(AssignedDataService);
    expect(service).toBeTruthy();
  });
});
