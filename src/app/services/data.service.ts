import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public selectedBarber!: UserModel;

    constructor(private _toastController: ToastController, private _http: HttpClient, private _modalController: ModalController) {}

    public async showToast(toastText: string, type: string) {
        const toast = await this._toastController.create({
          message: toastText,
          duration: 2000,
          position: 'bottom',
          color: type
        });
        toast.present();
    }

    public isWeekday = (dateString: string) => {
        const date = new Date(dateString);
        const utcDay = date.getUTCDay();
    
        return utcDay !== 0;
    };

    // public async openUserModal(userInfo: UserModel): Promise<void> {
    //     const modal = await this._modalController.create({
    //         component: ProfileInfoPage,
    //         componentProps: {
    //             userInfo: userInfo
    //         }
    //     });
    //     return await modal.present();
    //   }
}