import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPartnerItem, PartnerService } from './partner.service';
import { IMainItem, MainService } from 'src/app/services/main.service';
import {
  INationalPartnerItem,
  NationalPartnersService,
} from './national-partners.service';

@Component({
  selector: 'esn-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss', './../base.scss'],
})
export class EsncardPageComponent implements OnInit {
  partnerInfo$: Observable<IPartnerItem[]> | undefined;
  mainInfo: IMainItem | undefined;

  nationalPartner$: Observable<INationalPartnerItem[]> | undefined;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public cityName?: string;
  public readonly page: string = 'ESNcard_page';

  constructor(
    private title: Title,
    private partnerService: PartnerService,
    private nationalPartnerService: NationalPartnersService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );

    this.partnerInfo$ = this.partnerService.fetchPagePartner().pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.nationalPartner$ = this.nationalPartnerService
      .fetchPageNationalPartner()
      .pipe(shareReplay(1));

    this.title.setTitle(
      'ESNcard & Partners | ' + this.mainInfo!.section_long_name
    );
    this.cityName = this.mainInfo!.section_short_name;
  }

  public toggleInfo(partner: IPartnerItem): void {
    partner.show = !partner.show;
    if (!partner.show) {
      partner.buttonText = `More info ↓`;
    } else {
      partner.buttonText = `Less info ↑`;
    }
  }
}
