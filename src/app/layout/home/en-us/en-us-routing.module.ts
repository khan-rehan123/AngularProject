import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'bia',
    loadChildren:()=>import('./bia/bia.module').then(m=>m.BiaModule)
  },
  {
    path : 'bcmprogram',
    loadChildren:()=>import('./bcm-program/bcm-program.module').then(m=>m.BcmProgramModule)

  }, {
    path : 'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:'users',
    loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)
  },
  {
    path:'organisation',
    loadChildren:()=>import('./organisation/organisation.module').then(m=>m.OrganisationModule)
  },
  {path:'department',loadChildren:()=>import('./department/department.module').then(m=>m.DepartmentModule)},
  {path :"businessTesting",loadChildren:()=>import('./business-cont-testing/business-cont-testing.module').then(m=>m.BusinessContTestingModule)},
  {path :"businessStratigies",loadChildren:()=>import('./business-cont-strag/business-cont-strag.module').then(m=>m.BusinessContStragModule)},
  {path :"bcdrplanning",loadChildren:()=>import('./bcdrplanning/bcdrplanning.module').then(m=>m.BcdrplanningModule)},
  {path :"incidentManagement",loadChildren:()=>import('./incidentmanagement/incidentmanagement.module').then(m=>m.IncidentmanagementModule)}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnUsRoutingModule { }
