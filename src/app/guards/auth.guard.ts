import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private _router: Router, private _dataService: DataService, private _userService: UserService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('access_token')) {
      this._userService.getUserData();
      return true;
    }
    this._dataService.showToast('Invalid session.', 'danger');
    this._router.navigateByUrl('/login');
    return false;
  }
  
}
