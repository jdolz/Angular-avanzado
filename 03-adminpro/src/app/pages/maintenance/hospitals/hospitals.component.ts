import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { FindService } from 'src/app/services/find.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  hospitals: Hospital[] = [];
  hospitalTemp: Hospital[] = [];

  private unsubscribe$ = new Subject();

  constructor(private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private findService: FindService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalImageService.imgChanged.pipe(takeUntil(this.unsubscribe$)).subscribe((img) => {
      this.loadHospitals()
    });
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      this.loading = false;
      this.hospitals = resp;
      this.hospitalTemp = this.hospitals;
    });
  }

  findHospitals(value) {
    this.loading = true;

    if (value.length === 0) {
      this.loading = false;
      return this.hospitals = this.hospitalTemp;
    }

    this.findService.find('hospital', value).then((resp) => {
      this.hospitals = resp.result;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).pipe(takeUntil(this.unsubscribe$)).subscribe(
      () => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
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
        this.hospitalService.deleteHospital(hospital._id).pipe(takeUntil(this.unsubscribe$)).subscribe(
          () => {
            this.loadHospitals();
            Swal.fire('Deleted', hospital.name, 'success');
          });
      }
    });

  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Enter the name for the new Hospital',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (hospital: Hospital) => {
          this.loadHospitals();
          Swal.fire('Created', hospital.name, 'success');
        });
    }

  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospital', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
