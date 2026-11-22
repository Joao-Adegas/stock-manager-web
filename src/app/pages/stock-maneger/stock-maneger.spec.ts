import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManeger } from './stock-maneger';

describe('StockManeger', () => {
  let component: StockManeger;
  let fixture: ComponentFixture<StockManeger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockManeger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockManeger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
