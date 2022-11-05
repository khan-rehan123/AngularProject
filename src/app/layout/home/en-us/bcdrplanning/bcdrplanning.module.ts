import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BcdrplanningRoutingModule } from './bcdrplanning-routing.module';
import { BcdraddComponent } from './bcdradd/bcdradd.component';
import { BcdrlistComponent } from './bcdrlist/bcdrlist.component';
import { BcdrviewComponent } from './bcdrview/bcdrview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BcdrlistComponent, BcdraddComponent, BcdrviewComponent],
  imports: [
    CommonModule,
    BcdrplanningRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BcdrplanningModule { }
