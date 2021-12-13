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

  ngOnInit(): void {
  };

  async ngAfterViewInit() {
    this.arrAnimals = await this.animalsService.getAll();
  };
}
