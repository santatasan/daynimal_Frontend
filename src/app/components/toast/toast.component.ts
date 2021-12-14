import { Component, OnInit } from '@angular/core';
import { MessageToast } from 'src/app/interfaces/messageToast.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  arrToasts: MessageToast[];

  constructor(private toastService: ToastService) {
    this.arrToasts = [];
  };

  ngOnInit(): void {
    this.toastService.toastObs().subscribe(message => {
      this.arrToasts.push(message);
      setTimeout(() => {
        this.arrToasts.shift();
      }, 3500);
    });
  };

};
