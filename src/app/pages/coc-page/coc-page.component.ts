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
import { IMainItem, MainService } from 'src/app/services/main.service';
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
  private mainInfo: IMainItem | undefined;

  constructor(
    private title: Title,
    private cocService: CocService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);
    this.cocItem = this.transferState.get(makeStateKey('cocItem'), undefined);

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }
    if (!this.cocItem) {
      this.fetchCocInfo();
    }
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

  async fetchMainInfo(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain());
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IMainItem>(
        makeStateKey('mainInfo'),
        this.mainInfo,
      );
    }
  }

  private setTitle(): void {
    this.title.setTitle(
      'Code of Conduct | ' + this.mainInfo!.section_long_name,
    );
  }
}
