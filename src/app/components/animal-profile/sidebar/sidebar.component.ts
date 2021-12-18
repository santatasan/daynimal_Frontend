import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  animal: Animal;
  @Input() animalId;

  constructor(private animalsService: AnimalsService) {
    this.animal = { name: '', gender: '', specie: '', breed: '', size: '', color: '', weight: '', w_unit: '', spayed: 0, birthday: new Date() };
    this.animalId = 0;
  };

  async ngOnInit(): Promise<void> {
    this.animal = await this.animalsService.getById(this.animalId);
    this.animalsService.animalObs().subscribe(res => this.animal = res);
  };

}
