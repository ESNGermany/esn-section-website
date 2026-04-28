import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';
import { environment as env } from '../../../environments/environment';

import { CocItem } from './coc-item';

@Injectable()
export class CocService {
  private cocSubject = new BehaviorSubject<CocItem | undefined>(undefined);
  private url = `${env.DIRECTUS_URL}coc${env.DIRECTUS_SECTION_FILTER}${env.SECTION_ID}`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.fetchCoc();
  }

  public getCoc(): Observable<CocItem | undefined> {
    return this.cocSubject.asObservable();
  }

  private fetchCoc(): void {
    this.http
      .get<CocItem>(this.url)
      .pipe(catchError(this.errorService.handleError<CocItem>('fetchCocList')))
      .subscribe((coc) => {
        this.cocSubject.next(coc);
      });
  }
}
