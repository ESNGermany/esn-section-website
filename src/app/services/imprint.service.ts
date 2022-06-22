import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface IImprintItem {
  id: string;
  Title: string;
  Text: string;
}

@Injectable()
export class ImprintService {
  private url =
    environment.STRAPI_SECTION_URL +
    'imprints?_created_by=' +
    environment.STRAPI_SECTION_ID;
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<IImprintItem>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched imprint')),
      catchError(this.handleError<IImprintItem>('fetchImprintList'))
    );
  }

  fetchImprint(): Observable<IImprintItem> {
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
