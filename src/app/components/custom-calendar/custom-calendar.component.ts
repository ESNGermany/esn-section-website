import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  EventInput,
  EventSourceInput,
} from '@fullcalendar/angular';
import { firstValueFrom, shareReplay } from 'rxjs';
import { EventItem, EventsService } from 'src/app/services/events.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss'],
})
export class CustomCalendarComponent implements OnInit {
  pretixLink;

  constructor(private eventsService: EventsService, private http: HttpClient) {}

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
    eventClick: (info) => {
      info.jsEvent.preventDefault();
      const title = info.event.title;
      const details = info.event.extendedProps.details;
      const cause = info.event.extendedProps.cause;
      const link = info.event.url;
      const date = info.event.start;
      appendLog(title, details, cause, link, date);
    },
    events: this.eventsFetch().then((res) => {
      return res;
    }),
  };

  async ngOnInit() {
    // const [events] = await firstValueFrom(this.eventsService.fetchEvents());
    // this.calendarOptions.events = events;
  }

  async eventsFetch(): Promise<EventInput[]> {
    const [events] = await firstValueFrom(this.eventsService.fetchEvents());

    // const result_2 = await [events].json();
    console.log(events);
    if (events) {
      return [events].map((r) => ({
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
