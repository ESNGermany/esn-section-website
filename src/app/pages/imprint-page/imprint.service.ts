import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

export interface IImprintItem {
  title: string;
  text: string;
}

@Injectable()
export class ImprintService {
  private url =
    environment.DIRECTUS_URL_w +
    'imprint' +
    environment.DIRECTUS_SECTION_FILTER +
    environment.SECTION_NAME +
    '&fields=title,text';
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
    this.messageService.add(`ImprintService: ${message}`);
  }
}
