import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PartnerItem, PartnerService } from 'src/app/services/partner.service';
import { environment } from 'src/environments/environment';
import { MainItem, MainService } from 'src/app/services/main.service';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import {
  NationalPartnerItem,
  NationalPartnersService,
} from 'src/app/services/national-partners.service';

@Component({
  selector: 'app-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss'],
})
export class EsncardPageComponent implements OnInit {
  partnerInfo$: Observable<PartnerItem[]> | undefined;
  globals$: Observable<MainItem>;
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  cityName?: string;
  nationalPartner$: Observable<NationalPartnerItem[]> | undefined;

  page: string = 'ESNcard_page';

  constructor(
    private title: Title,
    private partnerService: PartnerService,
    private nationalPartnerService: NationalPartnersService,
    private mainService: MainService
  ) {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
  }

  async ngOnInit() {
    this.partnerInfo$ = this.partnerService
      .fetchPagePartner()
      .pipe(shareReplay(1));

    this.nationalPartner$ = this.nationalPartnerService
      .fetchPageNationalPartner()
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('ESNcard & Partners | ' + mainInfo?.sectionLongName);
    this.cityName = mainInfo?.sectionShortName.split(' ')[1];

    // initialize each buttontext
    this.partnerService.fetchPagePartner().subscribe((listPartners) => {
      for (let p of listPartners) {
        p.buttonText = 'Learn More ↓';
      }
    });
  }

  toggleInfo(partner: PartnerItem): void {
    partner.show = !partner.show;

    if (!partner.show) {
      partner.buttonText = `Learn more ↓`;
    } else {
      partner.buttonText = `Hide text ↑`;
    }
  }
}
