import {
  AfterViewInit,
  OnInit,
  Inject,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
})
export class PretixCalendarComponent implements OnInit, AfterViewInit {
  public globals$: Observable<MainItem>;
  private pretixLink?: string;

  @ViewChild('pretixCal') el: ElementRef | undefined;

  constructor(
    private mainService: MainService,
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

  async ngOnInit() {
    this.loadJsFile('https://pretix.eu/widget/v1.en.js');
    this.loadCssFile('https://pretix.eu/demo/democon/widget/v1.css');
  }

  async ngAfterViewInit() {
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

  private loadJsFile(url: string): void {
    let node = this.document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
