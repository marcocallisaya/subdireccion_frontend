import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionFormComponent } from './ubicacion-form.component';

describe('UbicacionFormComponent', () => {
  let component: UbicacionFormComponent;
  let fixture: ComponentFixture<UbicacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
