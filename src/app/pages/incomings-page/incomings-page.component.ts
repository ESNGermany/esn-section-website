import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { IFaqItem, FaqService } from './faq.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss', './../base.scss'],
})
export class IncomingsPageComponent implements OnInit {
  faqTransportItemList$: Observable<IFaqItem[]> | undefined;
  faqHousingItemList$: Observable<IFaqItem[]> | undefined;
  faqUniErasmusItemList$: Observable<IFaqItem[]> | undefined;
  faqCoronaItemList$: Observable<IFaqItem[]> | undefined;
  faqEsncardItemList$: Observable<IFaqItem[]> | undefined;
  faqOtherItemList$: Observable<IFaqItem[]> | undefined;

  public readonly page: string = 'Incomings_page';

  constructor(
    private title: Title,
    private faqService: FaqService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('For Incomings | ' + mainInfo?.sectionLongName);

    this.faqTransportItemList$ = this.faqService.fetchFaq('Transport').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.faqHousingItemList$ = this.faqService.fetchFaq('Housing').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.faqUniErasmusItemList$ = this.faqService.fetchFaq('Uni_Erasmus').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.faqCoronaItemList$ = this.faqService.fetchFaq('Corona').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.faqEsncardItemList$ = this.faqService.fetchFaq('ESNcard').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );

    this.faqOtherItemList$ = this.faqService.fetchFaq('Other').pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );
  }
}
