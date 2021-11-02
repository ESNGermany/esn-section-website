import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  globals$: Observable<MainItem>;

  constructor(
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
  }

  pink(): void {
    const footer = this.document.getElementById('foot');
    const footer2 = this.document.getElementById('foot2');
    const footer3 = this.document.getElementById('foot3');
    footer.setAttribute('style', 'background-color: #ec008c');
    footer2.setAttribute('style', 'fill: #ec008c');
    footer3.setAttribute('style', 'fill: #ec008c');
  }
}
