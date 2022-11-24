import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

export interface IFaqItem {
  question: string;
  answer: string;
  order_within_category: number;
  category: {
    category: string;
  };
}

@Injectable()
export class FaqService {
  private url =
    environment.DIRECTUS_URL_W +
    'faq' +
    environment.DIRECTUS_SECTION_FILTER +
    environment.SECTION_NAME + 
    '&fields=question,answer,order_within_category,category.category' +
    '&sort=order_within_category' + 
    '&filter[category][category]=';
  private fullUrl: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchFaq(singleCategory: string): Observable<IFaqItem[]> {
    this.fullUrl = this.url + singleCategory;
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
