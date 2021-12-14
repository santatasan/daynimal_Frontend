import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageToast } from '../interfaces/messageToast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastMessage$: Subject<MessageToast>;

  constructor() {
    this.toastMessage$ = new Subject();
  };

  newToast(message: MessageToast) {
    message.iat = new Date();
    this.toastMessage$.next(message);
  };

  toastObs() {
    return this.toastMessage$.asObservable();
  };
}
