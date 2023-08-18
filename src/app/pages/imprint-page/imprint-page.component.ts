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

import { ImprintService } from './imprint.service';
import { ImprintItem } from './imprint-item';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
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
  public imprintSection?: ImprintItem;
  public imprintEsnGermany?: IImprintEsnGerItem;
  private mainInfo?: MainItem;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private imprintEsnGerService: ImprintEsnGerService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
    }

    this.imprintService.getImprint().subscribe({
      next: (imprintSection?: ImprintItem) => {
        this.imprintSection = imprintSection;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.fetchImprintEsnGermany();
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
