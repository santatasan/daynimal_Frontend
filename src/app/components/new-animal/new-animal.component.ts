import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { AnimalsService } from 'src/app/services/animals.service';
import { ToastService } from 'src/app/services/toast.service';

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
      this.toastService.newToast({ text: 'El animal ha sido registrado.', messageType: msgType.success });
      this.newAnimal.emit(true);
      this.onCancel();
    } catch (err: any) {
      this.toastService.newToast({ text: 'El animal ya existe.', messageType: msgType.error });
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
