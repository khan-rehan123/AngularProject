import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AccessGuard } from './shared/access.guard';
import { EnUsComponent } from './layout/home/en-us/en-us.component';

export const routes: Routes = [
    {
        path:'',canActivate:[AccessGuard],
        component:EnUsComponent,
        loadChildren:() =>import('./layout/home/en-us/en-us.module').then(m=>m.EnUsModule)
      },
      {
        path:'en-us',canActivate:[AccessGuard],
        component:EnUsComponent,
        loadChildren:() =>import('./layout/home/en-us/en-us.module').then(m=>m.EnUsModule)
      },
       //auth route
  {
    path: 'auth',
    loadChildren:() =>import('./layout/auth/auth.module' ).then(m=>m.AuthModule)
    // loadChildren: './layout/auth/auth.module#AuthModule'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);