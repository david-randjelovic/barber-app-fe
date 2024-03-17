import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _userService: UserService, private _dataService: DataService, private _loaderService: LoaderService){}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    this._loaderService.showLoader('Please wait...', 'circular');
    
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._loaderService.hideLoader();
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._loaderService.hideLoader();
              this._dataService.showToast('Invalid session.', 'danger');
              this._userService.onLogOut();
            }
          }
        }
      ),
      finalize(() => {
        setTimeout(() => {
          this._loaderService.hideLoader();
        },500)
      })
    );
  }
}