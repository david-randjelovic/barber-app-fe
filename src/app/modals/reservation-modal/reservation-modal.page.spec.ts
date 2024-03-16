import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationModalPage } from './reservation-modal.page';

describe('ReservationModalPage', () => {
  let component: ReservationModalPage;
  let fixture: ComponentFixture<ReservationModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
