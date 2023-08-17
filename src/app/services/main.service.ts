import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';

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
  header_image: {
    id: string;
  };
  imagegrid_frontpage: [
    {
      id: string;
      directus_files_id: string;
      width: string;
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private url = `${env.DIRECTUS_URL}main_information${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;
  private mainInformationSubject = new BehaviorSubject<IMainItem | null>(null);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchMain();
  }

  public getMainInformation(): Observable<IMainItem | null> {
    return this.mainInformationSubject.asObservable();
  }

  private fetchMain(): void {
    const params = new HttpParams().set('fields', '*.*');
    this.http
      .get<any>(this.url, { params })
      .pipe(catchError(this.handleError('getMainInformation', null)))
      .subscribe((main) => {
        this.mainInformationSubject.next(main?.data[0]);
      });
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
