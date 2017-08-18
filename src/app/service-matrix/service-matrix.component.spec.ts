import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMatrixComponent } from './service-matrix.component';

describe('ServiceMatrixComponent', () => {
  let component: ServiceMatrixComponent;
  let fixture: ComponentFixture<ServiceMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
