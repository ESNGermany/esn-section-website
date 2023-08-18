import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';
import { environment as env } from 'src/environments/environment';

import { FaqItem } from './faq-item';

export interface IFaqItem {
  data: FaqItem[];
}

@Injectable()
export class FaqService {
  private faqSubjectTransport = new BehaviorSubject<FaqItem[]>([]);
  private faqSubjectHousing = new BehaviorSubject<FaqItem[]>([]);
  private faqSubjectErasmus = new BehaviorSubject<FaqItem[]>([]);
  private faqSubjectCorona = new BehaviorSubject<FaqItem[]>([]);
  private faqSubjectESNcard = new BehaviorSubject<FaqItem[]>([]);
  private faqSubjectOther = new BehaviorSubject<FaqItem[]>([]);
  private url = `${env.DIRECTUS_URL}faq${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&filter[category][category]=`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.fetchFaq('Transport');
    this.fetchFaq('Housing');
    this.fetchFaq('Uni_Erasmus');
    this.fetchFaq('Corona');
    this.fetchFaq('ESNcard');
    this.fetchFaq('Other');
  }

  public getFaqTransport(): Observable<FaqItem[]> {
    return this.faqSubjectTransport.asObservable();
  }

  public getFaqHousing(): Observable<FaqItem[]> {
    return this.faqSubjectHousing.asObservable();
  }

  public getFaqErasmus(): Observable<FaqItem[]> {
    return this.faqSubjectErasmus.asObservable();
  }

  public getFaqCorona(): Observable<FaqItem[]> {
    return this.faqSubjectCorona.asObservable();
  }

  public getFaqESNcard(): Observable<FaqItem[]> {
    return this.faqSubjectESNcard.asObservable();
  }

  public getFaqOther(): Observable<FaqItem[]> {
    return this.faqSubjectOther.asObservable();
  }

  private fetchFaq(singleCategory: string): void {
    const params = new HttpParams()
      .set('fields', 'question,answer,order_within_category,category.category')
      .set('sort', 'order_within_category');

    this.http
      .get<IFaqItem>(`${this.url}${singleCategory}`, { params })
      .pipe(catchError(this.errorService.handleError<IFaqItem>('fetchFaqList')))
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
}
