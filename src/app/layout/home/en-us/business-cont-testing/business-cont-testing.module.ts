import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessContTestingRoutingModule } from './business-cont-testing-routing.module';
import { AddupdatetestingComponent } from './addupdatetesting/addupdatetesting.component';
import { ViewtestingComponent } from './viewtesting/viewtesting.component';
import { ListtestingComponent } from './listtesting/listtesting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddupdatetestingComponent, ViewtestingComponent, ListtestingComponent],
  imports: [
    CommonModule,
    BusinessContTestingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BusinessContTestingModule { }
