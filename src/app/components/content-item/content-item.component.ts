import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { ContentService } from 'src/app/services/content.service';
import { ContentItem } from 'src/app/services/content-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MarkdownModule],
})
export class ContentItemComponent implements OnInit {
  @Input() page!: string;
  public contentInfo?: ContentItem[];
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentService: ContentService,
  ) {
    window.addEventListener('scroll', () => {
      const box0 = this.document.querySelector('.box0');
      if (box0 != null) {
        if (window.scrollY < box0!.clientHeight) {
          box0!.classList.add('fade-in-element');
        } else {
          box0!.classList.remove('fade-in-element');
        }
      }
    });
    window.addEventListener('scroll', () => {
      const box1 = this.document.querySelector('.box1');
      if (box1 != null) {
        if (window.scrollY < box1!.clientHeight) {
          box1!.classList.add('fade-in-element');
        } else {
          box1!.classList.remove('fade-in-element');
        }
      }
    });
  }

  ngOnInit(): void {
    this.contentService.getContent(this.page).subscribe({
      next: (contentInfo?: ContentItem[]) => {
        this.contentInfo = contentInfo!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
