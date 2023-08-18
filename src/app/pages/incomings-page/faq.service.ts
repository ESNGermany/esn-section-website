import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { FaqItem } from './faq-item';

export interface IFaqItem {
  data: FaqItem[];
}

@Injectable()
export class FaqService {
  private url = `${env.DIRECTUS_URL}faq${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&filter[category][category]=`;
  private faqSubjectTransport = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );
  private faqSubjectHousing = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );
  private faqSubjectErasmus = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );
  private faqSubjectCorona = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );
  private faqSubjectESNcard = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );
  private faqSubjectOther = new BehaviorSubject<FaqItem[] | undefined>(
    undefined,
  );

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchFaq('Transport');
    this.fetchFaq('Housing');
    this.fetchFaq('Uni_Erasmus');
    this.fetchFaq('Corona');
    this.fetchFaq('ESNcard');
    this.fetchFaq('Other');
  }

  public getFaqTransport(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectTransport.asObservable();
  }

  public getFaqHousing(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectHousing.asObservable();
  }

  public getFaqErasmus(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectErasmus.asObservable();
  }

  public getFaqCorona(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectCorona.asObservable();
  }

  public getFaqESNcard(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectESNcard.asObservable();
  }

  public getFaqOther(): Observable<FaqItem[] | undefined> {
    return this.faqSubjectOther.asObservable();
  }

  private fetchFaq(singleCategory: string): void {
    const params = new HttpParams()
      .set('fields', 'question,answer,order_within_category,category.category')
      .set('sort', 'order_within_category');

    this.http
      .get<IFaqItem>(`${this.url}${singleCategory}`, { params })
      .pipe(catchError(this.handleError<IFaqItem>('fetchFaqList')))
      .subscribe((faq: IFaqItem) => {
        switch (singleCategory) {
          case 'Transport':
            this.faqSubjectTransport.next(faq?.data);
            break;
          case 'Housing':
            this.faqSubjectHousing.next(faq?.data);
            break;
          case 'Uni_Erasmus':
            this.faqSubjectErasmus.next(faq?.data);
            break;
          case 'Corona':
            this.faqSubjectCorona.next(faq?.data);
            break;
          case 'ESNcard':
            this.faqSubjectESNcard.next(faq?.data);
            break;
          case 'Other':
            this.faqSubjectOther.next(faq?.data);
            break;
        }
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
    this.messageService.add(`FaqService: ${message}`);
  }
}
