import { Component, Input, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ContentItem, ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
})
export class ContentItemComponent implements OnInit {
  @Input() page: string;

  contentInfo$: Observable<ContentItem[]>;

  constructor(private contentService: ContentService) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent(this.page)
      .pipe(shareReplay(1));
  }
}
