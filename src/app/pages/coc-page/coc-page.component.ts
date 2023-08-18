import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';

import { CocService } from './coc.service';
import { CocItem } from './coc-item';

@Component({
  selector: 'esn-coc-page',
  templateUrl: './coc-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [NgIf, MarkdownModule],
})
export class CocPageComponent implements OnInit {
  public cocItem?: CocItem;
  private mainInfo?: MainItem;

  constructor(
    private cocService: CocService,
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

    this.cocService.getCoc().subscribe({
      next: (cocItem?: CocItem) => {
        this.cocItem = cocItem!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setTitle(): void {
    this.title.setTitle(
      'Code of Conduct | ' + this.mainInfo?.section_long_name,
    );
  }
}
