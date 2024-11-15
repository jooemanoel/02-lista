import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe(ItemService.name, () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
