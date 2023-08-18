import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { MessageService } from './message.service';
import { MainItem } from './main-item';

export interface IMainItem {
  data: MainItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private url = `${env.DIRECTUS_URL}main_information${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;
  private mainInformationSubject = new BehaviorSubject<MainItem | undefined>(
    undefined,
  );

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.fetchMain();
  }

  public getMainInformation(): Observable<MainItem | undefined> {
    return this.mainInformationSubject.asObservable();
  }

  private fetchMain(): void {
    const params = new HttpParams().set('fields', '*.*');

    this.http
      .get<IMainItem>(this.url, { params })
      .pipe(catchError(this.handleError('getMainInformation', null)))
      .subscribe((main) => {
        this.mainInformationSubject.next(main?.data[0]);
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
    this.messageService.add(`MainService: ${message}`);
  }
}
