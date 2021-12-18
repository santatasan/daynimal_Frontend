import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VetVisit } from 'src/app/interfaces/vetVisit.interface';
import { VetVisitsService } from 'src/app/services/vet-visits.service';

@Component({
  selector: 'app-vet-visits',
  templateUrl: './vet-visits.component.html',
  styleUrls: ['./vet-visits.component.css']
})
export class VetVisitsComponent implements OnInit {

  animalId: number;
  arrVetVisits: VetVisit[];
  vetVisit: VetVisit;
  edit: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private vetVisitsService: VetVisitsService) {

    this.animalId = 0;
    this.arrVetVisits = [];
    this.vetVisit = { vet: '', date: new Date(), price: 0 };
    this.edit = false;
  }

  async ngOnInit() {
    this.activatedRoute.parent!.params.subscribe(value => this.animalId = value['animalId']);
    (this.animalId === 0) ? this.router.navigate(['/animals']) : (this.arrVetVisits = await this.vetVisitsService.getAll(this.animalId));
  };

  async onNewVetVisit($event: boolean): Promise<void> {
    if ($event) this.arrVetVisits = await this.vetVisitsService.getAll(this.animalId);
    this.edit = false;
  };

  onClick(vetVisit: VetVisit) {
    this.vetVisit = vetVisit;
    this.edit = true;
  };

  lineBreaks(text: string | undefined): string { //TODO meter esto en un pipe
    if (text !== null) return text!.split('\n').join('<br>');
    return '';
  };

}
