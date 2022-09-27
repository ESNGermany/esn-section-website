import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss', './../base.scss']
})
export class EventsPageComponent implements OnInit {
  globals$: Observable<IMainItem> | undefined;
  pretixLink?: string;

  public loadPretix: boolean;

  constructor(
    private title: Title,
    private mainService: MainService,
    private cookieService: CookieService
  ) {
    this.loadPretix = this.cookieService.get('pretix') === 'true';
  }

  async ngOnInit(): Promise<void> {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Events | ' + mainInfo?.sectionLongName);
  }

  public setLoadPretix(): void {
    this.loadPretix = !this.loadPretix;
    this.cookieService.set('pretix', this.loadPretix.toString());
  }
}
