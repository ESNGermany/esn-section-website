import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  contentInfo$: Observable<ContentItem[]>;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.contentInfo$ = this.contentService
      .fetchPageContent('Team_page')
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Our Team | ' + mainInfo?.sectionLongName);
  }
}
