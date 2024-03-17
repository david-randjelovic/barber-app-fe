import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public viewConfirmPassword: boolean = false;
  public viewPassword: boolean = false;
  public segmentType: string = 'client';

  constructor(public authService: AuthService, private _navController: NavController) { }


  public changeType(type: string): void {
    type === 'password' ? this.viewPassword = !this.viewPassword : this.viewConfirmPassword = !this.viewConfirmPassword;
  }

  public onBack(): void {
    this._navController.back();
  }

  public onRegisterClient(): void {
    this.authService.registerClientCall().subscribe({
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
