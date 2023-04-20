import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import {
  IImprintEsnGerItem,
  ImprintEsnGerService,
} from './imprint-esnger.service';

import { IImprintItem, ImprintService } from './imprint.service';
import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class ImprintPageComponent implements OnInit {
  mainInfo: IMainItem | undefined;

  imprintItemList$: Observable<IImprintItem> | undefined;
  imprintEsnGer$: Observable<IImprintEsnGerItem> | undefined;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private imprintEsnGerService: ImprintEsnGerService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    this.imprintItemList$ = this.imprintService.fetchImprint().pipe(
      shareReplay(1),
      map((res: any) => res.data[0])
    );

    this.imprintEsnGer$ = this.imprintEsnGerService.fetchEsnGerImprint().pipe(
      shareReplay(1),
      map((res: any) => res.data[0])
    );

    const title = 'Imprint | ' + this.mainInfo!.section_long_name;
    this.title.setTitle(title);
  }
}
