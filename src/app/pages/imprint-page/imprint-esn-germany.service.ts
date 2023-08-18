import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { ImprintESNGermanyItem } from './imprint-esn-germany-item';

@Injectable()
export class ImprintESNGermanyService {
  private imprintSubject = new BehaviorSubject<
    ImprintESNGermanyItem | undefined
  >(undefined);
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchESNGermanyImprint();
  }

  public getImprint(): Observable<ImprintESNGermanyItem | undefined> {
    return this.imprintSubject.asObservable();
  }

  private fetchESNGermanyImprint(): void {
    const url = 'https://strapi.esn-germany.de/website-imprints';

    this.http
      .get<ImprintESNGermanyItem>(url)
      .pipe(
        catchError(
          this.handleError<ImprintESNGermanyItem>('fetchImprintESNGermany'),
        ),
      )
      .subscribe((imprint: ImprintESNGermanyItem) => {
        this.imprintSubject.next(imprint);
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
    this.messageService.add(`ImprintESNGermanyService: ${message}`);
  }
}
