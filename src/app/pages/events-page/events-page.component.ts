import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss', './../base.scss'],
})
export class EventsPageComponent implements OnInit {
  pretixLink?: string;
  mainInfo: IMainItem | undefined;

  public loadPretix: boolean;

  constructor(
    private title: Title,
    private mainService: MainService,
    private cookieService: CookieService
  ) {
    this.loadPretix = this.cookieService.get('pretix') === 'true';
  }

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    this.title.setTitle('Events | ' + this.mainInfo!.section_long_name);
  }

  public setLoadPretix(): void {
    this.loadPretix = !this.loadPretix;
    this.cookieService.set('pretix', this.loadPretix.toString());
  }
}
