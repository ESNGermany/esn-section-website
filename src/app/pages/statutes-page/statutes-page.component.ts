import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { StatutesService } from './statutes.service';
import { StatutesItem } from './statutes-item';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'esn-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class StatutesPageComponent implements OnInit {
  public statutes?: StatutesItem;
  private mainInfo?: MainItem;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe((mainInfo?: MainItem) => {
      this.mainInfo = mainInfo!;
    });
    if (this.mainInfo) {
      this.setTitle();
    }

    this.statutesService.getStatutes().subscribe((statutes?: StatutesItem) => {
      this.statutes = statutes!;
    });
  }

  private setTitle(): void {
    this.title.setTitle('Our Team | ' + this.mainInfo?.section_long_name);
  }
}
