import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalProfileComponent } from './components/animal-profile/animal-profile.component';
import { CaresComponent } from './components/animal-profile/cares/cares.component';
import { DewormingComponent } from './components/animal-profile/deworming/deworming.component';
import { InfoComponent } from './components/animal-profile/info/info.component';
import { OneCareComponent } from './components/animal-profile/one-care/one-care.component';
import { VaccinesComponent } from './components/animal-profile/vaccines/vaccines.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/animals' },
  { path: 'animals', component: AnimalsComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard] },
  {
    path: 'animals/:animalId', component: AnimalProfileComponent, canActivate: [LoggedGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'info', component: InfoComponent },
      {
        path: 'cares', component: CaresComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'bath' },
          { path: ':type', component: OneCareComponent },
        ]
      },
      { path: 'deworming', component: DewormingComponent },
      { path: 'vaccines', component: VaccinesComponent },
    ]
  },
  { path: '**', redirectTo: '/animals' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
