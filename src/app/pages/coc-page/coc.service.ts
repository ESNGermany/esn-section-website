import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { CocItem } from './coc-item';

@Injectable()
export class CocService {
  private url = 'https://strapi.esn-germany.de/web-legal-documents/4';
  private cocSubject = new BehaviorSubject<CocItem | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchCoc();
  }

  public getCoc(): Observable<CocItem | undefined> {
    return this.cocSubject.asObservable();
  }

  private fetchCoc(): void {
    this.http
      .get<CocItem>(this.url)
      .pipe(catchError(this.handleError<CocItem>('fetchCocList')))
      .subscribe((coc) => {
        this.cocSubject.next(coc);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`CocService: ${message}`);
  }
}
