import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  globals$: Observable<IMainItem> | undefined;
  public timestamp: string = environment.timeStamp;

  constructor(
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit(): Promise<void> {
    this.setMainItem();
  }

  private setMainItem(): void {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
  }

  public pink(): void {
    const footer = this.document.getElementById('foot');
    const footer2 = this.document.getElementById('foot2');
    const footer3 = this.document.getElementById('foot3');
    const strapiLink = this.document.getElementById('strapiLink');
    footer!.setAttribute('style', 'background-color: #ec008c');
    footer2!.setAttribute('style', 'fill: #ec008c');
    footer3!.setAttribute('style', 'fill: #ec008c');
    strapiLink!.setAttribute('style', 'color: #eaeaea !important');
  }
}
