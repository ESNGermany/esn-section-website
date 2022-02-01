import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { MessageService } from './message.service';

export interface NationalPartnerItem {
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
  private url = 'https://strapi.esn-germany.de/web-partner';
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<NationalPartnerItem[]>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched partner')),
      catchError(
        this.handleError<NationalPartnerItem[]>('fetchPartnerList', [])
      )
    );
  }

  fetchPageNationalPartner(): Observable<NationalPartnerItem[]> {
    return this.dataRequest;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`PartnersService: ${message}`);
  }
}
