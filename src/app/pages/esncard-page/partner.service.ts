import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

export interface IPartnerItem {
  name: string;
  deal: string;
  link: string;
  order: number;
  main_image: {
    id: string;
  };
  buttonText: string;
  show: boolean;
}

@Injectable()
export class PartnerService {
  private url = `${env.DIRECTUS_URL}partners${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  fetchPagePartner(): Observable<IPartnerItem[]> {
    const params = new HttpParams().set('fields', '*.*').set('sort', 'order');

    return this.http.get<IPartnerItem[]>(this.url, { params }).pipe(
      shareReplay(1),
      map((res: any) => res.data),
      tap(() => this.log('fetched partner')),
      catchError(this.handleError<IPartnerItem[]>('fetchPartnerList', [])),
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
    this.messageService.add(`PartnerService: ${message}`);
  }
}
