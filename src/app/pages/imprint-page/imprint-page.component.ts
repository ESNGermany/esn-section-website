import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';

import { ImprintService } from './imprint.service';
import { ImprintItem } from './imprint-item';
import { ImprintESNGermanyService } from './imprint-esn-germany.service';
import { ImprintESNGermanyItem } from './imprint-esn-germany-item';

@Component({
  selector: 'esn-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class ImprintPageComponent implements OnInit {
  public imprintSection?: ImprintItem;
  public imprintESNGermany?: ImprintESNGermanyItem;
  private mainInfo?: MainItem;

  constructor(
    private imprintESNGermanyService: ImprintESNGermanyService,
    private imprintService: ImprintService,
    private mainService: MainService,
    private title: Title,
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

    if (this.mainInfo) {
      this.setTitle();
    }

    this.imprintService.getImprint().subscribe({
      next: (imprintSection?: ImprintItem) => {
        this.imprintSection = imprintSection;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.imprintESNGermanyService.getImprint().subscribe({
      next: (imprintESNGermany?: ImprintESNGermanyItem) => {
        this.imprintESNGermany = imprintESNGermany;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setTitle(): void {
    this.title.setTitle('Legal Notice | ' + this.mainInfo?.section_long_name);
  }
}
