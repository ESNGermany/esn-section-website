import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

interface StatutesItem {
  id: string;
  statutesTitle: string;
  Text: string;
}

@Injectable()
export class StatutesService {
  private url = environment.STRAPI_SECTION_URL + 'statutes';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchStatutes(): Observable<StatutesItem> {
    return this.http.get<StatutesItem>(this.url).pipe(
      tap((_) => this.log('fetched statutes')),
      catchError(this.handleError<StatutesItem>('fetchStatutesList'))
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
