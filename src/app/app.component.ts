import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { IMainItem, MainService } from './services/main.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public mainInfo: any;

  constructor(
    private mainService: MainService,
    private transferState: TransferState,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get<IMainItem | undefined>(
      makeStateKey('mainInfo'),
      undefined,
    );
    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }
  }

  async fetchMainInfo(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0],
    );
    this.meta.addTags([
      { name: 'description', content: this.mainInfo.section_long_name },
    ]);

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IMainItem>(
        makeStateKey('mainInfo'),
        this.mainInfo,
      );
    }
    this.setTitle();
  }

  private setTitle(): void {
    this.title.setTitle('Home | ' + this.mainInfo.section_long_name);
  }
}
