import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraFormComponent } from './carrera-form.component';

describe('CarreraFormComponent', () => {
  let component: CarreraFormComponent;
  let fixture: ComponentFixture<CarreraFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
