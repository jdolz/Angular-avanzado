import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchesComponent } from './searches/searches.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
  { path: 'searches/:term', component: SearchesComponent, data: { titulo: 'Searches' } },

  // Maintenance
  { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'Hospitals' } },
  { path: 'doctors', component: DoctorsComponent, data: { titulo: 'Doctors' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { titulo: 'Doctor' } },

  // Admin only
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { titulo: 'Users' } }
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }


