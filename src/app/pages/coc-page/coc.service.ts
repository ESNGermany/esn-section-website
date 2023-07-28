import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';

export interface ICocItem {
  id: string;
  Title: string;
  MarkdownText: string;
}

@Injectable()
export class CocService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchCoc(): Observable<ICocItem> {
    const url = 'https://strapi.esn-germany.de/web-legal-documents/4';
    return this.http.get<ICocItem>(url).pipe(
      shareReplay(1),
      tap(() => this.log('fetched coc')),
      catchError(this.handleError<ICocItem>('fetchCocList')),
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
    this.messageService.add(`CocService: ${message}`);
  }
}
