import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from './message.service';
import { ContentItem } from './content-item';

export interface IContentItem {
  data: ContentItem[];
}

@Injectable()
export class ContentService {
  private url = `${env.DIRECTUS_URL}content${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchPageContent(page: string): Observable<ContentItem[]> {
    const params = new HttpParams()
      .set('fields', '*.*')
      .set('sort', 'Order_on_page');

    return this.http
      .get<ContentItem[]>(`${this.url}&filter[Page_for_display]=${page}`, {
        params,
      })
      .pipe(
        shareReplay(1),
        map((res: any) => res.data),
        tap(() => this.log('fetched content')),
        catchError(this.handleError<ContentItem[]>('fetchContentList')),
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
    this.messageService.add(`ContentService: ${message}`);
  }
}
