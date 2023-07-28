import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface IMainItem {
  section_short_name: string;
  section_long_name: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
  pretix_link: string;
  use_pretix_calendar: boolean;
  use_image_slideshow: boolean;
  address_name_first_line: string;
  address_street_second_line: string;
  address_city_third_line: string;
  address_email_fourth_line: string;
  welcome_message_front_page: string;
  button_color: string;
  eventpage_text: string;
  header_image: string;
  imagegrid_frontpage: [
    {
      id: string;
      directus_files_id: string;
      width: string;
    },
  ];
}

@Injectable()
export class MainService {
  private url = `${env.DIRECTUS_URL}main_information${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchMain(): Observable<IMainItem[]> {
    const fields =
      'section_short_name,section_long_name,facebook_link,facebook_name,instagram_link,' +
      'instagram_name,pretix_link,use_pretix_calendar,use_image_slideshow,address_name_first_line,' +
      'address_street_second_line,address_city_third_line,address_email_fourth_line,welcome_message_front_page,' +
      'button_color,eventpage_text,header_image.*,imagegrid_frontpage.directus_files_id.*';

    const params = new HttpParams().set('fields', fields);

    return this.http.get<IMainItem[]>(this.url, { params }).pipe(
      shareReplay(1),
      tap(() => this.log('fetched mainInformation')),
      catchError(this.handleError<IMainItem[]>('fetchMainInformation')),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`MainService: ${message}`);
  }
}
