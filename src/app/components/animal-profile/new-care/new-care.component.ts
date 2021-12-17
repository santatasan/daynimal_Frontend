import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { CaresService } from 'src/app/services/cares.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-care',
  templateUrl: './new-care.component.html',
  styleUrls: ['./new-care.component.css']
})
export class NewCareComponent implements OnInit {

  form: FormGroup;
  @Input() animalId: number;
  @Input() route: string;

  constructor(private caresService: CaresService, private toastService: ToastService) {

    this.form = new FormGroup({
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      notes: new FormControl(),
    });
    this.animalId = 0;
    this.route = '';
  }

  ngOnInit(): void {
    if (this.route === 'vaccine') this.form.controls['type'].setValue(this.route);
  }

  async onSubmit() {
    try {
      await this.caresService.create(this.animalId, this.form.value);
      this.toastService.newToast({ text: 'El cuidado ha sido registrado.', messageType: msgType.success });
      this.onCancel();
      this.caresService.careChange();
    } catch (err: any) {
      this.toastService.newToast({ text: 'No se ha podido registrar el cuidado.', messageType: msgType.error });
    }
  };

  onCancel() {
    this.form.reset();
    if (this.route === 'vaccine') this.form.controls['type'].setValue(this.route);
  }

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };
}
