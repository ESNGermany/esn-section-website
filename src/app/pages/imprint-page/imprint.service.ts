import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { ImprintItem } from './imprint-item';

export interface IImprintItem {
  data: ImprintItem[];
}

@Injectable()
export class ImprintService {
  private url = `${env.DIRECTUS_URL}imprint${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&fields=title,text`;
  private imprintSubject = new BehaviorSubject<ImprintItem | undefined>(
    undefined,
  );

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchImprint();
  }

  public getImprint(): Observable<ImprintItem | undefined> {
    return this.imprintSubject.asObservable();
  }

  private fetchImprint(): void {
    this.http
      .get<IImprintItem>(this.url)
      .pipe(catchError(this.handleError<IImprintItem>('fetchImprintList')))
      .subscribe((imprint: IImprintItem) => {
        this.imprintSubject.next(imprint?.data[0]);
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
    this.messageService.add(`ImprintService: ${message}`);
  }
}
