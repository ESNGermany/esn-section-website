import {
  AfterViewInit,
  OnInit,
  Inject,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { LoadJsService } from 'src/app/shared/load-js.service';

@Component({
  selector: 'esn-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss'],
})
export class PretixCalendarComponent implements OnInit, AfterViewInit {
  public pretix_link?: string;
  mainInfo: IMainItem | undefined;

  @ViewChild('pretixCal') el: ElementRef | undefined;

  constructor(
    private mainService: MainService,
    private loadJsService: LoadJsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.mainService
      .fetchMain()
      .subscribe((res: any) => (this.pretix_link = res.data[0].pretix_link));
  }

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    this.pretix_link = this.mainInfo!.pretix_link;

    this.loadJsService.loadJsFile('https://pretix.eu/widget/v1.en.js');
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
  }

  async ngAfterViewInit(): Promise<void> {
    this.insertPretixLink();
  }

  private insertPretixLink(): void {
    this.el!.nativeElement.innerHTML = `<div
        class="pretix-widget-compat"
        event="${this.pretix_link}"
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
