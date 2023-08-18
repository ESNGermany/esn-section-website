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
import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { isPlatformServer, NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'esn-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class ImprintPageComponent implements OnInit {
  private mainInfo?: MainItem;
  public imprintSection?: IImprintItem;
  public imprintEsnGermany?: IImprintEsnGerItem;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private imprintEsnGerService: ImprintEsnGerService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe((mainInfo?: MainItem) => {
      this.mainInfo = mainInfo!;
    });

    if (this.mainInfo) {
      this.setTitle();
    }
    this.fetchImprintEsnGermany();
    this.fetchImprintSection();
  }

  async fetchImprintSection(): Promise<void> {
    this.imprintSection = await firstValueFrom(
      this.imprintService.fetchImprint(),
    );

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
      this.transferState.set<IImprintEsnGerItem | undefined>(
        makeStateKey('imprintEsnGermany'),
        this.imprintEsnGermany,
      );
    }
  }

  private setTitle(): void {
    this.title.setTitle('Legal Notice | ' + this.mainInfo?.section_long_name);
  }
}
