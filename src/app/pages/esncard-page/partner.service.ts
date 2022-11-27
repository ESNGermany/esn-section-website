import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
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
  private url =
    environment.DIRECTUS_URL_W +
    'partners' +
    environment.DIRECTUS_SECTION_FILTER +
    environment.SECTION_NAME +
    '&fields=name,deal,link,order,main_image.*' +
    '&sort=order';
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<IPartnerItem[]>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched partner')),
      catchError(this.handleError<IPartnerItem[]>('fetchPartnerList', []))
    );
  }

  fetchPagePartner(): Observable<IPartnerItem[]> {
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
    this.messageService.add(`PartnerService: ${message}`);
  }
}
