import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseModel } from "../models/authResponse.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public loginForm: FormGroup = this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    public registerClientForm: FormGroup = this._fb.group({
        first_name: ['', [Validators.required]],
        second_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required, Validators.minLength(7)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });


    constructor(private _http: HttpClient, private _fb: FormBuilder) {}

    public loginCall(): Observable<AuthResponseModel> {
        return this._http.post<AuthResponseModel>(environment.apiUrl + 'auth/login', this.loginForm.value);
    }

    public registerClientCall(): Observable<AuthResponseModel> {
        return this._http.post<AuthResponseModel>(environment.apiUrl + 'auth/register-client', this.registerClientForm.value);
    }
}