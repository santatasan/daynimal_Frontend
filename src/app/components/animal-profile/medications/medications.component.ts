import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medication } from 'src/app/interfaces/medication.interface';
import { MedicationsService } from 'src/app/services/medications.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  animalId: number;
  arrMedications: Medication[];
  medication: Medication;
  edit: boolean;

  constructor(private medicationsService: MedicationsService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.animalId = 0;
    this.arrMedications = [];
    this.medication = { name: '', dosage: '', repetition: 0, r_unit: '', start: new Date(), finish: new Date(), finished: 0 };
    this.edit = false;
  }

  async ngOnInit() {
    this.activatedRoute.parent!.params.subscribe(value => this.animalId = value['animalId']);
    (this.animalId === 0) ? this.router.navigate(['/animals']) : (this.arrMedications = await this.medicationsService.getAll(this.animalId));
  }

  async onNewMedication($event: boolean): Promise<void> {
    if ($event) this.arrMedications = await this.medicationsService.getAll(this.animalId);
    this.edit = false;
  };

  onClick(medication: Medication) {
    this.medication = medication;
    this.edit = true;
  };


}
