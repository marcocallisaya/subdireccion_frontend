import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteGeneralComponent } from './tramite-general.component';

describe('TramiteGeneralComponent', () => {
  let component: TramiteGeneralComponent;
  let fixture: ComponentFixture<TramiteGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramiteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
