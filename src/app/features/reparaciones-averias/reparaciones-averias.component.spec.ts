import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionesAveriasComponent } from './reparaciones-averias.component';

describe('ReparacionesAveriasComponent', () => {
  let component: ReparacionesAveriasComponent;
  let fixture: ComponentFixture<ReparacionesAveriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReparacionesAveriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparacionesAveriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
