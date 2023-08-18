import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { LoadJsService } from 'src/app/shared/load-js.service';

@Component({
  selector: 'esn-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss'],
  standalone: true,
})
export class PretixCalendarComponent implements AfterViewInit {
  @ViewChild('pretixCal') el?: ElementRef;
  public mainInfo?: MainItem;
  public pretix_link?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loadJsService: LoadJsService,
    private mainService: MainService,
  ) {
    this.mainService.getMainInformation().subscribe({
      next: (main?: MainItem) => {
        this.pretix_link = main?.pretix_link;
        this.loadJsService.loadJsFile('https://pretix.eu/widget/v1.en.js');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
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
