import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ReservationModel } from 'src/app/models/reservation.model';
import { DataService } from 'src/app/services/data.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.page.html',
  styleUrls: ['./reservation-modal.page.scss'],
})
export class ReservationModalPage {

  public minDate: string;
  public services = [
    { name: 'Fade', price: 750 },
    { name: 'Classic Haircut', price: 400 },
    { name: 'Beard Trimming', price: 250 }
  ];

  constructor(public reservationService: ReservationService, private _modalController: ModalController, public dataService: DataService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  public onDone(): void {
    this.reservationService.onCreateReservation().pipe(
      finalize(() => {
        this.closeModal();
      })
    ).subscribe({
      next: response => {
        this.reservationService.activeReservations.push(response);
        this.dataService.showToast('Reservation successful!', 'success');
      },
      error: error => {
        this.dataService.showToast('Oops, something went wrong! Please contact an administrator.', 'danger');
      }
    })
  }

}
