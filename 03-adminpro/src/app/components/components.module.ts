import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
