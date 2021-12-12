import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { obtainToken } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

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

  getProfile(): Promise<User> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.get<User>(this.baseUrl, httpOptions));
  };

  register(formValues: User): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, formValues));
  };

  login(formValues: User): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, formValues));
  };

  update(formValues: any): Promise<any> {
    const httpOptions = obtainToken();
    return firstValueFrom(this.httpClient.put<any>(this.baseUrl, formValues, httpOptions));
  }

  logged(isLogged: boolean) {
    this.login$.next(isLogged);
  };

  loginObs() {
    return this.login$.asObservable();
  };
};
