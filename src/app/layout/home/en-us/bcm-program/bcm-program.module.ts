import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BcmProgramRoutingModule } from './bcm-program-routing.module';
import { BcmListComponent } from './bcm-list/bcm-list.component';
import { BcmAddupdateComponent } from './bcm-addupdate/bcm-addupdate.component';
import { BcmViewComponent } from './bcm-view/bcm-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProjectComponent } from './project/project.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProcessaddComponent } from './processadd/processadd.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { ProjectviewComponent } from './projectview/projectview.component';
import { ProcessviewComponent } from './processview/processview.component';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { ApplicationaddComponent } from './applicationadd/applicationadd.component';
import { ViewapplicationComponent } from './viewapplication/viewapplication.component';
import { BCMAdminListComponent } from './bcmadmin-list/bcmadmin-list.component';


@NgModule({
  declarations: [BcmListComponent, BCMAdminListComponent,BcmAddupdateComponent, BcmViewComponent,DeleteDialogComponent, ProjectComponent, ProjectlistComponent, ProcessaddComponent, ProcesslistComponent, ProjectviewComponent, ProcessviewComponent, ApplicationlistComponent, ApplicationaddComponent, ViewapplicationComponent, BCMAdminListComponent],
  imports: [
    CommonModule,
    BcmProgramRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents :[DeleteDialogComponent]
})
export class BcmProgramModule { }
