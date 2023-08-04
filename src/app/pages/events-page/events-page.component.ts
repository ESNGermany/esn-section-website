import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { isPlatformServer, NgIf } from '@angular/common';
import { PretixCalendarComponent } from '../../components/pretix-calendar/pretix-calendar.component';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar.component';

@Component({
  selector: 'esn-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [NgIf, CustomCalendarComponent, PretixCalendarComponent],
})
export class EventsPageComponent implements OnInit {
  public mainInfo: IMainItem | undefined;
  public loadPretix: boolean;

  constructor(
    private title: Title,
    private mainService: MainService,
    private cookieService: CookieService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.loadPretix = this.cookieService.get('pretix') === 'true';
  }

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }
  }

  async fetchMainInfo(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain());

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IMainItem>(
        makeStateKey('mainInfo'),
        this.mainInfo,
      );
    }
    this.setTitle();
  }

  public setLoadPretix(): void {
    this.loadPretix = !this.loadPretix;
    this.cookieService.set('pretix', this.loadPretix.toString());
  }

  private setTitle(): void {
    this.title.setTitle('Events | ' + this.mainInfo!.section_long_name);
  }
}
