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

import { IStatutesItem, StatutesService } from './statutes.service';
import { IMainItem, MainService } from 'src/app/services/main.service';
import { isPlatformServer, NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'esn-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class StatutesPageComponent implements OnInit {
  public statutesItemList: any;
  private mainInfo: any;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);
    this.statutesItemList = this.transferState.get(
      makeStateKey('statutesItemList'),
      undefined,
    );

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }

    if (!this.statutesItemList) {
      this.fetchStatutes();
    }
  }

  async fetchStatutes(): Promise<void> {
    this.statutesItemList = await firstValueFrom(
      this.statutesService.fetchStatutes(),
    ).then((res: any) => res.data);
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IStatutesItem>(
        makeStateKey('statutesItemList'),
        this.statutesItemList,
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
    this.setTitle();
  }

  private setTitle(): void {
    this.title.setTitle('Our Team | ' + this.mainInfo.section_long_name);
  }
}
