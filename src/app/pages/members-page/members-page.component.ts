import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
})
export class MembersPageComponent implements OnInit {
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  contentInfo$: Observable<ContentItem[]>;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent('Members_page')
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('For Members | ' + mainInfo?.sectionLongName);
  }
}
