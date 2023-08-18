import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';
import { environment as env } from 'src/environments/environment';

import { NationalPartnerItem } from './national-partner-item';
import { PartnerItem } from './partner-item';

export interface IPartnerItem {
  data: PartnerItem[];
}
export interface INationalPartnerItem {
  data: NationalPartnerItem[];
}

@Injectable()
export class PartnerService {
  private partnerSubject = new BehaviorSubject<PartnerItem[]>([]);
  private nationalPartnerSubject = new BehaviorSubject<NationalPartnerItem[]>(
    [],
  );
  private url = `${env.DIRECTUS_URL}partners${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
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
      .pipe(
        catchError(
          this.errorService.handleError<IPartnerItem>('fetchSectionPartners'),
        ),
      )
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
          this.errorService.handleError<INationalPartnerItem>(
            'fetchNationalPartners',
          ),
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
}
