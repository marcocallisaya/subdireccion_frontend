import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanteFormComponent } from './estante-form.component';

describe('EstanteFormComponent', () => {
  let component: EstanteFormComponent;
  let fixture: ComponentFixture<EstanteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
