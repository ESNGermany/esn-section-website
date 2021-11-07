import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss'],
})
export class PretixCalendarComponent implements OnInit {
  globals$: Observable<MainItem>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    this.addStyleCalendar();
  }

  async addStyleCalendar() {
    const [globals] = await firstValueFrom(this.mainService.fetchMain());
    const widget = this.document.getElementById('pretixdiv');
    if (widget) {
      widget.setAttribute('event', globals.pretixLink);
      widget.setAttribute('style', 'calendar');
    }
  }
}
