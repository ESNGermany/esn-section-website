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
import {
  IImprintEsnGerItem,
  ImprintEsnGerService,
} from './imprint-esnger.service';

import { IImprintItem, ImprintService } from './imprint.service';
import { IMainItem, MainService } from 'src/app/services/main.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'esn-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class ImprintPageComponent implements OnInit {
  private mainInfo: any;
  public imprintSection: any;
  public imprintEsnGermany: any;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private imprintEsnGerService: ImprintEsnGerService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);
    this.imprintSection = this.transferState.get(
      makeStateKey('imprintSection'),
      undefined,
    );
    this.imprintEsnGermany = this.transferState.get(
      makeStateKey('imprintEsnGermany'),
      undefined,
    );

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }

    if (!this.imprintSection) {
      this.fetchImprintSection();
    }

    if (!this.imprintEsnGermany) {
      this.fetchImprintEsnGermany();
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
    this.setTitle();
  }

  async fetchImprintSection(): Promise<void> {
    this.imprintSection = await firstValueFrom(
      this.imprintService.fetchImprint(),
    ).then((res: any) => res.data[0]);

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IImprintItem>(
        makeStateKey('imprintSection'),
        this.imprintSection,
      );
    }
  }

  async fetchImprintEsnGermany(): Promise<void> {
    this.imprintEsnGermany = await firstValueFrom(
      this.imprintEsnGerService.fetchEsnGerImprint(),
    ).then((res: any) => res[0]);

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IImprintEsnGerItem>(
        makeStateKey('imprintEsnGermany'),
        this.imprintEsnGermany,
      );
    }
  }

  private setTitle(): void {
    this.title.setTitle('Imprint | ' + this.mainInfo.section_long_name);
  }
}
