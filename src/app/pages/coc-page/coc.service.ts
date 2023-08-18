import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';

import { CocItem } from './coc-item';

@Injectable()
export class CocService {
  private cocSubject = new BehaviorSubject<CocItem | undefined>(undefined);
  private url = 'https://strapi.esn-germany.de/web-legal-documents/4';

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
