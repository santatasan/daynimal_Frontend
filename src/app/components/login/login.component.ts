import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private toastService: ToastService) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const res = await this.usersService.login(this.form.value);
      localStorage.setItem('token', res.token);
      const username = (await this.usersService.getProfile()).username!;
      this.toastService.newToast({ text: 'Login correcto.', messageType: msgType.success });
      setTimeout(() => {
        this.router.navigate(['/animals']);
        this.usersService.logged(true);
        this.usersService.usernameChanged(username);
      }, 1000);
    } catch (err) {
      this.toastService.newToast({ text: 'El email y/o la contraseña son incorrectos.', messageType: msgType.error });
    };
  };
};
