import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: string;
  valid: string;

  constructor(private usersService: UsersService, private router: Router) {

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)]),
      password: new FormControl('', [Validators.required]),
      repeat_password: new FormControl(),
    }, [this.passwordValidator]);
    this.error = '';
    this.valid = '';
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const formValue = { username: this.form.value.username, email: this.form.value.email, password: this.form.value.password };
      await this.usersService.register(formValue);
      this.error = '';
      this.valid = 'Usuario registrado.';
      setTimeout(() => this.router.navigate(['/login']), 2500);
    } catch (err) {
      this.error = 'El usuario no ha podido registrarse, modifique los datos.';
    };
  };

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };

  passwordValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value;
    const repeatPasswordValue = form.get('repeat_password')?.value;

    if (passwordValue === repeatPasswordValue) {
      form.get('repeat_password')!.setErrors(null);
      return null;
    } else {
      form.get('repeat_password')!.setErrors({ passwordvalidator: true });
      return { passwordvalidator: true };
    }
  };

}
