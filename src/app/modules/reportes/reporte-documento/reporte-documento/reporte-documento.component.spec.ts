import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDocumentoComponent } from './reporte-documento.component';

describe('ReporteDocumentoComponent', () => {
  let component: ReporteDocumentoComponent;
  let fixture: ComponentFixture<ReporteDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
