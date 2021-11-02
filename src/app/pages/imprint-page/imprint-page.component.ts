import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { ImprintItem, ImprintService } from 'src/app/services/imprint.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  imprintItemList$: Observable<ImprintItem>;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.imprintItemList$ = this.imprintService.fetchImprint().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const title = 'Imprint | ' + mainInfo?.sectionLongName;
    this.title.setTitle(title);
  }
}
