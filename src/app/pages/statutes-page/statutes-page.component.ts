import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';

import { StatutesService } from './statutes.service';
import { StatutesItem } from './statutes-item';

@Component({
  selector: 'esn-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class StatutesPageComponent implements OnInit {
  private mainInfo?: MainItem;
  public statutes?: StatutesItem;

  constructor(
    private mainService: MainService,
    private statutesService: StatutesService,
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

    this.statutesService.getStatutes().subscribe({
      next: (statutes?: StatutesItem) => {
        this.statutes = statutes!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setTitle(): void {
    this.title.setTitle('Our Team | ' + this.mainInfo?.section_long_name);
  }
}
