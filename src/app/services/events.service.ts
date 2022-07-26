import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface IEventItem {
  id: string;
  title: string;
  details: string;
  causes: string;
  start: string;
  end: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url =
    environment.STRAPI_SECTION_URL +
    `events?_created_by=` +
    environment.STRAPI_SECTION_ID;
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<IEventItem[]>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched events')),
      catchError(this.handleError<IEventItem[]>('fetchEvents'))
    );
  }

  fetchEvents(): Observable<IEventItem[]> {
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
