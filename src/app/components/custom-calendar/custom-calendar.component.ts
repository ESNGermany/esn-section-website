import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-custom-calendar',
  templateUrl: './custom-calendar.component.html',
})
export class CustomCalendarComponent {
  pretixLink?: string;
  calendarOptions: CalendarOptions;
  isBrowser$ = new BehaviorSubject(false);
  event$ = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.isBrowser$.next(true);
    }
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      firstDay: 1,
      showNonCurrentDates: false,
      fixedWeekCount: false,
      aspectRatio: 1.8,
      eventTimeFormat: {
        hour: 'numeric',
        minute: 'numeric',
        meridiem: "lowercase",
        omitZeroMinute: true,
      },
      eventClick: (info: any) => {
        info.jsEvent.preventDefault();
        this.event$.next(info.event);
      },
      events: async function () {
        const result_2 = await firstValueFrom(
          http.get<
            {
              start: string;
              end: string;
              title: string;
              url: string;
              details: string;
              causes: string;
            }[]
          >(
            environment.STRAPI_SECTION_URL +
              `events?_created_by=` +
              environment.STRAPI_SECTION_ID
          )
        );
        if (result_2) {
          return result_2.map((r: any) => ({
            start: new Date(r.start),
            end: new Date(r.end),
            title: r.title,
            url: r.url,
            extendedProps: {
              details: r.details,
              cause: 'Cause: ' + convertCause(r.causes),
            },
          }));
        }
        return [];
      },
    };
  }
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
