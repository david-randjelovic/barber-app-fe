import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ReservationModel } from "../models/reservation.model";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    public activeReservations: Array<ReservationModel> = [];
    public archivedReservations: any[] = [];
    public minDate = new Date().toISOString().split('T')[0];

    public reservationForm: FormGroup = this._fb.group({
        service: ['', Validators.required],
        reservation_date: [, Validators.required],
    })

    constructor (private _fb: FormBuilder, private _http: HttpClient) {}

    public getActiveReservations(): Observable<ReservationModel[]> {
        return this._http.get<ReservationModel[]>(environment.apiUrl + 'reservations/active');
    }
    
    public getArchivedReservations(): Observable<ReservationModel[]> {
        return this._http.get<ReservationModel[]>(environment.apiUrl + 'reservations/archived');
    }

    public getTodaysReservations(): Observable<ReservationModel[]> {
        return this._http.get<ReservationModel[]>(environment.apiUrl + 'reservations/today');
    }

    public onCreateReservation(): Observable<ReservationModel> {
        return this._http.post<ReservationModel>(environment.apiUrl + 'create-reservation', this.reservationForm.value)
    }

}