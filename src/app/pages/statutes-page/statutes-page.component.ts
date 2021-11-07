import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  StatutesItem,
  StatutesService,
} from 'src/app/services/statutes.service';
import { MainService } from 'src/app/services/main.service';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./statutes-page.component.scss'],
})
export class StatutesPageComponent implements OnInit {
  statutesItemList$: Observable<StatutesItem>;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.statutesItemList$ = this.statutesService.fetchStatutes().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const title = 'Statutes | ' + mainInfo?.sectionLongName;
    this.title.setTitle(title);
  }
}
