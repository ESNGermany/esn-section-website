import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FaqService } from './faq.service';
import { FaqItem } from './faq-item';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { NgIf, NgFor } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ExpandableComponent } from 'src/app/components/expandable/expandable.component';
import { ContentItemComponent } from 'src/app/components/content-item/content-item.component';

@Component({
  selector: 'esn-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [
    ContentItemComponent,
    NgIf,
    NgFor,
    ExpandableComponent,
    MarkdownModule,
  ],
})
export class IncomingsPageComponent implements OnInit {
  public readonly page: string = 'Incomings_page';
  public faqsTransport?: FaqItem[];
  public faqsHousing?: FaqItem[];
  public faqsUniErasmus?: FaqItem[];
  public faqsCorona?: FaqItem[];
  public faqsESNcard?: FaqItem[];
  public faqsOther?: FaqItem[];

  private mainInfo?: MainItem;

  constructor(
    private title: Title,
    private faqService: FaqService,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo!;
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
    }

    this.faqService.getFaqTransport().subscribe({
      next: (faqsTransport?: FaqItem[]) => {
        this.faqsTransport = faqsTransport!;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.faqService.getFaqHousing().subscribe({
      next: (faqsHousing?: FaqItem[]) => {
        this.faqsHousing = faqsHousing!;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.faqService.getFaqCorona().subscribe({
      next: (faqsCorona?: FaqItem[]) => {
        this.faqsCorona = faqsCorona!;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.faqService.getFaqErasmus().subscribe({
      next: (faqsUniErasmus?: FaqItem[]) => {
        this.faqsUniErasmus = faqsUniErasmus!;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.faqService.getFaqESNcard().subscribe({
      next: (faqsESNcard?: FaqItem[]) => {
        this.faqsESNcard = faqsESNcard!;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.faqService.getFaqOther().subscribe({
      next: (faqsOther?: FaqItem[]) => {
        this.faqsOther = faqsOther!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setTitle(): void {
    this.title.setTitle('For Incomings | ' + this.mainInfo?.section_long_name);
  }
}
