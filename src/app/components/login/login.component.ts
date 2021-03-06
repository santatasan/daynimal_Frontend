import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: string;
  valid: string;

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.error = '';
    this.valid = '';
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const res = await this.usersService.login(this.form.value);
      localStorage.setItem('token', res.token);
      this.error = '';
      this.valid = 'Login correcto';
      setTimeout(() => this.router.navigate(['/animals']), 2500);
      this.usersService.logged(true);
    } catch (err) {
      this.error = 'El email y/o la contraseña son incorrectos.';
    };
  };
};
