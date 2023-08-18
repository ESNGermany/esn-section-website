import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { ErrorService } from 'src/app/services/error.service';

import { StatutesItem } from './statutes-item';

export interface IStatutesItem {
  data: StatutesItem[];
}

@Injectable()
export class StatutesService {
  private statutesSubject = new BehaviorSubject<StatutesItem | undefined>(
    undefined,
  );
  private url = `${env.DIRECTUS_URL}statutes${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
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
      .pipe(
        catchError(
          this.errorService.handleError<IStatutesItem>('fetchStatutesList'),
        ),
      )
      .subscribe((res) => {
        this.statutesSubject.next(res?.data[0]);
      });
  }
}
