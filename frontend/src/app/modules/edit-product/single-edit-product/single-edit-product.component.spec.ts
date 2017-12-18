import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEditProductComponent } from './single-edit-product.component';

describe('SingleEditProductComponent', () => {
  let component: SingleEditProductComponent;
  let fixture: ComponentFixture<SingleEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
