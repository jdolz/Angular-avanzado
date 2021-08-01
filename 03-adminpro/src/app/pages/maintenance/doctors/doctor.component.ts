import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit, OnDestroy {

  doctorForm: FormGroup;
  hospitals: Hospital[] = [];
  hospitalSelected: Hospital;
  doctorSelected: Doctor;

  private unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(
      ({ id }) => this.getDoctorById(id)
    );

    this.loadHospitals();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.doctorForm.get('hospital').valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(
      // find cuando hace match termina, filter recorre entero el bucle
      hospitalId => this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId)
    );
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if (this.doctorSelected) {
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      };

      this.doctorService.updateDoctor(data).pipe(takeUntil(this.unsubscribe$)).subscribe(
        () => {
          Swal.fire('Updated', name, 'success');
        });

    } else {
      this.doctorService.createDoctor(this.doctorForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (doctor: Doctor) => {
          Swal.fire('Created', doctor.name, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`);
        }
      );

    }
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (hospitals: Hospital[]) => this.hospitals = hospitals
    );
  }

  getDoctorById(id: string) {
    if (id === 'new') return;
    this.doctorService.getDoctorById(id).pipe(takeUntil(this.unsubscribe$)).subscribe(
      doctor => {

        const { name, hospital: { _id } } = doctor;

        this.doctorSelected = doctor;
        this.doctorForm.setValue({
          name: name,
          hospital: _id
        });
        this.hospitalSelected = this.doctorSelected.hospital;
      }, err => { return this.router.navigateByUrl('/dashboard/doctors'); }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
