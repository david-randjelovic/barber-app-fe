import { Injectable } from "@angular/core";
import { LoadingController, SpinnerTypes } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    constructor(private _loadingController: LoadingController) {}

    public async showLoader(message: string, spinnerType: SpinnerTypes) {
        const loading = await this._loadingController.create({
          message: message,
          spinner: spinnerType,
        });
        await loading.present();
    }

    public async hideLoader() {
        await this._loadingController.dismiss();
    }
}