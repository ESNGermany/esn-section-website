import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';

import { MessageService } from '../../services/message.service';

export interface INationalPartnerItem {
  id: string;
  Name: string;
  Description: string;
  Deal: string;
  Link: string;
  Logo: {
    alternativeText: string;
    caption: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  show: boolean;
  buttonText: string;
}

@Injectable({
  providedIn: 'root',
})
export class NationalPartnersService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchPageNationalPartner(): Observable<INationalPartnerItem[]> {
    const url = 'https://strapi.esn-germany.de/web-partner';
    return this.http.get<INationalPartnerItem[]>(url).pipe(
      shareReplay(1),
      tap(() => this.log('fetched partner')),
      catchError(
        this.handleError<INationalPartnerItem[]>('fetchPartnerList', []),
      ),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`NationalPartnersService: ${message}`);
  }
}
