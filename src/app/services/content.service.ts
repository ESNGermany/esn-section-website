import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface ContentItem {
  id: string;
  Title: string;
  Text: string;
  Layout:
    | 'Text_above_img_below'
    | 'Text_below_img_above'
    | 'Text_left_img_right'
    | 'Text_right_img_left';
  Wrap_in_shadow_box: boolean;
  Page_for_display:
    | 'Landing_page'
    | 'Members_page'
    | 'Team_page'
    | 'ESNcard_page'
    | 'Incomings_page';
  Order_on_page: number;
  Image: {
    id: string;
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  Youtube_video_embed_link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private url =
    'https://strapi.esn-freiburg.de/website-contents?_sort=Order_on_page&Page_for_display=';
  private fullUrl: string;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchPageContent(page: string): Observable<ContentItem[]> {
    this.fullUrl = this.url + page;
    return this.http.get<ContentItem[]>(this.fullUrl).pipe(
      tap((_) => this.log('fetched content')),
      catchError(this.handleError<ContentItem[]>('fetchContentList', []))
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
    this.messageService.add(`ContentService: ${message}`);
  }
}
