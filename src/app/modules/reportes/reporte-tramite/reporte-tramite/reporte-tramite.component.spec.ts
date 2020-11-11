import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTramiteComponent } from './reporte-tramite.component';

describe('ReporteTramiteComponent', () => {
  let component: ReporteTramiteComponent;
  let fixture: ComponentFixture<ReporteTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
