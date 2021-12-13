import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})
export class NewAnimalComponent implements OnInit {

  form: FormGroup;

  constructor(private animalsService: AnimalsService) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      specie: new FormControl('', [Validators.required]),
      breed: new FormControl(),
      size: new FormControl('m'),
      color: new FormControl(),
      weight: new FormControl(),
      w_unit: new FormControl('kg'),
      spayed: new FormControl(0),
      birthday: new FormControl(),
      image: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      await this.animalsService.create(this.form.value);
      alert("Animal registrado");
      this.onCancel();
    } catch (err: any) {
      alert(err.error.error);
      this.onCancel();
    }
  };

  onCancel() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      specie: new FormControl('', [Validators.required]),
      breed: new FormControl(),
      size: new FormControl('m'),
      color: new FormControl(),
      weight: new FormControl(),
      w_unit: new FormControl('kg'),
      spayed: new FormControl(0),
      birthday: new FormControl(),
      image: new FormControl(),
    });
  }

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };
}
