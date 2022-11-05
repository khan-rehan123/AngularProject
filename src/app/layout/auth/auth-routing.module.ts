import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren:() =>import('./login/login.module' ).then(m=>m.LoginModule)
      },
      {
        path: 'forgotpassword',
        loadChildren:() =>import('./forgot/forgot.module' ).then(m=>m.ForgotModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
