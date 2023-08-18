import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { PartnerItem } from './partner-item';
import { NationalPartnerItem } from './national-partner-item';

export interface IPartnerItem {
  data: PartnerItem[];
}
export interface INationalPartnerItem {
  data: NationalPartnerItem[];
}

@Injectable()
export class PartnerService {
  private url = `${env.DIRECTUS_URL}partners${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;
  private partnerSubject = new BehaviorSubject<PartnerItem[]>([]);
  private nationalPartnerSubject = new BehaviorSubject<NationalPartnerItem[]>(
    [],
  );

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchSectionPartners();
    this.fetchNationalPartners();
  }

  public getSectionPartners(): Observable<PartnerItem[]> {
    return this.partnerSubject.asObservable();
  }
  public getNationalPartners(): Observable<NationalPartnerItem[]> {
    return this.nationalPartnerSubject.asObservable();
  }
  private fetchSectionPartners(): void {
    const params = new HttpParams().set('fields', '*.*').set('sort', 'order');
    this.http
      .get<IPartnerItem>(this.url, { params })
      .pipe(catchError(this.handleError<IPartnerItem>('fetchSectionPartners')))
      .subscribe((partner: IPartnerItem) => {
        this.partnerSubject.next(partner.data);
      });
  }

  private fetchNationalPartners(): void {
    const url = `${env.DIRECTUS_URL_ITEMS}national_website_partners`;
    const params = new HttpParams().set('fields', '*.*');
    this.http
      .get<INationalPartnerItem>(url, { params })
      .pipe(
        catchError(
          this.handleError<INationalPartnerItem>('fetchNationalPartners'),
        ),
      )
      .subscribe((partner: INationalPartnerItem) => {
        const partners = partner.data.map((item: any) => {
          return {
            ...item,
            buttonText: 'More info',
          };
        });
        this.nationalPartnerSubject.next(partners);
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
    this.messageService.add(`PartnerService: ${message}`);
  }
}
