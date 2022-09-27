import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { ICocItem, CocService } from 'src/app/services/coc.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-coc-page',
  templateUrl: './coc-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class CocPageComponent implements OnInit {
  cocItem$: Observable<ICocItem> | undefined;

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
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const title = 'Code of Conduct | ' + mainInfo?.sectionLongName;
    this.title.setTitle(title);
  }
}
