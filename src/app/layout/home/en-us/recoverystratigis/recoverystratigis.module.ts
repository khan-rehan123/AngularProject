import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverystratigisRoutingModule } from './recoverystratigis-routing.module';
import { RecoverylistComponent } from './recoverylist/recoverylist.component';
import { AddupdaterecoveryComponent } from './addupdaterecovery/addupdaterecovery.component';
import { ViewrecoveryComponent } from './viewrecovery/viewrecovery.component';


@NgModule({
  declarations: [RecoverylistComponent, AddupdaterecoveryComponent, ViewrecoveryComponent],
  imports: [
    CommonModule,
    RecoverystratigisRoutingModule
  ]
})
export class RecoverystratigisModule { }
