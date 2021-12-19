import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { obtainToken } from 'src/environments/environment';
import { Medication } from '../interfaces/medication.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/medications";
  };

  getAll(animalId: number): Promise<Medication[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Medication[]>(`${this.baseUrl}/${animalId}`, httpOptions));
  };

  create(animalId: number, formValues: Medication): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${animalId}`, formValues, httpOptions));
  };

  update(medicationId: number, formValues: Medication): Promise<any> {
    const httpOptions = obtainToken();
    formValues.id = medicationId;
    return firstValueFrom(this.httpClient.put<any>(this.baseUrl, formValues, httpOptions));
  };

  delete(medicationId: number): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${medicationId}`, httpOptions));
  };
}
