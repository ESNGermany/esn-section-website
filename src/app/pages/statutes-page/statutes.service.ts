import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { StatutesItem } from './statutes-item';

export interface IStatutesItem {
  data: StatutesItem[];
}

@Injectable()
export class StatutesService {
  private url = `${env.DIRECTUS_URL}statutes${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;
  private statutesSubject = new BehaviorSubject<StatutesItem | undefined>(
    undefined,
  );

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchStatutes();
  }

  public getStatutes(): Observable<StatutesItem | undefined> {
    return this.statutesSubject.asObservable();
  }

  private fetchStatutes(): void {
    const params = new HttpParams().set('fields', 'text');

    this.http
      .get<IStatutesItem>(this.url, { params })
      .pipe(catchError(this.handleError<IStatutesItem>('fetchStatutesList')))
      .subscribe((res) => {
        this.statutesSubject.next(res?.data[0]);
      });
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
