import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoFormComponent } from './distrito-form.component';

describe('DistritoFormComponent', () => {
  let component: DistritoFormComponent;
  let fixture: ComponentFixture<DistritoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistritoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistritoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
