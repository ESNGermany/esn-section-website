import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';
import { FaqService } from 'src/app/services/faq.service';
import { MainService } from 'src/app/services/main.service';

interface FaqItem {
  id: string;
  Question: string;
  Answer: string;
  Category: string;
  Order_within_category: number;
}

interface ContentItem {
  id: string;
  Title: string;
  Text: string;
  Layout:
    | 'Text_above_img_below'
    | 'Text_below_img_above'
    | 'Text_left_img_right'
    | 'Text_right_img_left';
  Wrap_in_shadow_box: boolean;
  Page_for_display:
    | 'Landing_page'
    | 'Members_page'
    | 'Team_page'
    | 'ESNcard_page'
    | 'Incomings_page';
  Order_on_page: number;
  Image: {
    id: string;
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

@Component({
  selector: 'app-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss'],
})
export class IncomingsPageComponent implements OnInit {
  contentItemList: ContentItem[] = [];
  faqTransportItemList: FaqItem[] = [];
  faqHousingItemList: FaqItem[] = [];
  faqUniErasmusItemList: FaqItem[] = [];
  faqCoronaItemList: FaqItem[] = [];
  faqEsncardItemList: FaqItem[] = [];
  faqOtherItemList: FaqItem[] = [];
  contentLoaded: Promise<boolean>;
  siteTitle: string;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private faqService: FaqService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.getContent();
    this.getFaqTransport();
    this.getFaqHousing();
    this.getFaqUniErasmus();
    this.getFaqCorona();
    this.getFaqEsncard();
    this.getFaqOther();
  }

  getContent(): void {
    this.contentService
      .fetchPageContent('Incomings_page')
      .subscribe((contentItemList) => (this.contentItemList = contentItemList));
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      const title = 'For Incomings | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }

  getFaqTransport(): void {
    this.faqService
      .fetchFaq('Transport')
      .subscribe(
        (faqTransportItemList) =>
          (this.faqTransportItemList = faqTransportItemList)
      );
  }

  getFaqHousing(): void {
    this.faqService
      .fetchFaq('Housing')
      .subscribe(
        (faqHousingItemList) => (this.faqHousingItemList = faqHousingItemList)
      );
  }

  getFaqUniErasmus(): void {
    this.faqService
      .fetchFaq('Uni_Erasmus')
      .subscribe(
        (faqUniErasmusItemList) =>
          (this.faqUniErasmusItemList = faqUniErasmusItemList)
      );
  }

  getFaqCorona(): void {
    this.faqService
      .fetchFaq('Corona')
      .subscribe(
        (faqCoronaItemList) => (this.faqCoronaItemList = faqCoronaItemList)
      );
  }

  getFaqEsncard(): void {
    this.faqService
      .fetchFaq('ESNcard')
      .subscribe(
        (faqEsncardItemList) => (this.faqEsncardItemList = faqEsncardItemList)
      );
  }

  getFaqOther(): void {
    this.faqService.fetchFaq('Other').subscribe((faqOtherItemList) => {
      this.faqOtherItemList = faqOtherItemList;
      this.contentLoaded = Promise.resolve(true);
    });
  }
}
