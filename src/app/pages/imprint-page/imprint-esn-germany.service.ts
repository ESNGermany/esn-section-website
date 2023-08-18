import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/services/error.service';

import { ImprintESNGermanyItem } from './imprint-esn-germany-item';

@Injectable()
export class ImprintESNGermanyService {
  private imprintSubject = new BehaviorSubject<
    ImprintESNGermanyItem | undefined
  >(undefined);

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.fetchESNGermanyImprint();
  }

  public getImprint(): Observable<ImprintESNGermanyItem | undefined> {
    return this.imprintSubject.asObservable();
  }

  private fetchESNGermanyImprint(): void {
    const url = 'https://strapi.esn-germany.de/website-imprints';

    this.http
      .get<ImprintESNGermanyItem>(url)
      .pipe(
        catchError(
          this.errorService.handleError<ImprintESNGermanyItem>(
            'fetchImprintESNGermany',
          ),
        ),
      )
      .subscribe((imprint: ImprintESNGermanyItem) => {
        this.imprintSubject.next(imprint);
      });
  }
}
