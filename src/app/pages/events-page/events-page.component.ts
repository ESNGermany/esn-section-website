import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainItem, MainService } from 'src/app/services/main.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventItem, EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  globals$: Observable<MainItem>;
  pretixLink;

  constructor(
    private title: Title,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public loadCssFile(url) {
    let node = this.document.createElement('link');
    node.rel = 'stylesheet';
    node.type = 'text/css';
    node.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
  public loadJsFile(url) {
    let node = this.document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    this.loadJsFile('https://pretix.eu/widget/v1.en.js');
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Events | ' + mainInfo?.sectionLongName);
  }
}
