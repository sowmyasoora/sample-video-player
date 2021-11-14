import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VimeoService } from './vimeo.service';

describe('VimeoService', () => {
  let service: VimeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VimeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
