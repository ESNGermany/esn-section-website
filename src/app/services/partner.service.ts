import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

interface PartnerItem {
  id: string;
  Name: string;
  Deal: string;
  Link: string;
  Main_image: {
    id: string;
    alternativeText: string;
    url: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

@Injectable()
export class PartnerService {
  private url = environment.STRAPI_SECTION_URL + 'partners?_sort=Order';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchPagePartner(): Observable<PartnerItem[]> {
    return this.http.get<PartnerItem[]>(this.url).pipe(
      tap((_) => this.log('fetched partner')),
      catchError(this.handleError<PartnerItem[]>('fetchPartnerList', []))
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
    this.messageService.add(`PartnerService: ${message}`);
  }
}
