import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Medication } from 'src/app/interfaces/medication.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { MedicationsService } from 'src/app/services/medications.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-medication',
  templateUrl: './new-medication.component.html',
  styleUrls: ['./new-medication.component.css']
})
export class NewMedicationComponent implements OnInit {

  form: FormGroup;
  @Input() animalId: number;
  @Input() medication: Medication;
  @Input() edit: boolean;
  @Output() newMedication: EventEmitter<boolean> = new EventEmitter();

  constructor(private medicationsService: MedicationsService, private toastService: ToastService) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dosage: new FormControl('', [Validators.required]),
      repetition: new FormControl('', [Validators.required, Validators.pattern(/^(?:[1-9]|[1-4][0-9]|5[0-2])$/)]),
      r_unit: new FormControl('hours'),
      start: new FormControl('', [Validators.required]),
      finish: new FormControl('', [Validators.required])
    }, [this.dateValidator]);
    this.animalId = 0;
    this.edit = false;
    this.medication = { name: '', dosage: '', repetition: 0, r_unit: '', start: new Date(), finish: new Date(), finished: 0 };
  }

  ngOnInit(): void {
  };

  ngOnChanges() {
    if (this.edit) {
      this.form.controls['name'].setValue(this.medication.name);
      this.form.controls['dosage'].setValue(this.medication.dosage);
      this.form.controls['repetition'].setValue(this.medication.repetition);
      this.form.controls['r_unit'].setValue(this.medication.r_unit);
      this.form.controls['start'].setValue(this.medication.start.toString().split('T')[0]);
      this.form.controls['finish'].setValue(this.medication.finish.toString().split('T')[0]);
    };
  };

  async onSubmit() {
    if (!this.edit) {
      try {
        (new Date(this.form.value.finish).getTime() - Date.now() < 0) ? this.form.value.finished = 1 : this.form.value.finished = 0;
        await this.medicationsService.create(this.animalId, this.form.value);
        this.toastService.newToast({ text: 'Registrado con éxito.', messageType: msgType.success });
        this.newMedication.emit(true);
        this.resetForm();
      } catch (err: any) {
        this.toastService.newToast({ text: 'Algo ha ido mal.', messageType: msgType.error });
      }
    } else {
      try {
        (new Date(this.form.value.finish).getTime() - Date.now() < 0) ? this.form.value.finished = 1 : this.form.value.finished = 0;
        await this.medicationsService.update(this.medication.id!, this.form.value);
        this.toastService.newToast({ text: 'El registro ha sido actualizado.', messageType: msgType.success });
        this.newMedication.emit(true);
      } catch (err: any) {
        this.onCancel();
        this.toastService.newToast({ text: 'No se ha podido registrar el cambio.', messageType: msgType.error });
      }
    }
  };

  onCancel() {
    this.resetForm();
    this.newMedication.emit(false);
  };

  async onDelete() {
    const sure = confirm('¿Estas seguro de eliminar el registro?'); //TODO cambiar esto por un modal?
    if (sure) {
      try {
        await this.medicationsService.delete(this.medication.id!);
        this.toastService.newToast({ text: 'El registro ha sido eliminado.', messageType: msgType.success });
        this.newMedication.emit(true);
        this.resetForm();
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

  resetForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dosage: new FormControl('', [Validators.required]),
      repetition: new FormControl('', [Validators.required, Validators.pattern(/^(?:[1-9]|[1-4][0-9]|5[0-2])$/)]),
      r_unit: new FormControl('hours'),
      start: new FormControl('', [Validators.required]),
      finish: new FormControl('', [Validators.required])
    }, [this.dateValidator]);
  };

  dateValidator(form: AbstractControl) {
    const start = form.get('start')?.value;
    const finish = form.get('finish')?.value;

    if (form.get('finish')?.hasError('required')) {
      if (finish < start) {
        form.get('finish')!.setErrors({ datevalidator: true, required: true });
        return { datevalidator: true };
      };
      return null;
    } else if (finish < start) {
      form.get('finish')!.setErrors({ datevalidator: true });
      return { datevalidator: true };
    } else {
      form.get('finish')!.setErrors(null);
      return null;
    };
  };
}
