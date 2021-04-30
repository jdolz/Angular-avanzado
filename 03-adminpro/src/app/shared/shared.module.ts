import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    BreadcrumpsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumpsComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
