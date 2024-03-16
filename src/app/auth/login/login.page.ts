import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public viewPassword: boolean = false;

  constructor(public authService: AuthService, private _router: Router, private _dataService: DataService, private _loaderService: LoaderService) { }

  ngOnInit() {
  }

  public changeType(): void {
    this.viewPassword = !this.viewPassword;
  }


  reset() {
  }

  public onLogin(): void {
    this._loaderService.showLoader('Logging in', 'circular');
    this.authService.loginCall().pipe(
      finalize(() => {
        this._loaderService.hideLoader();
      })
    ).subscribe({
      next: response => {
        this._setTokens(response.token!, response.user_id!)
        this._router.navigateByUrl('/tabs/tabs/discovery');
      },
      error: error => {
        const checkIfApproved = error.error.message === 'Not approved' ? error.error.message : 'Oops something went wrong! Please contact an administrator.';
        const errorMessage = error.error.message === 'Invalid email or password.' ? error.error.message : checkIfApproved;
        this._dataService.showToast(errorMessage, 'danger');
      }
    });
  }

  private _setTokens(token: string, user_id: number): void {
    localStorage.setItem('access_token', String(token));
    localStorage.setItem('user_id', String(user_id));
  }

  onSocial() {
  }

  onRegister() {
    this._router.navigate(['register']);
  }

}
