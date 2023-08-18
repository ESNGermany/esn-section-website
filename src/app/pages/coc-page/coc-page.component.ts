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

import { ICocItem, CocService } from './coc.service';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { isPlatformServer, NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'esn-coc-page',
  templateUrl: './coc-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class CocPageComponent implements OnInit {
  public cocItem: ICocItem | undefined;
  private mainInfo: MainItem | undefined;

  constructor(
    private title: Title,
    private cocService: CocService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainService
      .getMainInformation()
      .subscribe((mainInfo: MainItem | undefined) => {
        this.mainInfo = mainInfo!;
      });

    if (this.mainInfo) {
      this.setTitle();
    }
    this.fetchCocInfo();
  }

  async fetchCocInfo(): Promise<void> {
    this.cocItem = await firstValueFrom(this.cocService.fetchCoc()).then(
      (res: any) => res,
    );

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<ICocItem | undefined>(
        makeStateKey('cocItem'),
        this.cocItem,
      );
    }
  }

  private setTitle(): void {
    this.title.setTitle(
      'Code of Conduct | ' + this.mainInfo?.section_long_name,
    );
  }
}
