import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { IStatutesItem, StatutesService } from './statutes.service';
import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class StatutesPageComponent implements OnInit {
  statutesItemList$: Observable<IStatutesItem> | undefined;
  mainInfo: IMainItem | undefined;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.statutesItemList$ = this.statutesService.fetchStatutes().pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res?.data[0]
    );
    const title = 'Statutes | ' + this.mainInfo!.section_long_name;
    this.title.setTitle(title);
  }
}
