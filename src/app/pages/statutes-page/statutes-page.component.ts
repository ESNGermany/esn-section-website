import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import {
  IStatutesItem,
  StatutesService,
} from 'src/app/services/statutes.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class StatutesPageComponent implements OnInit {
  statutesItemList$: Observable<IStatutesItem> | undefined;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.statutesItemList$ = this.statutesService.fetchStatutes().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const title = 'Statutes | ' + mainInfo?.sectionLongName;
    this.title.setTitle(title);
  }
}
