import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { msgType } from '../../../interfaces/messageToast.interface';
import { AnimalsService } from '../../../services/animals.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})
export class NewAnimalComponent implements OnInit {

  form: FormGroup;
  @Output() newAnimal: EventEmitter<boolean> = new EventEmitter();

  constructor(private animalsService: AnimalsService, private toastService: ToastService) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      specie: new FormControl('', [Validators.required]),
      breed: new FormControl(),
      size: new FormControl('m'),
      color: new FormControl(),
      weight: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[1-9])\d{1,3}(?:\.\d{1,2})?$/)]),
      w_unit: new FormControl('kg'),
      spayed: new FormControl(0),
      birthday: new FormControl('', [Validators.required]),
      image: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      await this.animalsService.create(this.form.value);
      this.toastService.newToast({ text: 'El animal ha sido registrado.', messageType: msgType.success });
      this.newAnimal.emit(true);
      this.onCancel();
    } catch (err: any) {
      this.toastService.newToast({ text: 'Ya existe un animal con ese nombre y género.', messageType: msgType.error });
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
      weight: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[1-9])\d{1,3}(?:\.\d{1,2})?$/)]),
      w_unit: new FormControl('kg'),
      spayed: new FormControl(0),
      birthday: new FormControl('', [Validators.required]),
      image: new FormControl(),
    });
  }

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };
}
