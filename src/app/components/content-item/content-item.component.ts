import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { IContentItem, ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
})
export class ContentItemComponent implements OnInit {
  @Input() page!: string;

  contentInfo$: Observable<IContentItem[]> | undefined;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;

  constructor(
    private contentService: ContentService,
    @Inject(DOCUMENT) private document: Document
  ) {
    window.addEventListener('scroll', (event) => {
      const box0 = this.document.querySelector('.box0');
      if (box0 != null) {
        if (window.pageYOffset < box0!.clientHeight) {
          box0!.classList.add('fade-in-element');
        } else {
          box0!.classList.remove('fade-in-element');
        }
      }
    });
    window.addEventListener('scroll', (event) => {
      const box1 = this.document.querySelector('.box1');
      if (box1 != null) {
        if (window.pageYOffset < box1!.clientHeight) {
          box1!.classList.add('fade-in-element');
        } else {
          box1!.classList.remove('fade-in-element');
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.setContentInfo();
  }

  private setContentInfo(): void {
    this.contentInfo$ = this.contentService.fetchPageContent(this.page).pipe(
      shareReplay(1),
      map((res: any) => res.data)
    );
  }
}
