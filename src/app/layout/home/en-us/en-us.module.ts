import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnUsRoutingModule } from './en-us-routing.module';
import { EnUsComponent } from './en-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class EnUsModule { }
