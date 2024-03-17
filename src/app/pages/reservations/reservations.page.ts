import { Component, OnInit } from '@angular/core';
import { DatetimeChangeEventDetail, ModalController } from '@ionic/angular';
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

  constructor(private _modalController: ModalController, public reservationService: ReservationService, public dataService: DataService, public userService: UserService) {}

  ngOnInit(): void {
    this.userService.userData$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(userData => {
        if (userData) {
          if (userData.type === 0) {
            this._loadActiveReservations();
          } else {
            this.tab = 'today';
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
          this.dataService.showToast('Oops, active reservations could not be fetched.', 'danger');
        }
      });
    }
  }

  public onDateSelected(event: CustomEvent) {
    const selectedDate = event.detail.value;
  
    if (typeof selectedDate === 'string') {
      const dateOnly = selectedDate.split('T')[0];
      this._loadReservationsForDate(dateOnly);
    }
  }
  

  private _loadActiveReservations(): void {
    this.reservationService.getActiveReservations().subscribe({
      next: (reservations) => {
        this.reservationService.activeReservations = reservations;
      },
      error: (error) => {
        this.dataService.showToast('Oops, active reservations could not be fetched.', 'danger');
      }
    });
  }

  private _loadTodaysReservations(): void {
    this.reservationService.getTodaysReservations().subscribe({
        next: (reservations) => {
          this.reservationService.todaysReservations = reservations;
        },
        error: (error) => {
            this.dataService.showToast('Error fetching today\'s reservations', 'danger');
        }
    });
  }

  private _loadReservationsForDate(date: string) {
    this.reservationService.getReservationsForDate(date).subscribe({
      next: (reservations) => {
        this.reservationService.certainDateReservations = reservations;
      },
      error: (error) => {
        this.dataService.showToast('Oops, something went wrong with fetching data.', 'danger');
      },
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
