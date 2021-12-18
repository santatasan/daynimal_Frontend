import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { obtainToken } from 'src/environments/environment';
import { VetVisit } from '../interfaces/vetVisit.interface';

@Injectable({
  providedIn: 'root'
})
export class VetVisitsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/vetvisits";
  };

  getAll(animalId: number): Promise<VetVisit[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<VetVisit[]>(`${this.baseUrl}/${animalId}`, httpOptions));
  };

  create(animalId: number, formValues: VetVisit): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${animalId}`, formValues, httpOptions));
  };

  update(vetVisitId: number, formValues: VetVisit): Promise<any> {
    const httpOptions = obtainToken();
    formValues.id = vetVisitId;
    return firstValueFrom(this.httpClient.put<any>(this.baseUrl, formValues, httpOptions));
  };

  delete(vetVisitId: number): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${vetVisitId}`, httpOptions));
  };
}
