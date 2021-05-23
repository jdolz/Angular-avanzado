import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';
import { InputNumberComponent } from './input-number/input-number.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    InputNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    InputNumberComponent
  ]
})
export class ComponentsModule { }
