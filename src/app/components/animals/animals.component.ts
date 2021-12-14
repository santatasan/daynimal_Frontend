import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  arrAnimals: Animal[];

  constructor(private animalsService: AnimalsService) {

    this.arrAnimals = [];
  }
  async ngOnInit() {
    this.arrAnimals = await this.animalsService.getAll();
  };

  async onNewAnimal($event: boolean): Promise<void> {
    if ($event) this.arrAnimals = await this.animalsService.getAll();
  };
}
