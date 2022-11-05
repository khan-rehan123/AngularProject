import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessContStragRoutingModule } from './business-cont-strag-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessStratigieslistComponent, remarkDialogClass, viewDialogClassForStat } from './business-stratigieslist/business-stratigieslist.component';
import { BusinessStratigiesaddComponent } from './business-stratigiesadd/business-stratigiesadd.component';
import { BusinessStratigiesviewComponent } from './business-stratigiesview/business-stratigiesview.component';
import { StratigieslistfornonadminComponent } from './stratigieslistfornonadmin/stratigieslistfornonadmin.component';
import {viewDialogClassForStatNA } from './stratigieslistfornonadmin/stratigieslistfornonadmin.component';

@NgModule({
  declarations: [viewDialogClassForStatNA,BusinessStratigieslistComponent, BusinessStratigiesaddComponent, BusinessStratigiesviewComponent,remarkDialogClass, StratigieslistfornonadminComponent,viewDialogClassForStat],
  imports: [
    CommonModule,
    BusinessContStragRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[remarkDialogClass,viewDialogClassForStat,viewDialogClassForStatNA]
})
export class BusinessContStragModule { }
