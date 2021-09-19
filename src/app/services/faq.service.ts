import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

interface FaqItem {
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
    'faqs?_sort=Order_within_category&Category=';
  private fullUrl: string = '';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchFaq(category: string): Observable<FaqItem[]> {
    this.fullUrl = this.url + category;
    return this.http.get<FaqItem[]>(this.fullUrl).pipe(
      tap((_) => this.log('fetched faq')),
      catchError(this.handleError<FaqItem[]>('fetchFaqList', []))
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
