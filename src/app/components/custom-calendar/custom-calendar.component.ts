import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import listPlugin from '@fullcalendar/list';

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
      plugins: [listPlugin],
      initialView: 'listMonth',
      firstDay: 1,
      showNonCurrentDates: false,
      fixedWeekCount: false,
      aspectRatio: 1.8,
      eventTimeFormat: {
        hour: 'numeric',
        minute: 'numeric',
        meridiem: 'lowercase',
        omitZeroMinute: true,
      },
      eventClick: (info: any) => {
        info.jsEvent.preventDefault();
        this.event$.next(info.event);
      },
      events: async function () {
        const result_2 = await firstValueFrom(
          http.get<{
            data: [
              {
                start: string;
                end: string;
                title: string;
                url: string;
                details: string;
                causes: [
                  {
                    esn_causes_id: {
                      name: string;
                    };
                  }
                ];
              }
            ];
          }>(
            environment.DIRECTUS_URL +
              'events' +
              environment.DIRECTUS_SECTION_FILTER +
              environment.SECTION_NAME +
              '&fields=*,' +
              'causes.esn_causes_id.name'
          )
        );
        if (result_2) {
          return result_2.data.map((res: any) => ({
            start: new Date(res.start),
            end: new Date(res.end),
            title: res.title,
            url: res.url,
            extendedProps: {
              details: res.details,
              cause: 'Cause: ' + res.causes[0].esn_causes_id.name,
            },
          }));
        }
        return [];
      },
    };
  }
}
