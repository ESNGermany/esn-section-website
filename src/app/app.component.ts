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
import { isPlatformServer, NgClass } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgClass, NavigationComponent, RouterOutlet, FooterComponent],
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
    this.meta.addTags([{ rel: 'canonical', href: REPLACE_SECTION_URL }]);

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
