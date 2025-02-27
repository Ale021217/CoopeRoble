import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAveriasComponent } from './reportes-averias.component';

describe('ReportesAveriasComponent', () => {
  let component: ReportesAveriasComponent;
  let fixture: ComponentFixture<ReportesAveriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesAveriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAveriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
