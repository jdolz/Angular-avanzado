import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { FindService } from 'src/app/services/find.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit, OnDestroy {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  private unsubscribe$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
     private findService: FindService,
     private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.findAll(term);
    });
  }

  findAll(term: string) {
    this.findService.globalFind(term).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (resp: any) => {
        this.users = resp.user;
        this.hospitals = resp.hospital;
        this.doctors = resp.doctor;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`dashboard/doctor/${doctor._id}`);
  }

}
