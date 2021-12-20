import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Care } from 'src/app/interfaces/care.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { CaresService } from 'src/app/services/cares.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-care',
  templateUrl: './edit-care.component.html',
  styleUrls: ['./edit-care.component.css']
})
export class EditCareComponent implements OnInit {

  form: FormGroup;
  care: Care;
  @Input() route: string;

  constructor(private caresService: CaresService, private toastService: ToastService) {

    this.care = { type: '', date: new Date(), place: '' };

    this.form = new FormGroup({
      type: new FormControl(this.care.type),
      date: new FormControl(new Date(this.care.date).toLocaleDateString('en-CA'), [Validators.required]),
      place: new FormControl(this.care.place),
      notes: new FormControl(this.care.notes),
    });
    this.route = '';
  }

  ngOnInit(): void {
    this.caresService.careObs().subscribe(value => {
      this.care = value;
      this.form = new FormGroup({
        type: new FormControl(this.care.type),
        date: new FormControl(new Date(this.care.date).toLocaleDateString('en-CA'), [Validators.required]),
        place: new FormControl(this.care.place),
        notes: new FormControl(this.care.notes),
      });
    });
  }

  async onSubmit() {
    try {
      await this.caresService.update(this.care.id!, this.form.value);
      this.toastService.newToast({ text: 'El registro ha sido actualizado.', messageType: msgType.success });
      this.caresService.careChange(this.care);
    } catch (err: any) {
      this.toastService.newToast({ text: 'No se ha podido registrar el cambio.', messageType: msgType.error });
    }
  };

  async onDelete() {
    const sure = confirm('¿Estas seguro de eliminar el registro?'); //TODO cambiar esto por un modal?
    if (sure) {
      try {
        await this.caresService.delete(this.care.id!);
        this.toastService.newToast({ text: 'El registro ha sido eliminado.', messageType: msgType.success });
        this.caresService.careChange(this.care);
      } catch (err: any) {
        this.toastService.newToast({ text: 'No se ha podido eliminar el registro.', messageType: msgType.error });
      }
    };
  };

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };

}
