import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { VetVisit } from 'src/app/interfaces/vetVisit.interface';
import { ToastService } from 'src/app/services/toast.service';
import { VetVisitsService } from 'src/app/services/vet-visits.service';

@Component({
  selector: 'app-new-vet-visit',
  templateUrl: './new-vet-visit.component.html',
  styleUrls: ['./new-vet-visit.component.css']
})
export class NewVetVisitComponent implements OnInit {

  form: FormGroup;
  @Input() animalId: number;
  @Input() vetVisit: VetVisit;
  @Input() edit: boolean;
  @Output() newVetVisit: EventEmitter<boolean> = new EventEmitter();

  constructor(private vetVisitsService: VetVisitsService, private toastService: ToastService) {

    this.form = new FormGroup({
      vet: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      date: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])\d{1,5}(?:\.\d{1,2})?$/)]),
      notes: new FormControl(),
    });
    this.animalId = 0;
    this.edit = false;
    this.vetVisit = { vet: '', date: new Date(), price: 0 };
  }

  ngOnInit(): void {
  };

  ngOnChanges() {
    if (this.edit) {
      this.form.controls['vet'].setValue(this.vetVisit.vet);
      this.form.controls['date'].setValue(this.vetVisit.date.toString().split('T')[0]);
      this.form.controls['price'].setValue(this.vetVisit.price);
      this.form.controls['notes'].setValue(this.vetVisit.notes);
    };
  };

  async onSubmit() {
    if (!this.edit) {
      try {
        await this.vetVisitsService.create(this.animalId, this.form.value);
        this.toastService.newToast({ text: 'Registrado con éxito.', messageType: msgType.success });
        this.newVetVisit.emit(true);
        this.form.reset();
      } catch (err: any) {
        this.toastService.newToast({ text: 'Algo ha ido mal.', messageType: msgType.error });
      }
    } else {
      try {
        await this.vetVisitsService.update(this.vetVisit.id!, this.form.value);
        this.toastService.newToast({ text: 'El registro ha sido actualizado.', messageType: msgType.success });
        this.newVetVisit.emit(true);
      } catch (err: any) {
        this.toastService.newToast({ text: 'No se ha podido registrar el cambio.', messageType: msgType.error });
      }
    }
  };

  onCancel() {
    this.form.reset();
    this.newVetVisit.emit(false);
  };

  async onDelete() {
    const sure = confirm('¿Estas seguro de eliminar el registro?'); //TODO cambiar esto por un modal?
    if (sure) {
      try {
        await this.vetVisitsService.delete(this.vetVisit.id!);
        this.toastService.newToast({ text: 'El registro ha sido eliminado.', messageType: msgType.success });
        this.newVetVisit.emit(true);
        this.form.reset();
      } catch (err: any) {
        this.onCancel();
        this.toastService.newToast({ text: 'No se ha podido eliminar el registro.', messageType: msgType.error });
      }
    } else {
      this.onCancel();
    }
  };

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };

}
