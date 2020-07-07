import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrderComponent } from './completed-order.component';

describe('CompletedOrderComponent', () => {
  let component: CompletedOrderComponent;
  let fixture: ComponentFixture<CompletedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
