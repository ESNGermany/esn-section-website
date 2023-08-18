import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from './message.service';
import { ContentItem } from './content-item';

export interface IContentItem {
  data: ContentItem[];
}

@Injectable()
export class ContentService {
  private url = `${env.DIRECTUS_URL}content${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  private contentLandingPageSubject = new BehaviorSubject<
    ContentItem[] | undefined
  >(undefined);
  private contentMembersPageSubject = new BehaviorSubject<
    ContentItem[] | undefined
  >(undefined);
  private contentTeamPageSubject = new BehaviorSubject<
    ContentItem[] | undefined
  >(undefined);
  private contentESNcardPageSubject = new BehaviorSubject<
    ContentItem[] | undefined
  >(undefined);
  private contentIncomingsPageSubject = new BehaviorSubject<
    ContentItem[] | undefined
  >(undefined);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchPageContent('Landing_page');
    this.fetchPageContent('Members_page');
    this.fetchPageContent('Team_page');
    this.fetchPageContent('ESNcard_page');
    this.fetchPageContent('Incomings_page');
  }

  public getContent(page: string): Observable<ContentItem[] | undefined> {
    switch (page) {
      case 'Landing_page':
        return this.contentLandingPageSubject.asObservable();
      case 'Members_page':
        return this.contentMembersPageSubject.asObservable();
      case 'Team_page':
        return this.contentTeamPageSubject.asObservable();
      case 'ESNcard_page':
        return this.contentESNcardPageSubject.asObservable();
      default: // 'Incomings_page':
        return this.contentIncomingsPageSubject.asObservable();
    }
  }

  private fetchPageContent(page: string): void {
    const params = new HttpParams()
      .set('fields', '*.*')
      .set('sort', 'Order_on_page');

    this.http
      .get<IContentItem>(`${this.url}&filter[Page_for_display]=${page}`, {
        params,
      })
      .pipe(catchError(this.handleError<IContentItem>('fetchContentList')))
      .subscribe((content: IContentItem) => {
        switch (page) {
          case 'Landing_page':
            this.contentLandingPageSubject.next(content?.data);
            break;
          case 'Members_page':
            this.contentMembersPageSubject.next(content?.data);
            break;
          case 'Team_page':
            this.contentTeamPageSubject.next(content?.data);
            break;
          case 'ESNcard_page':
            this.contentESNcardPageSubject.next(content?.data);
            break;
          case 'Incomings_page':
            this.contentIncomingsPageSubject.next(content?.data);
            break;
        }
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
    this.messageService.add(`ContentService: ${message}`);
  }
}
