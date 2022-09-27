import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import {
  IImprintEsnGerItem,
  ImprintEsnGerService,
} from 'src/app/services/imprint-esnger.service';

import { IImprintItem, ImprintService } from 'src/app/services/imprint.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class ImprintPageComponent implements OnInit {
  imprintItemList$: Observable<IImprintItem> | undefined;
  imprintEsnGer$: Observable<IImprintEsnGerItem> | undefined;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private imprintEsnGerService: ImprintEsnGerService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.imprintItemList$ = this.imprintService.fetchImprint().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );

    this.imprintEsnGer$ = this.imprintEsnGerService.fetchEsnGerImprint().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );

    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const title = 'Imprint | ' + mainInfo?.sectionLongName;
    this.title.setTitle(title);
  }
}
