import { DOCUMENT, isPlatformServer, NgIf } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IStatutesItem,
  StatutesService,
} from 'src/app/pages/statutes-page/statutes.service';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'esn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
})
export class FooterComponent implements OnInit {
  public mainInfo: any;
  public statutes: any;
  public timestamp: string = environment.timeStamp;
  public statutesExist = false;

  constructor(
    private mainService: MainService,
    private statutesService: StatutesService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get<IMainItem | undefined>(
      makeStateKey('mainInfo'),
      undefined,
    );
    if (!this.mainInfo) {
      this.fetchMainInfo();
    }

    this.statutes = this.transferState.get<IStatutesItem | undefined>(
      makeStateKey('statutes'),
      undefined,
    );
    if (!this.statutes) {
      this.fetchStatutes();
    }
  }

  async fetchStatutes(): Promise<void> {
    const statutes = await firstValueFrom(
      this.statutesService.fetchStatutes(),
    ).then((res: any) => res.data[0]);
    this.statutesExist = !!statutes;

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IStatutesItem>(
        makeStateKey('statutes'),
        this.statutes,
      );
    }
  }

  async fetchMainInfo(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0],
    );
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IMainItem>(
        makeStateKey('mainInfo'),
        this.mainInfo,
      );
    }
  }

  public pink(): void {
    const footer = this.document.getElementById('foot');
    const footer2 = this.document.getElementById('foot2');
    const footer3 = this.document.getElementById('foot3');
    const strapiLink = this.document.getElementById('strapiLink');
    footer!.setAttribute('style', 'background-color: #ec008c');
    footer2!.setAttribute('style', 'fill: #ec008c');
    footer3!.setAttribute('style', 'fill: #ec008c');
    strapiLink!.setAttribute('style', 'color: #eaeaea !important');
  }
}
