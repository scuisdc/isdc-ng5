import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceKongMinHaoComponent } from './service-kong-min-hao.component';

describe('ServiceKongMinHaoComponent', () => {
  let component: ServiceKongMinHaoComponent;
  let fixture: ComponentFixture<ServiceKongMinHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceKongMinHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceKongMinHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
