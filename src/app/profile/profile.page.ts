import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  @ViewChild('pfpInput') pfpInput!: ElementRef;
  @ViewChild('bannerInput') bannerInput!: ElementRef;

  constructor(
    public userService: UserService, 
    public profileService: ProfileService,
    private _actionSheetController: ActionSheetController, 
    ) {}

  public onBannerClick(): void {
    this.bannerInput.nativeElement.click();
  }

  public onPfpClick(): void {
    this.pfpInput.nativeElement.click();
  }

  public onPfpSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.uploadProfilePicture(input.files[0]);
      this.userService.userData!.profile_picture_url = URL.createObjectURL(input.files[0]);
    }
  }

  public onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.uploadBanner(input.files[0]);
      this.userService.userData!.banner_url = URL.createObjectURL(input.files[0]);
    }
  }

  public uploadProfilePicture(file: File): void {

    const formData = new FormData();
    formData.append('profile_picture', file, file.name);

    this.profileService.profilePictureCall(formData).subscribe({
      next: response => {

      },
      error: error => {

      }
    })
  }

  public uploadBanner(file: File): void {

    const formData = new FormData();
    formData.append('banner', file, file.name);

    this.profileService.bannerCall(formData).subscribe({
      next: response => {

      },
      error: error => {

      }
    })
  }

  public async onLogOut(): Promise<any> {
    const actionSheet = await this._actionSheetController.create({
      header: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.userService.onLogOut();''
          }
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();
  }

}
