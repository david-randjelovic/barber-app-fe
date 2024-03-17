import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservationModel } from '../../models/reservation.model';
import { ReservationModalPage } from '../../modals/reservation-modal/reservation-modal.page';
import { ReservationService } from '../../services/reservation.service';
import { DataService } from '../../services/data.service';
import { UserService } from 'src/app/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: 'reservations.page.html',
  styleUrls: ['reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  private _unsubscribe$ = new Subject<void>();
  public tab: string = 'active';

  constructor(private _modalController: ModalController, public reservationService: ReservationService, private _dataService: DataService, public userService: UserService) {}

  ngOnInit(): void {
    this.userService.userData$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(userData => {
        if (userData) {
          if (userData.type === 0) {
            this._loadActiveReservations();
          } else {
            this._loadTodaysReservations();
          }
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

  private _loadActiveReservations(): void {
    this.reservationService.getActiveReservations().subscribe({
      next: (reservations) => {
        this.reservationService.activeReservations = reservations;
      },
      error: (error) => {
        this._dataService.showToast('Oops, active reservations could not be fetched.', 'danger');
      }
    });
  }

  private _loadTodaysReservations(): void {
    this.reservationService.getTodaysReservations().subscribe({
        next: (reservations) => {
            console.log(reservations);
        },
        error: (error) => {
            this._dataService.showToast('Error fetching today\'s reservations', 'danger');
        }
    });
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ReservationModalPage
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
