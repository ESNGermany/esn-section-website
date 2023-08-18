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
import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
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
  public statutesItem: IStatutesItem | undefined;
  private mainInfo: any;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
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
    this.fetchStatutes();
  }

  async fetchStatutes(): Promise<void> {
    this.statutesItem = await firstValueFrom(
      this.statutesService.fetchStatutes(),
    );
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IStatutesItem>(
        makeStateKey('statutesItemList'),
        this.statutesItem,
      );
    }
  }

  private setTitle(): void {
    this.title.setTitle('Our Team | ' + this.mainInfo?.section_long_name);
  }
}
