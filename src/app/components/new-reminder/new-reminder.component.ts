import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Animal } from 'src/app/interfaces/animal.interface';
import { Medication } from 'src/app/interfaces/medication.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { AnimalsService } from 'src/app/services/animals.service';
import { RemindersService } from 'src/app/services/reminder.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.css']
})
export class NewReminderComponent implements OnInit {

  form: FormGroup;
  @Input() animalId: number;
  @Input() route: string;
  @Input() arrMedications: Medication[];
  animal: Animal;

  constructor(private remindersService: RemindersService, private toastService: ToastService, private animalsService: AnimalsService) {
    this.form = new FormGroup({
      type: new FormControl('', [Validators.required]),
      start_date: new FormControl(),
      reminder_date: new FormControl('', [Validators.required]),
      description: new FormControl(),
      animal: new FormControl(),
    });
    this.animalId = 0;
    this.route = '';
    this.animal = { name: '', gender: '', specie: '', breed: '', size: '', color: '', weight: '', w_unit: '', spayed: 0, birthday: new Date() };
    this.arrMedications = [];
  };

  async ngOnInit() {
    this.animal = await this.animalsService.getById(this.animalId);
    if (this.route === 'vaccine' || this.route === 'vetvisit') this.form.controls['type'].setValue(this.route);
    if (this.route !== 'medication') {
      this.form.controls['description'].setValidators(Validators.required);
      this.form.controls['description'].updateValueAndValidity();;
    }
  };

  async onSubmit() {
    if (this.route === 'medication') {
      this.form.controls['description'].setValue(this.arrMedications[this.form.value.type].name);
      this.form.controls['type'].setValue('medication');
    }
    try {
      this.form.controls['animal'].setValue(this.animal.name);
      this.form.controls['start_date'].setValue(new Date().toLocaleDateString('en-CA'));
      await this.remindersService.createReminder(this.animalId, this.form.value);
      this.toastService.newToast({ text: 'Registrado con éxito.', messageType: msgType.success });
      this.onCancel();
    } catch (err: any) {
      this.toastService.newToast({ text: 'Algo ha ido mal.', messageType: msgType.error });
    }
  };

  onCancel() {
    this.form.reset();
    if (this.route !== 'medication') {
      this.form.controls['description'].setValidators(Validators.required);
      this.form.controls['description'].updateValueAndValidity();;
    }
  };

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };

}
