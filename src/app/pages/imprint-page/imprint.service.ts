import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

export interface IImprintItem {
  title: string;
  text: string;
}

@Injectable()
export class ImprintService {
  private url = `${env.DIRECTUS_URL}imprint${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&fields=title,text`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchImprint(): Observable<IImprintItem> {
    return this.http.get<IImprintItem>(this.url).pipe(
      shareReplay(1),
      tap(() => this.log('fetched imprint')),
      catchError(this.handleError<IImprintItem>('fetchImprintList')),
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
    this.messageService.add(`ImprintService: ${message}`);
  }
}
