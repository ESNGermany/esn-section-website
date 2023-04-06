import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';

export interface IImprintEsnGerItem {
  id: string;
  Content: string;
}

@Injectable()
export class ImprintEsnGerService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchEsnGerImprint(): Observable<IImprintEsnGerItem> {
    const url = 'https://strapi.esn-germany.de/website-imprints';
    return this.http.get<IImprintEsnGerItem>(url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched imprint')),
      catchError(this.handleError<IImprintEsnGerItem>('fetchImprintList'))
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
    this.messageService.add(`ImprintEsnGerService: ${message}`);
  }
}
