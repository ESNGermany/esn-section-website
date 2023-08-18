import {
  AfterViewInit,
  Inject,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { LoadJsService } from 'src/app/shared/load-js.service';

@Component({
  selector: 'esn-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss'],
  standalone: true,
})
export class PretixCalendarComponent implements AfterViewInit {
  public pretix_link?: string;
  public mainInfo?: MainItem;

  @ViewChild('pretixCal') el?: ElementRef;

  constructor(
    private mainService: MainService,
    private loadJsService: LoadJsService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.mainService.getMainInformation().subscribe((res: any) => {
      this.pretix_link = res.pretix_link;
      this.loadJsService.loadJsFile('https://pretix.eu/widget/v1.en.js');
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
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
    const node = this.document.createElement('link');
    node.rel = 'stylesheet';
    node.type = 'text/css';
    node.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
