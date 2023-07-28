import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-custom-calendar',
  templateUrl: './custom-calendar.component.html',
})
export class CustomCalendarComponent {
  public pretixLink?: string;
  public calendarOptions: CalendarOptions;
  public isBrowser$ = new BehaviorSubject(false);
  public event$ = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.isBrowser$.next(true);
    }
    const date = new Date();
    date.setDate(date.getDate() - 90); // Show the last 90 days and future events
    const beginEvents = date.toISOString();

    this.calendarOptions = {
      plugins: [listPlugin, dayGridPlugin, interactionPlugin],
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
        const events = await firstValueFrom(
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
                  },
                ];
              },
            ];
          }>(
            environment.DIRECTUS_URL +
              'events' +
              environment.DIRECTUS_SECTION_FILTER +
              environment.SECTION_NAME +
              '&fields=*,' +
              'causes.esn_causes_id.name' +
              '&filter[start][_gt]=' +
              beginEvents,
          ),
        );
        if (events) {
          return events.data.map((res: any) => {
            return {
              start: new Date(res.start),
              end: new Date(res.end),
              title: res.title,
              url: res.url,
              extendedProps: {
                details: res.details,
                cause: 'Cause: ' + res.causes[0].esn_causes_id.name,
              },
            };
          });
        }
        return [];
      },
    };
  }
}
