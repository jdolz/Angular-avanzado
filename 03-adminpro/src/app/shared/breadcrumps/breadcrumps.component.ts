import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styles: [
  ]
})
export class BreadcrumpsComponent implements OnInit, OnDestroy {

  title: string;
  tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getPageTitle()
      .subscribe(({ titulo }) => {
        this.title = titulo;
        document.title = `AdminPro - ${titulo}`;
      });;
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getPageTitle() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data));

  }

}
