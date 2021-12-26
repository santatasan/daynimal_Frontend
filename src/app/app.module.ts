import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
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
import { CaresComponent } from './components/animal-profile/cares/cares.component';
import { NewCareComponent } from './components/animal-profile/new-care/new-care.component';
import { OneCareComponent } from './components/animal-profile/one-care/one-care.component';
import { VaccinesComponent } from './components/animal-profile/vaccines/vaccines.component';
import { DewormingComponent } from './components/animal-profile/deworming/deworming.component';
import { TwoCaresComponent } from './components/animal-profile/deworming/two-cares/two-cares.component';
import { EditCareComponent } from './components/animal-profile/edit-care/edit-care.component';
import { VetVisitsComponent } from './components/animal-profile/vet-visits/vet-visits.component';
import { NewVetVisitComponent } from './components/animal-profile/vet-visits/new-vet-visit/new-vet-visit.component';
import { MedicationsComponent } from './components/animal-profile/medications/medications.component';
import { NewMedicationComponent } from './components/animal-profile/medications/new-medication/new-medication.component';
import { NewReminderComponent } from './components/new-reminder/new-reminder.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppComponent } from './app.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

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
    InfoComponent,
    CaresComponent,
    NewCareComponent,
    OneCareComponent,
    VaccinesComponent,
    DewormingComponent,
    TwoCaresComponent,
    EditCareComponent,
    VetVisitsComponent,
    NewVetVisitComponent,
    MedicationsComponent,
    NewMedicationComponent,
    NewReminderComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
