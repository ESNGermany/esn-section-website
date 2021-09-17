import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface CocItem {
  id: string;
  MarkdownText: string;
}

@Injectable()
export class CocService {
  private url = 'https://strapi.esn-germany.de/web-legal-documents/4';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchCoc(): Observable<CocItem> {
    return this.http.get<CocItem>(this.url).pipe(
      tap((_) => this.log('fetched coc')),
      catchError(this.handleError<CocItem>('fetchCocList'))
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
