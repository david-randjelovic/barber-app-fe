import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoveryPage } from './discovery.page';
import { SharedModule } from '../shared/shared.module';

import { DiscoveryPageRoutingModule } from './discovery-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    DiscoveryPageRoutingModule
  ],
  declarations: [DiscoveryPage]
})
export class Tab1PageModule {}
