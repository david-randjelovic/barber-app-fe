import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NumericDirective } from '../directives/numeric.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    NumericDirective
  ],
  exports: [
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NumericDirective
]
})
export class SharedModule {}
