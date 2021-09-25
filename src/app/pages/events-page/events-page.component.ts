import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from 'src/app/services/main.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  siteTitle: string;
  pretixLink: string;
  facebookLink: string;
  instagramLink: string;

  constructor(private title: Title, private mainService: MainService) {}

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
      const result = await fetch(environment.STRAPI_SECTION_URL + `events`);
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

  ngOnInit() {
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      this.pretixLink = mainItem.pretixLink;
      if (this.pretixLink.length == 0) {
        this.pretixLink = 'cal';
      }
      this.facebookLink = mainItem.facebookLink;
      this.instagramLink = mainItem.instagramLink;
      const title = 'Events | ' + this.siteTitle;
      this.title.setTitle(title);
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
