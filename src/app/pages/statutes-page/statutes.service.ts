import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

export interface IStatutesItem {
  text: string;
}

@Injectable()
export class StatutesService {
  private url = `${env.DIRECTUS_URL}statutes${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchStatutes(): Observable<IStatutesItem> {
    const params = new HttpParams().set('fields', 'text');

    return this.http.get<IStatutesItem>(this.url, { params }).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched statutes')),
      catchError(this.handleError<IStatutesItem>('fetchStatutesList'))
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
    this.messageService.add(`StatutesService: ${message}`);
  }
}
