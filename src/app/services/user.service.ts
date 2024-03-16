import { Observable, finalize } from "rxjs";
import { UserModel } from "../models/user.model";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./auth.service";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoaderService } from "./loader.service";
import { Injectable } from "@angular/core";

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
        private _loaderService: LoaderService,
        private _router: Router,
        private _http: HttpClient,
        private _dataService: DataService,
        private _authService: AuthService,
        private _fb: FormBuilder
    ) {}
    
    public getUserData(): void {
        if (!this.userData) {
            this.userDataCall().pipe(
              finalize(() => {
                this._loaderService.hideLoader();
              })
            ).subscribe({
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