import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { obtainToken } from 'src/environments/environment';
import { Care } from '../interfaces/care.interface';

@Injectable({
  providedIn: 'root'
})
export class CaresService {

  private baseUrl: string;
  private care$: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/cares";
    this.care$ = new Subject();
  }

  getAllByType(animalId: number, type: string): Promise<Care[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Care[]>(`${this.baseUrl}/${animalId}/${type}`, httpOptions));
  };

  create(animalId: number, formValues: Care): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${animalId}`, formValues, httpOptions));
  };

  careChange() {
    this.care$.next();
  };

  careObs() {
    return this.care$.asObservable();
  };
}
