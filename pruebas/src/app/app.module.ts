import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MedicosComponent } from './intermedio/espias/medicos.component';
import { MedicosService } from './intermedio/espias/medicos.service';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    MedicosComponent
  ],
  providers: [MedicosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
