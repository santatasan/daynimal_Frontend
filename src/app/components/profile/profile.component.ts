import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User;
  edit: boolean;

  constructor(private usersService: UsersService) {

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      check_pass: new FormControl(),
      last_password: new FormControl(),
      password: new FormControl(),
      repeat_password: new FormControl(),
    });

    this.user = { username: '', email: '', password: '', id: 0 };
    this.edit = false;
  };

  async ngOnInit() {
    try {
      this.user = await this.usersService.getProfile();
      this.form.controls['username'].setValue(this.user.username);
    } catch (err: any) {
      console.log(err); //TODO Ver qué pongo aquí
    };
    this.form.disable();
    this.form.controls['check_pass'].valueChanges.subscribe(value => {
      if (value) {
        this.setValidatorRequired('last_password', Validators.required);
        this.setValidatorRequired('password', Validators.required);
        this.form.setValidators([this.passwordValidator, this.lastPasswordValidator]);
      } else {
        this.setValidatorRequired('last_password', null);
        this.setValidatorRequired('password', null);
        this.form.get('password')!.setErrors(null);
        this.form.get('repeat_password')!.setErrors(null);
        this.form.removeValidators(this.passwordValidator);
        this.form.removeValidators(this.lastPasswordValidator);
      };
    });
  };

  async onSubmit() {
    try {
      (this.form.value.check_pass) ? await this.usersService.update({ ...this.form.value, email: this.user.email }) : await this.usersService.update({ ...this.form.value, password: this.user.password, email: this.user.email });
      this.form.reset();
      this.user = await this.usersService.getProfile();
      this.form.controls['username'].setValue(this.user.username);
      this.usersService.usernameChanged(this.user.username);
      this.form.disable();
      this.edit = false;
      alert('Perfil actualizado.')
    } catch (err: any) {
      alert('El perfil no se ha actualizado. Por favor revisa los datos introducidos.');
    }
  };

  onClick() {
    this.form.enable();
    this.edit = true;
  };

  onCancel() {
    this.form.reset();
    this.form.controls['username'].setValue(this.user.username);
    this.edit = false;
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
    };
  };

  lastPasswordValidator(form: AbstractControl) {
    const lastPasswordValue = form.get('last_password')?.value;
    const passwordValue = form.get('password')?.value;

    if (form.get('password')?.hasError('required')) {
      if (passwordValue === lastPasswordValue) {
        form.get('password')!.setErrors({ lastpasswordvalidator: true, required: true });
        return { lastpasswordvalidator: true };
      };
      return null;
    } else if (passwordValue === lastPasswordValue) {
      form.get('password')!.setErrors({ lastpasswordvalidator: true });
      return { lastpasswordvalidator: true };
    } else {
      form.get('password')!.setErrors(null);
      return null;
    };
  };

  setValidatorRequired(controlName: string, validator: any) {

    this.form.controls[controlName].setValidators(validator);
    this.form.controls[controlName].updateValueAndValidity();
  };
};
