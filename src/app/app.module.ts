import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AnimalProfileComponent } from './components/animal-profile/animal-profile.component';
import { NewAnimalComponent } from './components/animals/new-animal/new-animal.component';
import { ToastComponent } from './components/toast/toast.component';
import { SidebarComponent } from './components/animal-profile/sidebar/sidebar.component';
import { InfoComponent } from './components/animal-profile/info/info.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AnimalsComponent,
    MenuComponent,
    FooterComponent,
    ProfileComponent,
    AnimalProfileComponent,
    NewAnimalComponent,
    ToastComponent,
    SidebarComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
