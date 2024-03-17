import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public userData!: UserModel | null;

    public userSettingsForm: FormGroup = this._fb.group({
        country: [''],
        profile_picture: [''],
        email: [''],
        phone_number: [''],
        username: [''],
        address: ['']
    });

    constructor(
        private _router: Router,
        private _http: HttpClient,
        private _dataService: DataService,
        private _fb: FormBuilder
    ) {}
    
    public getUserData(): void {
        if (!this.userData) {
            this.userDataCall().subscribe({
              next: response => {
                this.userData = response;
              },
              error: error => {
                this._dataService.showToast('Oops, something went wrong! Please contact an administrator.', 'danger');
                this.onLogOut();
              }
            })
          }
    }

    public onLogOut(): void {
        this.userData = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        this._router.navigateByUrl('login');
    }

    public userDataCall(): Observable<UserModel> {
        return this._http.get<UserModel>(environment.apiUrl + 'user-data');
    }
}