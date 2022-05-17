import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface IFaqItem {
  id: string;
  Question: string;
  Answer: string;
  Category: string;
  Order_within_category: number;
}

@Injectable()
export class FaqService {
  private url =
    environment.STRAPI_SECTION_URL +
    'faqs?_created_by=' +
    environment.STRAPI_SECTION_ID +
    '&_sort=Order_within_category&Category=';
  private fullUrl: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchFaq(category: string): Observable<IFaqItem[]> {
    this.fullUrl = this.url + category;
    return this.http.get<IFaqItem[]>(this.fullUrl).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched faq')),
      catchError(this.handleError<IFaqItem[]>('fetchFaqList', []))
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
    this.messageService.add(`FaqService: ${message}`);
  }
}
