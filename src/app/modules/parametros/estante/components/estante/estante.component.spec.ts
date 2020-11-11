import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanteComponent } from './estante.component';

describe('EstanteComponent', () => {
  let component: EstanteComponent;
  let fixture: ComponentFixture<EstanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
