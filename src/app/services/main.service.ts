import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';

import { ErrorService } from './error.service';
import { MainItem } from './main-item';

export interface IMainItem {
  data: MainItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private mainInformationSubject = new BehaviorSubject<MainItem | undefined>(
    undefined,
  );
  private url = `${env.DIRECTUS_URL}main_information${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
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
      .pipe(
        catchError(
          this.errorService.handleError<IMainItem>('getMainInformation'),
        ),
      )
      .subscribe((main: IMainItem) => {
        this.mainInformationSubject.next(main?.data[0]);
      });
  }
}
