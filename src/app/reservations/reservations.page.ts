import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservationModel } from '../models/reservation.model';
import { ReservationModalPage } from '../modals/reservation-modal/reservation-modal.page';
import { ReservationService } from '../services/reservation.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-reservations',
  templateUrl: 'reservations.page.html',
  styleUrls: ['reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  public tab: string = 'active';

  constructor(private _modalController: ModalController, public reservationService: ReservationService, private _dataService: DataService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        const now = new Date();
        this.reservationService.activeReservations = reservations.filter(reservation => new Date(reservation.date) > now);
        this.reservationService.archivedReservations = reservations.filter(reservation => new Date(reservation.date) <= now);
      },
      error: (error) => {
        this._dataService.showToast('There was an error retrieving the reservations, please contact an Administrator!', 'danger')
      }
    })
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ReservationModalPage
    });
    return await modal.present();
  }

}
