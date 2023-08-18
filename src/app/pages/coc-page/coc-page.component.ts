import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CocService } from './coc.service';
import { CocItem } from './coc-item';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

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
    private title: Title,
    private cocService: CocService,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe((mainInfo?: MainItem) => {
      this.mainInfo = mainInfo!;
    });
    if (this.mainInfo) {
      this.setTitle();
    }

    this.cocService.getCoc().subscribe((cocItem?: CocItem) => {
      this.cocItem = cocItem!;
    });
  }

  private setTitle(): void {
    this.title.setTitle(
      'Code of Conduct | ' + this.mainInfo?.section_long_name,
    );
  }
}
