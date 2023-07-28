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

import { environment } from 'src/environments/environment';
import { IPartnerItem, PartnerService } from './partner.service';
import { IMainItem, MainService } from 'src/app/services/main.service';
import {
  INationalPartnerItem,
  NationalPartnersService,
} from './national-partners.service';
import { isPlatformServer, NgIf, NgFor, NgClass } from '@angular/common';
import { OlaContentItemComponent } from '../../components/ola-content-item/ola-content-item.component';
import { NationalPartnersComponent } from '../../components/national-partners/national-partners.component';
import { ContentItemComponent } from '../../components/content-item/content-item.component';

@Component({
  selector: 'esn-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [
    ContentItemComponent,
    NgIf,
    NgFor,
    NgClass,
    NationalPartnersComponent,
    OlaContentItemComponent,
  ],
})
export class EsncardPageComponent implements OnInit {
  public partnerInfo: any;
  public nationalPartner: any;
  private mainInfo: any;

  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public cityName?: string;
  public readonly page: string = 'ESNcard_page';

  constructor(
    private title: Title,
    private partnerService: PartnerService,
    private nationalPartnerService: NationalPartnersService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);
    this.partnerInfo = this.transferState.get(
      makeStateKey('partnerInfo'),
      undefined,
    );
    this.nationalPartner = this.transferState.get(
      makeStateKey('nationalPartner'),
      undefined,
    );

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }
    if (!this.partnerInfo) {
      this.fetchPartnerInfo();
    }
    if (!this.nationalPartner) {
      this.fetchNationalPartner();
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
    this.cityName = this.mainInfo.section_short_name;
  }

  async fetchPartnerInfo(): Promise<void> {
    this.partnerInfo = await firstValueFrom(
      this.partnerService.fetchPagePartner(),
    ).then((res: any) => res.data);
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IPartnerItem[]>(
        makeStateKey('partnerInfo'),
        this.partnerInfo,
      );
    }
  }

  async fetchNationalPartner(): Promise<void> {
    this.nationalPartner = await firstValueFrom(
      this.nationalPartnerService.fetchPageNationalPartner(),
    ).then((res: any) => res.data);
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<INationalPartnerItem[]>(
        makeStateKey('nationalPartner'),
        this.nationalPartner,
      );
    }
  }

  public toggleInfo(partner: IPartnerItem): void {
    partner.show = !partner.show;
    if (!partner.show) {
      partner.buttonText = `More info ↓`;
    } else {
      partner.buttonText = `Less info ↑`;
    }
  }

  private setTitle(): void {
    this.title.setTitle(
      'ESNcard & Partners | ' + this.mainInfo.section_long_name,
    );
  }
}
