import {
  AfterViewInit,
  OnInit,
  Inject,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { LoadJsService } from 'src/app/shared/load-js.service';

@Component({
  selector: 'esn-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss']
})
export class PretixCalendarComponent implements OnInit, AfterViewInit {
  public globals$: Observable<IMainItem>;
  private pretixLink?: string;

  @ViewChild('pretixCal') el: ElementRef | undefined;

  constructor(
    private mainService: MainService,
    private loadJsService: LoadJsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );

    this.mainService
      .fetchMain()
      .subscribe((value) => (this.pretixLink = value[0].pretixLink));
  }

  async ngOnInit(): Promise<void> {
    this.loadJsService.loadJsFile('https://pretix.eu/widget/v1.en.js');
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
  }

  async ngAfterViewInit(): Promise<void> {
    this.insertPretixLink();
  }

  private insertPretixLink(): void {
    this.el!.nativeElement.innerHTML = `<div
        class="pretix-widget-compat"
        event="${this.pretixLink}"
        style="calendar"
      ></div>`;
  }

  private loadCssFile(url: string): void {
    let node = this.document.createElement('link');
    node.rel = 'stylesheet';
    node.type = 'text/css';
    node.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
