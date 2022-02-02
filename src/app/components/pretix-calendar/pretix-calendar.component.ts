import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
})
export class PretixCalendarComponent implements AfterViewInit {
  public globals$: Observable<MainItem>;
  private pretixLink: string;

  @ViewChild('pretixCal') el: ElementRef;

  constructor(private mainService: MainService) {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );

    this.mainService
      .fetchMain()
      .subscribe((value) => (this.pretixLink = value[0].pretixLink));
  }

  async ngAfterViewInit() {
    this.el.nativeElement.innerHTML = `<div
        class="pretix-widget-compat"
        event="${this.pretixLink}"
        style="calendar"
      ></div>`;
  }
}
