import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public viewConfirmPassword: boolean = false;
  public viewPassword: boolean = false;
  public segmentType: string = 'client';

  constructor(public authService: AuthService, private _navController: NavController, private _loaderService: LoaderService) { }


  public changeType(type: string): void {
    type === 'password' ? this.viewPassword = !this.viewPassword : this.viewConfirmPassword = !this.viewConfirmPassword;
  }

  public onBack(): void {
    this._navController.back();
  }

  public onRegisterClient(): void {
    this._loaderService.showLoader('Logging in', 'circular');
    this.authService.registerClientCall().pipe(
      finalize(() => {
        this._loaderService.hideLoader();
      })
    ).subscribe({
      next: respone => {
        this._navController.back();
      },
      error: error => {

      }
    })
  }

  ionViewDidLeave(): void {
    this.authService.registerClientForm.reset();
  }

}
