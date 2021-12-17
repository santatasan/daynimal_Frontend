import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deworming',
  templateUrl: './deworming.component.html',
  styleUrls: ['./deworming.component.css']
})
export class DewormingComponent implements OnInit {

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