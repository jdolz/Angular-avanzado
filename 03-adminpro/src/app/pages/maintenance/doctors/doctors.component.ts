import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  loading: boolean = true;

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe(resp => {
      this.loading = false;
      this.doctors = resp;
    });
  }

  findDoctors(value) {

  }

  openSweetAlert(){

  }

}
