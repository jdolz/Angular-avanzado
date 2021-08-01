import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BreadcrumpsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    BreadcrumpsComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
