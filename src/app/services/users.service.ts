import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;
  private login$: Subject<boolean>;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = "http://localhost:3000/api/users";
    this.login$ = new Subject();
  };

  register(formValues: any): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, formValues));
  };

  login(formValues: any): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, formValues));
  };

  logged(isLogged: boolean) {
    this.login$.next(isLogged);
  };

  loginObs() {
    return this.login$.asObservable();
  };
};
