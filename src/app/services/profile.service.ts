import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private _http: HttpClient) {}


    public profilePictureCall(formData: FormData): Observable<string> {
        return this._http.post<string>(environment.apiUrl + 'upload-profile-picture', formData);
    }

    public bannerCall(formData: FormData): Observable<string> {
        return this._http.post<string>(environment.apiUrl + 'upload-banner', formData);
    }
    
}