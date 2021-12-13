import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { obtainToken } from '../../environments/environment';
import { Animal } from '../interfaces/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/animals";
  };

  getAll(): Promise<Animal[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Animal[]>(this.baseUrl, httpOptions));
  };

  create(formValues: Animal): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<Animal[]>(this.baseUrl, formValues, httpOptions));
  }
}
