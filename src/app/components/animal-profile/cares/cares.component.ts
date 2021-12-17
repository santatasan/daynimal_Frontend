import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cares',
  templateUrl: './cares.component.html',
  styleUrls: ['./cares.component.css']
})
export class CaresComponent implements OnInit {

  animalId: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.animalId = 0;
  }

  async ngOnInit() {
    try {
      this.activatedRoute.parent!.params.subscribe(value => this.animalId = value['animalId']);
    } catch (err) {
      this.router.navigate(['/animals']);
    };
  };

}
