import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { FaqItem, FaqService } from 'src/app/services/faq.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss'],
})
export class IncomingsPageComponent implements OnInit {
  faqTransportItemList$: Observable<FaqItem[]>;
  faqHousingItemList$: Observable<FaqItem[]>;
  faqUniErasmusItemList$: Observable<FaqItem[]>;
  faqCoronaItemList$: Observable<FaqItem[]>;
  faqEsncardItemList$: Observable<FaqItem[]>;
  faqOtherItemList$: Observable<FaqItem[]>;

  page: string = 'Incomings_page';

  constructor(
    private title: Title,
    private faqService: FaqService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
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
