import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';

import { ContentItem } from './content-item';
import { ErrorService } from './error.service';

export interface IContentItem {
  data: ContentItem[];
}

@Injectable()
export class ContentService {
  private contentLandingPageSubject = new BehaviorSubject<ContentItem[]>([]);
  private contentMembersPageSubject = new BehaviorSubject<ContentItem[]>([]);
  private contentTeamPageSubject = new BehaviorSubject<ContentItem[]>([]);
  private contentESNcardPageSubject = new BehaviorSubject<ContentItem[]>([]);
  private contentIncomingsPageSubject = new BehaviorSubject<ContentItem[]>([]);

  private url = `${env.DIRECTUS_URL}content${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.fetchPageContent('Landing_page');
    this.fetchPageContent('Members_page');
    this.fetchPageContent('Team_page');
    this.fetchPageContent('ESNcard_page');
    this.fetchPageContent('Incomings_page');
  }

  public getContent(page: string): Observable<ContentItem[]> {
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
      .pipe(
        catchError(
          this.errorService.handleError<IContentItem>('fetchContentList'),
        ),
      )
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
}
