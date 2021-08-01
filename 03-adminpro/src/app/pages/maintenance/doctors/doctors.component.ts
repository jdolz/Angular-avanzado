import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { FindService } from 'src/app/services/find.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  loading: boolean = true;

  doctors: Doctor[] = [];
  doctorsTemp: Doctor[] = [];

  private unsubscribe$ = new Subject();

  constructor(private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private findService: FindService) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.modalImageService.imgChanged.pipe(takeUntil(this.unsubscribe$)).subscribe((img) => {
      this.loadDoctors();
    });
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      this.loading = false;
      this.doctors = resp;
      this.doctorsTemp = this.doctors;
    });
  }

  findDoctors(value) {
    this.loading = true;

    if (value.length === 0) {
      this.loading = false;
      return this.doctors = this.doctorsTemp;
    }

    this.findService.find('doctor', value).then((resp) => {
      this.doctors = resp.result;

      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctor', doctor._id, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id).pipe(takeUntil(this.unsubscribe$)).subscribe(
          () => {
            this.loadDoctors();
            Swal.fire('Deleted', doctor.name, 'success');
          });
      }
    });
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
