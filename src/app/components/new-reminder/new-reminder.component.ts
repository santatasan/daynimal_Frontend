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
      interval: new FormControl(),
      r_unit: new FormControl(),
      repetitions: new FormControl(),
      reminder_date: new FormControl('', [Validators.required]),
      description: new FormControl(),
      animal: new FormControl(),
      check: new FormControl(),
    });
    this.animalId = 0;
    this.route = '';
    this.animal = { name: '', gender: '', specie: '', breed: '', size: '', color: '', weight: '', w_unit: '', spayed: 0, birthday: new Date() };
    this.arrMedications = [];
  };

  async ngOnInit() {
    this.animal = await this.animalsService.getById(this.animalId);
    if (this.route === 'vaccine' || this.route === 'vetvisit') this.form.controls['type'].setValue(this.route);
    if (this.route !== 'medication') this.setValidator('description', Validators.required);
    this.form.controls['check'].valueChanges.subscribe(value => {
      if (value) {
        this.setValidator('interval', Validators.required);
        this.setValidator('repetitions', Validators.required);
        this.form.controls['r_unit'].setValue('days');
      } else {
        this.setValidator('interval', null);
        this.setValidator('repetitions', null);
        this.form.get('interval')!.setErrors(null);
        this.form.get('repetitions')!.setErrors(null);
      };
    });
  };

  async onSubmit() {
    if (this.route === 'medication') {
      this.form.controls['description'].setValue(this.arrMedications[this.form.value.type].name);
      this.form.controls['type'].setValue('medication');
    };
    try {
      this.form.controls['animal'].setValue(this.animal.name);
      this.form.controls['start_date'].setValue(new Date().toLocaleDateString('en-CA'));
      await this.remindersService.createReminder(this.animalId, this.form.value);
      if (this.form.value.check) {
        for (let i = 1; i <= parseInt(this.form.value.repetitions); i++) {
          if (this.form.value.r_unit === 'days') {
            const date = new Date(this.form.value.reminder_date).setDate(new Date(this.form.value.reminder_date).getDate() + parseInt(this.form.value.interval));
            this.form.controls['reminder_date'].setValue(new Date(date).toLocaleDateString('en-CA'));
          } else {
            const date = new Date(this.form.value.reminder_date).setDate(new Date(this.form.value.reminder_date).getDate() + (parseInt(this.form.value.interval) * 7));
            this.form.controls['reminder_date'].setValue(new Date(date).toLocaleDateString('en-CA'));
          }
          await this.remindersService.createReminder(this.animalId, this.form.value);
        };
      }
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

  setValidator(controlName: string, validator: any) {

    this.form.controls[controlName].setValidators(validator);
    this.form.controls[controlName].updateValueAndValidity();
  };
}
