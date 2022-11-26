import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private contentService: ContentService) {}

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
