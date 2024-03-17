import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservationModel } from '../../models/reservation.model';
import { ReservationModalPage } from '../../modals/reservation-modal/reservation-modal.page';
import { ReservationService } from '../../services/reservation.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reservations',
  templateUrl: 'reservations.page.html',
  styleUrls: ['reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  public tab: string = 'active';

  constructor(private _modalController: ModalController, public reservationService: ReservationService, private _dataService: DataService) {}

  ngOnInit(): void {
    this.reservationService.getActiveReservations().subscribe({
      next: (reservations) => {
        this.reservationService.activeReservations = reservations;
      },
      error: (error) => {
        this._dataService.showToast('Oops, active reservations could not be fetched.', 'danger');
      }
    });
  }

  public loadArchivedReservations(): void {
    if (this.reservationService.archivedReservations.length === 0) {
      this.reservationService.getArchivedReservations().subscribe({
        next: (reservations) => {
          this.reservationService.archivedReservations = reservations;
        },
        error: (error) => {
          this._dataService.showToast('Oops, active reservations could not be fetched.', 'danger');
        }
      });
    }
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ReservationModalPage
    });
    return await modal.present();
  }

}
