import { DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { StatutesService } from 'src/app/pages/statutes-page/statutes.service';
import { StatutesItem } from 'src/app/pages/statutes-page/statutes-item';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
})
export class FooterComponent implements OnInit {
  public mainInfo?: MainItem;
  public statutes?: StatutesItem;
  public statutesExist = false;
  public timestamp: string = environment.timeStamp;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mainService: MainService,
    private statutesService: StatutesService,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.statutesService.getStatutes().subscribe({
      next: (statutes?: StatutesItem) => {
        this.statutes = statutes!;
        this.statutesExist = !!statutes;
      },
      error: (error) => {
        console.error(error);
      },
    });
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
