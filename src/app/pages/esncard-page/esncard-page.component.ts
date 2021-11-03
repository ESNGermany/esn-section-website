import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { PartnerItem, PartnerService } from 'src/app/services/partner.service';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss'],
})
export class EsncardPageComponent implements OnInit {
  contentInfo$: Observable<ContentItem[]>;
  partnerInfo$: Observable<PartnerItem[]>;
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private partnerService: PartnerService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent('ESNcard_page')
      .pipe(
        shareReplay(1)
      );
    this.partnerInfo$ = this.partnerService.fetchPagePartner().pipe(
      shareReplay(1)
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('ESNcard & Partners | ' + mainInfo?.sectionLongName);
  }
}
