import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PostModel } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    public postForm: FormGroup = this._fb.group({
        heading: ['', Validators.required],
        subheading: ['', Validators.required],
        text: ['', Validators.required],
        image: ['', Validators.required]
    })

    constructor(private _fb: FormBuilder, private _http: HttpClient) {}

    public submitPost(formData: FormData) {
        return this._http.post(environment.apiUrl + 'upload-post', formData);
    }

    public getPosts(): Observable<PostModel[]> {
        return this._http.get<PostModel[]>(environment.apiUrl + 'posts');
    }
}