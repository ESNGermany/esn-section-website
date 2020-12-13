import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface FaqItem {
  id: string;
  Question: string;
  Answer: string;
  Category: string;
  Order_within_category: number;
}

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private url = 'https://strapi.esn-freiburg.de/website-faqs';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchFaq(): Observable<FaqItem[]> {
    return this.http.get<FaqItem[]>(this.url).pipe(
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
