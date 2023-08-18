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

import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
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
  public mainInfo: MainItem | undefined;
  public statutes: IStatutesItem | undefined;
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
    this.mainService
      .getMainInformation()
      .subscribe((mainInfo: MainItem | undefined) => {
        this.mainInfo = mainInfo!;
      });
    this.fetchStatutes();
  }

  async fetchStatutes(): Promise<void> {
    const statutes = await firstValueFrom(this.statutesService.fetchStatutes());
    this.statutesExist = !!statutes;

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IStatutesItem | undefined>(
        makeStateKey('statutes'),
        this.statutes,
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
