import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit, OnDestroy {

  @Input() placehold: string;
  @Input() valor: number;
  @Output() changeValue = new EventEmitter();

  valorText: string;
  disabled: boolean;

  constructor(protected settingsService: SettingsService) {

  }

  ngOnDestroy(): void {
    this.settingsService.subject.unsubscribe();
  }

  ngOnInit(): void {
    this.settingsService.subject.subscribe(data => console.log(data));
  }

  cambiarValor(valor: number): void {

    if (valor >= 500) {
      this.valor = 500;
    } else if (valor <= 1) {
      this.valor = 1;
    } else {
      this.valor = valor;
    }

    this.changeValue.emit(this.valor);
  }

}
