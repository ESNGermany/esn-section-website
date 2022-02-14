import { Component, Input, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
})
export class ContentItemComponent implements OnInit {
  @Input() page: string;

  contentInfo$: Observable<ContentItem[]>;
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  constructor(private contentService: ContentService) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent(this.page)
      .pipe(shareReplay(1));
  }
}
