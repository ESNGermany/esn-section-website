import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { ICocItem, CocService } from './coc.service';
import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-coc-page',
  templateUrl: './coc-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class CocPageComponent implements OnInit {
  cocItem$: Observable<ICocItem> | undefined;
  mainInfo: IMainItem | undefined;

  constructor(
    private title: Title,
    private cocService: CocService,
    private mainService: MainService
  ) {}

  async ngOnInit(): Promise<void> {
    this.cocItem$ = this.cocService.fetchCoc().pipe(
      shareReplay(1),
      map((res) => res)
    );
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    const title = 'Code of Conduct | ' + this.mainInfo!.section_long_name;
    this.title.setTitle(title);
  }
}
