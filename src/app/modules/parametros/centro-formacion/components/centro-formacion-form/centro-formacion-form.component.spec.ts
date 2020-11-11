import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroFormacionFormComponent } from './centro-formacion-form.component';

describe('CentroFormacionFormComponent', () => {
  let component: CentroFormacionFormComponent;
  let fixture: ComponentFixture<CentroFormacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroFormacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroFormacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
