import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { FaqItem, FaqService } from 'src/app/services/faq.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss'],
})
export class IncomingsPageComponent implements OnInit {
  contentInfo$: Observable<ContentItem[]>;
  faqTransportItemList$: Observable<FaqItem[]>;
  faqHousingItemList$: Observable<FaqItem[]>;
  faqUniErasmusItemList$: Observable<FaqItem[]>;
  faqCoronaItemList$: Observable<FaqItem[]>;
  faqEsncardItemList$: Observable<FaqItem[]>;
  faqOtherItemList$: Observable<FaqItem[]>;

  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private faqService: FaqService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent('Incomings_page')
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('For Incomings | ' + mainInfo?.sectionLongName);

    this.faqTransportItemList$ = this.faqService
      .fetchFaq('Transport')
      .pipe(shareReplay(1));

    this.faqHousingItemList$ = this.faqService
      .fetchFaq('Housing')
      .pipe(shareReplay(1));

    this.faqUniErasmusItemList$ = this.faqService
      .fetchFaq('Uni_Erasmus')
      .pipe(shareReplay(1));

    this.faqCoronaItemList$ = this.faqService
      .fetchFaq('Corona')
      .pipe(shareReplay(1));

    this.faqEsncardItemList$ = this.faqService
      .fetchFaq('ESNcard')
      .pipe(shareReplay(1));

    this.faqOtherItemList$ = this.faqService
      .fetchFaq('Other')
      .pipe(shareReplay(1));
  }
}
