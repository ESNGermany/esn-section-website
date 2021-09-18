import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface MainItem {
  id: string;
  sectionShortName: string;
  sectionLongName: string;
  facebookLink: string;
  facebookName: string;
  instagramLink: string;
  instagramName: string;
  pretixLink: string;
  addressNameFirstLine: string;
  addressStreetSecondLine: string;
  addressCityThirdLine: string;
  addressEmailFourthLine: string;
  welcomeMessageFrontPage: string;
  buttonColor: string;
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
    formats: {
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
      };
    }
  ];
}

@Injectable()
export class MainService {
  private url = 'https://strapi.esn-freiburg.de/website-main-information';
  sectionShortName: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchMain(): Observable<MainItem> {
    return this.http.get<MainItem>(this.url).pipe(
      tap((_) => this.log('fetched main information')),
      catchError(this.handleError<MainItem>('fetchMainInformation'))
    );
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
