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

import { IFaqItem, FaqService } from './faq.service';
import { IMainItem, MainService } from 'src/app/services/main.service';
import { isPlatformServer, NgIf, NgFor } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ExpandableComponent } from '../../components/expandable/expandable.component';
import { ContentItemComponent } from '../../components/content-item/content-item.component';

@Component({
  selector: 'esn-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [
    ContentItemComponent,
    NgIf,
    NgFor,
    ExpandableComponent,
    MarkdownModule,
  ],
})
export class IncomingsPageComponent implements OnInit {
  public faqTransportItemList: any;
  public faqHousingItemList: any;
  public faqUniErasmusItemList: any;
  public faqCoronaItemList: any;
  public faqEsncardItemList: any;
  public faqOtherItemList: any;

  public readonly page: string = 'Incomings_page';
  private mainInfo: any;

  constructor(
    private title: Title,
    private faqService: FaqService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
    }

    if (
      !this.faqTransportItemList ||
      !this.faqHousingItemList ||
      !this.faqUniErasmusItemList ||
      !this.faqCoronaItemList ||
      !this.faqEsncardItemList ||
      !this.faqOtherItemList
    ) {
      this.fetchFaq();
    }
  }

  async fetchFaq(): Promise<void> {
    this.faqTransportItemList = await firstValueFrom(
      this.faqService.fetchFaq('Transport'),
    ).then((res: any) => res.data);
    this.faqHousingItemList = await firstValueFrom(
      this.faqService.fetchFaq('Housing'),
    ).then((res: any) => res.data);
    this.faqUniErasmusItemList = await firstValueFrom(
      this.faqService.fetchFaq('Uni_Erasmus'),
    ).then((res: any) => res.data);
    this.faqCoronaItemList = await firstValueFrom(
      this.faqService.fetchFaq('Corona'),
    ).then((res: any) => res.data);
    this.faqEsncardItemList = await firstValueFrom(
      this.faqService.fetchFaq('ESNcard'),
    ).then((res: any) => res.data);
    this.faqOtherItemList = await firstValueFrom(
      this.faqService.fetchFaq('Other'),
    ).then((res: any) => res.data);

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqTransportItemList'),
        this.faqTransportItemList,
      );
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqHousingItemList'),
        this.faqHousingItemList,
      );
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqUniErasmusItemList'),
        this.faqUniErasmusItemList,
      );
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqCoronaItemList'),
        this.faqCoronaItemList,
      );
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqEsncardItemList'),
        this.faqEsncardItemList,
      );
      this.transferState.set<IFaqItem[]>(
        makeStateKey('faqOtherItemList'),
        this.faqOtherItemList,
      );
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
  }

  private setTitle(): void {
    this.title.setTitle('For Incomings | ' + this.mainInfo!.section_long_name);
  }
}
