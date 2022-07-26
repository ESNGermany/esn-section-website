import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

export interface ICocItem {
  id: string;
  Title: string;
  MarkdownText: string;
}

@Injectable()
export class CocService {
  private url = 'https://strapi.esn-germany.de/web-legal-documents/4';
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<ICocItem>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched coc')),
      catchError(this.handleError<ICocItem>('fetchCocList'))
    );
  }

  fetchCoc(): Observable<ICocItem> {
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
