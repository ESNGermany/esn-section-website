import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
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
  private url = `${env.DIRECTUS_URL}faq${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&filter[category][category]=`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchFaq(singleCategory: string): Observable<IFaqItem[]> {
    const params = new HttpParams()
      .set('fields', 'question,answer,order_within_category,category.category')
      .set('sort', 'order_within_category');

    return this.http
      .get<IFaqItem[]>(`${this.url}${singleCategory}`, { params })
      .pipe(
        shareReplay(1),
        map((res: any) => res.data),
        tap(() => this.log('fetched faq')),
        catchError(this.handleError<IFaqItem[]>('fetchFaqList', [])),
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
