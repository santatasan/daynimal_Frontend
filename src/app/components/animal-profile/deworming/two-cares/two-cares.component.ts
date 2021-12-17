import { Component, Input, OnInit } from '@angular/core';
import { Care } from 'src/app/interfaces/care.interface';
import { msgType } from 'src/app/interfaces/messageToast.interface';
import { CaresService } from 'src/app/services/cares.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-two-cares',
  templateUrl: './two-cares.component.html',
  styleUrls: ['./two-cares.component.css']
})
export class TwoCaresComponent implements OnInit {

  arrCare: Care[];
  @Input() animalId: number;
  @Input() type: string;

  constructor(private caresService: CaresService, private toastService: ToastService) {

    this.arrCare = [];
    this.type = '';
    this.animalId = 0;
  };

  async ngOnInit() {
    try {
      this.arrCare = await this.caresService.getAllByType(this.animalId, this.type);
    } catch (err) {
      this.toastService.newToast({ text: 'No se han podido cargar los elementos', messageType: msgType.error });
    };
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

}
