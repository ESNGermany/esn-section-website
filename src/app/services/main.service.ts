import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface MainItem {
  id: string;
  sectionShortName: string;
  sectionLongName: string;
  facebookLink: string;
  facebookName: string;
  instagramLink: string;
  instagramName: string;
  pretixLink: string;
  usePretixCalendar: boolean;
  addressNameFirstLine: string;
  addressStreetSecondLine: string;
  addressCityThirdLine: string;
  addressEmailFourthLine: string;
  welcomeMessageFrontPage: string;
  buttonColor: string;
  eventPageText: string;
  officialLogo: {
    url: string;
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  headerImage: {
    alternativeText: string;
    url: string;
    formats: {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  };
  imageGridFrontPage: [
    {
      alternativeText: string;
      formats: {
        medium: {
          url: string;
        };
        thumbnail: {
          url: string;
        };
      };
    }
  ];
}

@Injectable()
export class MainService {
  private url =
    environment.STRAPI_SECTION_URL +
    'main-informations?_created_by=' +
    environment.STRAPI_SECTION_ID;
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<MainItem[]>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched main information')),
      catchError(this.handleError<MainItem[]>('fetchMainInformation'))
    );
  }

  fetchMain(): Observable<MainItem[]> {
    return this.dataRequest;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`ContentService: ${message}`);
  }
}
