import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  loading: boolean = true;
  hospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe(resp =>{
      this.loading = false;
      this.hospitals = resp;
    });
  }

}
