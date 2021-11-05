import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
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
    @Inject(PLATFORM_ID) private platformId: string,
    private mainService: MainService
  ) {}

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    console.log('inside pretix');
    this.loadJsFile('https://pretix.eu/widget/v1.en.js');
    // this.addStyleCalendar();
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    // }
  }

  public loadJsFile(url) {
    let node = this.document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }

  // addStyleCalendar() {
  //   const widget = this.document.getElementById('pretixwidget');
  //   widget.setAttribute('style', 'calendar');
  // }
}
