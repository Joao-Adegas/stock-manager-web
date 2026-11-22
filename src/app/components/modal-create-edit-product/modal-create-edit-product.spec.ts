import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateEditProduct } from './modal-create-edit-product';

describe('ModalCreateEditProduct', () => {
  let component: ModalCreateEditProduct;
  let fixture: ComponentFixture<ModalCreateEditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateEditProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateEditProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
