import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    loadChildren:()=>import('./home-page/home-page.module').then(module=>module.HomePageModule)
  },
  {
    path: 'create',
    loadChildren:()=>import('./create-employee-page/create-employee-page.module').then(module=>module.CreateEmployeePageModule)
  },
  {
    path: 'update/:id',
    loadChildren:()=>import('./update-employee-page/update-employee-page.module').then(module=>module.UpdateEmployeePageModule)
  },
  {
    path: 'employee-details/:id',
    loadChildren:()=>import('./view-employee-details-page/view-employee-details-page.module').then(module=>module.ViewEmployeeDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
