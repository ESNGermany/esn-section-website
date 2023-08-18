import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';
import { environment as env } from 'src/environments/environment';

import { ImprintItem } from './imprint-item';

export interface IImprintItem {
  data: ImprintItem[];
}

@Injectable()
export class ImprintService {
  private imprintSubject = new BehaviorSubject<ImprintItem | undefined>(
    undefined,
  );
  private url = `${env.DIRECTUS_URL}imprint${env.DIRECTUS_SECTION_FILTER}${env.SECTION_NAME}&fields=title,text`;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.fetchImprint();
  }

  public getImprint(): Observable<ImprintItem | undefined> {
    return this.imprintSubject.asObservable();
  }

  private fetchImprint(): void {
    this.http
      .get<IImprintItem>(this.url)
      .pipe(
        catchError(
          this.errorService.handleError<IImprintItem>('fetchImprintList'),
        ),
      )
      .subscribe((imprint: IImprintItem) => {
        this.imprintSubject.next(imprint?.data[0]);
      });
  }
}
