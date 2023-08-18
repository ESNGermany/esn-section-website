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
import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
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
  public faqTransportItemList: IFaqItem[] | undefined;
  public faqHousingItemList: IFaqItem[] | undefined;
  public faqUniErasmusItemList: IFaqItem[] | undefined;
  public faqCoronaItemList: IFaqItem[] | undefined;
  public faqEsncardItemList: IFaqItem[] | undefined;
  public faqOtherItemList: IFaqItem[] | undefined;

  public readonly page: string = 'Incomings_page';
  private mainInfo: MainItem | undefined;

  constructor(
    private title: Title,
    private faqService: FaqService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.mainService
      .getMainInformation()
      .subscribe((mainInfo: MainItem | undefined) => {
        this.mainInfo = mainInfo!;
      });

    if (this.mainInfo) {
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
    );
    this.faqHousingItemList = await firstValueFrom(
      this.faqService.fetchFaq('Housing'),
    );
    this.faqUniErasmusItemList = await firstValueFrom(
      this.faqService.fetchFaq('Uni_Erasmus'),
    );
    this.faqCoronaItemList = await firstValueFrom(
      this.faqService.fetchFaq('Corona'),
    );
    this.faqEsncardItemList = await firstValueFrom(
      this.faqService.fetchFaq('ESNcard'),
    );
    this.faqOtherItemList = await firstValueFrom(
      this.faqService.fetchFaq('Other'),
    );

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

  private setTitle(): void {
    this.title.setTitle('For Incomings | ' + this.mainInfo?.section_long_name);
  }
}
