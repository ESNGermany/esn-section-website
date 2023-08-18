import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { NationalPartnerItem } from './national-partner-item';

export interface INationalPartnerItem {
  data: NationalPartnerItem[];
}

@Injectable({
  providedIn: 'root',
})
export class NationalPartnerService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchPageNationalPartner(): Observable<INationalPartnerItem[]> {
    const url = `${env.DIRECTUS_URL_ITEMS}national_website_partners`;
    const params = new HttpParams().set('fields', '*.*');
    return this.http.get<INationalPartnerItem[]>(url, { params }).pipe(
      shareReplay(1),
      // map res on res.data and add the buttonText to each item of the list
      map((res: any) => res.data),
      map((res: any) => {
        return res.map((item: any) => {
          return {
            ...item,
            buttonText: 'More info',
          };
        });
      }),
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
    this.messageService.add(`NationalPartnerService: ${message}`);
  }
}
