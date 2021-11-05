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
  // events$: Observable<EventItem[]>;

  pretixLink;
  // browser = false;

  constructor(
    private title: Title,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document // private eventsService: EventsService, // public http: HttpClient,
  ) // @Inject(PLATFORM_ID) private platformId: string
  {}

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

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   firstDay: 1,
  //   showNonCurrentDates: false,
  //   fixedWeekCount: false,
  //   aspectRatio: 1.8,
  //   eventTimeFormat: {
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     meridiem: false,
  //     hour12: false,
  //   },
  //   eventClick: (info) => {
  //     info.jsEvent.preventDefault();
  //     const title = info.event.title;
  //     const details = info.event.extendedProps.details;
  //     const cause = info.event.extendedProps.cause;
  //     const link = info.event.url;
  //     const date = info.event.start;
  //     appendLog(title, details, cause, link, date);
  //   },
  //   // events: async function () {
  //   //   const [result] = await firstValueFrom(this.eventsService.fetchEvents());

  //   //   const result_2 = await result.json();
  //   //   if (result_2) {
  //   //     console.log('result_2');
  //   //     return result_2.map((r) => ({
  //   //       start: new Date(r.start),
  //   //       end: new Date(r.end),
  //   //       title: r.title,
  //   //       url: r.url,
  //   //       extendedProps: {
  //   //         details: r.details,
  //   //         cause: r.causes,
  //   //       },
  //   //     }));
  //   //   }
  //   //   return [];
  //   // },
  // };

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    this.loadJsFile('https://pretix.eu/widget/v1.en.js');
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Events | ' + mainInfo?.sectionLongName);
    // this.events$ = this.eventsService.fetchEvents().pipe(shareReplay(1));
    // if (isPlatformBrowser(this.platformId)) {
    // const [events] = await firstValueFrom(this.eventsService.fetchEvents());
    // this.calendarOptions.events = events;
    // this.browser = true;
    // }
  }
}
// function appendLog(
//   title: string,
//   details: string,
//   cause: string,
//   link: string,
//   date: Date
// ) {
//   var detailsEl = document.createElement('div');
//   detailsEl.textContent = details;
//   document.querySelector('#details').innerHTML = '';
//   document.querySelector('#details').appendChild(detailsEl);
//   document.querySelector('#title').innerHTML = title;
//   document.querySelector('#cause').innerHTML = 'Cause: ' + convertCause(cause);
//   document.querySelector('#link').innerHTML = link;
//   document.querySelector('#link').setAttribute('href', link);
//   document.querySelector('#date').innerHTML =
//     date.toLocaleString('de-DE', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: false,
//     }) + ' Uhr';
// }

// function convertCause(cause: string) {
//   switch (cause) {
//     case 'Education_Youth':
//       return 'Education & Youth';

//     case 'Environmental_Sustainability':
//       return 'Environmental & Sustainability';

//     case 'Health_Wellbeing':
//       return 'Health & Wellbeing';

//     case 'Skills_Employability':
//       return 'Skills & Employability';

//     case 'Social_Inclusion':
//       return 'Social Inclusion';

//     default:
//       return 'Culture';
//   }
// }
