import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Care } from 'src/app/interfaces/care.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { CaresService } from 'src/app/services/cares.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-one-care',
  templateUrl: './one-care.component.html',
  styleUrls: ['./one-care.component.css']
})
export class OneCareComponent implements OnInit {

  arrCare: Care[];
  animalId: number;
  type: string;

  constructor(private activatedRoute: ActivatedRoute, private caresService: CaresService, private toastService: ToastService) {

    this.arrCare = [];
    this.type = '';
    this.animalId = 0;
  };

  ngOnInit() {
    this.activatedRoute.parent!.parent!.params.subscribe(async value => {
      this.activatedRoute.params.subscribe(async params => {
        try {
          (value['animalId']) ? this.animalId = value['animalId'] : this.activatedRoute.parent!.params.subscribe(p => this.animalId = p['animalId']);
          (params['type']) ? this.type = params['type'] : this.type = 'vaccine';
          this.arrCare = await this.caresService.getAllByType(this.animalId, this.type);
        } catch (err) {
          this.toastService.newToast({ text: 'No se han podido cargar los elementos', messageType: msgType.error });
        };
      });
    });
    this.caresService.careObs().subscribe(async () => {
      this.arrCare = await this.caresService.getAllByType(this.animalId, this.type);
    });
  };

  lineBreaks(text: string | undefined): string { //TODO meter esto en un pipe
    if (text !== null) return text!.split('\n').join('<br>');
    return '';
  };

  onClick(care: Care) {
    this.caresService.careChange(care);
  };

};
