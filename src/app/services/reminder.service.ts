import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { obtainToken } from 'src/environments/environment';
import { Reminder } from '../interfaces/reminder.interface';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/reminders";
  };

  getAllReminders(): Promise<Reminder[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Reminder[]>(this.baseUrl, httpOptions));
  };

  getAllRemindersByType(type: string): Promise<Reminder[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Reminder[]>(`${this.baseUrl}/type/${type}`, httpOptions));
  };

  getAllRemindersByAnimal(animalId: number): Promise<Reminder[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Reminder[]>(`${this.baseUrl}/animal/${animalId}`, httpOptions));
  };

  createReminder(animalId: number, formValues: Reminder): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${animalId}`, formValues, httpOptions));
  };

  updateReminder(reminderId: number, formValues: Reminder): Promise<any> {
    const httpOptions = obtainToken();
    formValues.id = reminderId;
    return firstValueFrom(this.httpClient.put<any>(this.baseUrl, formValues, httpOptions));
  };

  deleteReminder(reminderId: number): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${reminderId}`, httpOptions));
  };
}
