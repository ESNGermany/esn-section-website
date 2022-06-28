import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

export interface IImprintEsnGerItem {
  id: string;
  Content: string;
}

@Injectable()
export class ImprintEsnGerService {
  private url = 'https://strapi.esn-germany.de/website-imprints';
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<IImprintEsnGerItem>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched imprint')),
      catchError(this.handleError<IImprintEsnGerItem>('fetchImprintList'))
    );
  }

  fetchEsnGerImprint(): Observable<IImprintEsnGerItem> {
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
