import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from 'src/app/services/main.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';
import { MainItem } from 'src/app/app.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  siteTitle: string;
  globals: MainItem;
  contentLoaded: Promise<boolean>;
  pretixLink;

  constructor(private title: Title, private mainService: MainService) {
    this.getMain();
  }

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

  ngOnInit() {}

  getMain(): void {
    this.mainService.fetchMain().subscribe((global) => {
      this.globals = global[0];
      this.contentLoaded = Promise.resolve(true);
      this.siteTitle = global[0].sectionLongName;
      const title = 'Events | ' + this.siteTitle;
      this.title.setTitle(title);
      this.pretixLink = global[0].pretixLink;
      let x = global.length;
      // console.log(this.globals.pretixLink);
      // console.log(this.pretixLink);
    });
  }
}
function appendLog(
  title: string,
  details: string,
  cause: string,
  link: string,
  date: Date
) {
  var detailsEl = document.createElement('div');
  detailsEl.textContent = details;
  document.querySelector('#details').innerHTML = '';
  document.querySelector('#details').appendChild(detailsEl);

  document.querySelector('#title').innerHTML = title;

  document.querySelector('#cause').innerHTML = 'Cause: ' + convertCause(cause);

  document.querySelector('#link').innerHTML = link;
  document.querySelector('#link').setAttribute('href', link);

  document.querySelector('#date').innerHTML =
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
