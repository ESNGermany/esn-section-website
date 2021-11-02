import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainItem, MainService } from 'src/app/services/main.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    firstDay: 1,
    showNonCurrentDates: false,
    fixedWeekCount: false,
    aspectRatio: 1.8,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    eventClick: function (info) {
      info.jsEvent.preventDefault();
      const title = info.event.title;
      const details = info.event.extendedProps.details;
      const cause = info.event.extendedProps.cause;
      const link = info.event.url;
      const date = info.event.start;
      appendLog(title, details, cause, link, date);
    },
    events: async function () {
      const result = await fetch(
        environment.STRAPI_SECTION_URL +
          `events?_created_by=` +
          environment.STRAPI_SECTION_ID
      );
      const result_2 = await result.json();
      if (result_2) {
        return result_2.map((r) => ({
          start: new Date(r.start),
          end: new Date(r.end),
          title: r.title,
          url: r.url,
          extendedProps: {
            details: r.details,
            cause: r.causes,
          },
        }));
      }
      return [];
    },
  };

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Events | ' + mainInfo?.sectionLongName);
  }
}
function appendLog(
  title: string,
  details: string,
  cause: string,
  link: string,
  date: Date
) {
  var detailsEl = this.document.createElement('div');
  detailsEl.textContent = details;
  this.document.querySelector('#details').innerHTML = '';
  this.document.querySelector('#details').appendChild(detailsEl);

  this.document.querySelector('#title').innerHTML = title;

  this.document.querySelector('#cause').innerHTML =
    'Cause: ' + convertCause(cause);

  this.document.querySelector('#link').innerHTML = link;
  this.document.querySelector('#link').setAttribute('href', link);

  this.document.querySelector('#date').innerHTML =
    date.toLocaleString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }) + ' Uhr';
}

function convertCause(cause: string) {
  switch (cause) {
    case 'Education_Youth':
      return 'Education & Youth';

    case 'Environmental_Sustainability':
      return 'Environmental & Sustainability';

    case 'Health_Wellbeing':
      return 'Health & Wellbeing';

    case 'Skills_Employability':
      return 'Skills & Employability';

    case 'Social_Inclusion':
      return 'Social Inclusion';

    default:
      return 'Culture';
  }
}
