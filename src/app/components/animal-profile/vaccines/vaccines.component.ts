import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  animalId: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.animalId = 0;
  }

  ngOnInit() {
    this.activatedRoute.parent!.params.subscribe(value => this.animalId = value['animalId']);
    if (this.animalId === 0) this.router.navigate(['/animals']);
  };


}
