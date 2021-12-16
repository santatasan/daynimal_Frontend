import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { obtainToken } from '../../environments/environment';
import { Animal } from '../interfaces/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private baseUrl: string;
  private animal$: Subject<Animal>;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/animals";
    this.animal$ = new Subject();
  };

  getAll(): Promise<Animal[]> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Animal[]>(this.baseUrl, httpOptions));
  };

  getById(animalId: number): Promise<Animal> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<Animal>(`${this.baseUrl}/${animalId}`, httpOptions));
  };

  create(formValues: Animal): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.post<any>(this.baseUrl, formValues, httpOptions));
  };

  update(formValues: Animal, animalId: number): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${animalId}`, formValues, httpOptions));
  };

  delete(animalId: number): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${animalId}`, httpOptions));
  };

  animalChanged(animal: Animal) {
    this.animal$.next(animal);
  };

  animalObs() {
    return this.animal$.asObservable();
  };
};
