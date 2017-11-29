import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCTFComponent } from './service-ctf.component';

describe('ServiceCTFComponent', () => {
  let component: ServiceCTFComponent;
  let fixture: ComponentFixture<ServiceCTFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCTFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCTFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
