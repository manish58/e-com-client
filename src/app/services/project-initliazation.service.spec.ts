import { TestBed } from '@angular/core/testing';

import { ProjectInitliazationService } from './project-initliazation.service';

describe('ProjectInitliazationService', () => {
  let service: ProjectInitliazationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectInitliazationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
