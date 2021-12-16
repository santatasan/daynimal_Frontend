import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { AnimalsService } from 'src/app/services/animals.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  animal: Animal;
  animalId: number;
  form: FormGroup;
  edit: boolean;

  constructor(private animalsService: AnimalsService, private activatedRoute: ActivatedRoute, private toastService: ToastService, private router: Router) {

    this.animal = { name: '', gender: '', specie: '', breed: '', size: '', color: '', weight: '', w_unit: '', spayed: 0, birthday: new Date() };
    this.animalId = 0;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl(),
      specie: new FormControl('', [Validators.required]),
      breed: new FormControl(),
      size: new FormControl(),
      color: new FormControl(),
      weight: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[1-9])\d{1,3}(?:\.\d{1,2})?$/)]),
      w_unit: new FormControl(),
      spayed: new FormControl(),
      birthday: new FormControl('', [Validators.required]),
      image: new FormControl(),
    });
    this.edit = false;
  }

  async ngOnInit() {
    try {
      this.activatedRoute.parent!.params.subscribe(value => this.animalId = value['animalId']);
      this.animal = await this.animalsService.getById(this.animalId);
      if (!this.animal) this.router.navigate(['/animals']);
      this.animalsService.animalChanged(this.animal);
      this.onCancel();
    } catch (err) {
      console.log(err); //TODO Ver qué pongo aquí
    };
  };

  async onSubmit() {
    try {
      await this.animalsService.update(this.form.value, this.animalId);
      this.toastService.newToast({ text: 'El animal se ha actualizado correctamente.', messageType: msgType.success });
      this.animal = this.form.value;
      this.animalsService.animalChanged(this.animal);
      this.form.disable();
      this.edit = false;
    } catch (err: any) {
      this.toastService.newToast({ text: 'El animal no ha podido actualizarse, puede que un animal con ese nombre y género ya exista.', messageType: msgType.error });
    };
  };

  onCancel() {
    this.form.controls['name'].setValue(this.animal.name);
    this.form.controls['gender'].setValue(this.animal.gender);
    this.form.controls['specie'].setValue(this.animal.specie);
    this.form.controls['breed'].setValue(this.animal.breed);
    this.form.controls['size'].setValue(this.animal.size);
    this.form.controls['color'].setValue(this.animal.color);
    this.form.controls['weight'].setValue(this.animal.weight);
    this.form.controls['w_unit'].setValue(this.animal.w_unit);
    this.form.controls['spayed'].setValue(this.animal.spayed);
    this.form.controls['birthday'].setValue(this.animal.birthday.toString().split('T')[0]);
    this.form.controls['image'].setValue(this.animal.image);
    this.form.disable();
    this.edit = false;
  };

  onClick() {
    this.form.enable();
    this.edit = true;
  };

  async onDelete() {
    const sure = confirm('¿Estas seguro de eliminar el animal?'); //TODO cambiar esto por un modal?
    if (sure) {
      try {
        await this.animalsService.delete(this.animalId);
        this.toastService.newToast({ text: 'El animal se ha eliminado correctamente.', messageType: msgType.success });
        this.router.navigate(['/animals']);
      } catch (err) {
        this.toastService.newToast({ text: 'El animal no se ha eliminado.', messageType: msgType.error });
      };
    };
  };

  checkError(controlName: string, error: string): boolean {
    return this.form.get(controlName)!.hasError(error) && this.form.get(controlName)!.touched;
  };
}
