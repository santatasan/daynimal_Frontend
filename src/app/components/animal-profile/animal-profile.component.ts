import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-profile',
  templateUrl: './animal-profile.component.html',
  styleUrls: ['./animal-profile.component.css']
})
export class AnimalProfileComponent implements OnInit {

  animalId: number;

  constructor(private activatedRoute: ActivatedRoute) {

    this.animalId = 0;
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => this.animalId = value['animalId']);
  };

}
