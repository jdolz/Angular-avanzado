import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  text: string;
  value: number;

  constructor(protected settingsService: SettingsService) {
  }

  changing(){
    console.log(this.text);
    this.settingsService.subject.next(this.text);
  }

  ngOnInit(): void {
  }

}
