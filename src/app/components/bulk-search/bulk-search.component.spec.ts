import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSearchComponent } from './bulk-search.component';

describe('BulkSearchComponent', () => {
  let component: BulkSearchComponent;
  let fixture: ComponentFixture<BulkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
