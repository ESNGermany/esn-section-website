import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';

interface ContentItem {
  id: string;
  Title: string;
  Text: string;
  Layout:
    | 'Text_above_img_below'
    | 'Text_below_img_above'
    | 'Text_left_img_right'
    | 'Text_right_img_left';
  Wrap_in_shadow_box: boolean;
  Page_for_display:
    | 'Landing_page'
    | 'Members_page'
    | 'Team_page'
    | 'ESNcard_page'
    | 'Incomings_page';
  Order_on_page: number;
  Image: {
    id: string;
    alternativeText: string;
    url: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  contentItemList: ContentItem[] = [];
  contentLoaded: Promise<boolean>;
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  siteTitle: string;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.getContent();
  }

  getContent(): void {
    this.contentService
      .fetchPageContent('Team_page')
      .subscribe((contentItemList) => {
        this.contentItemList = contentItemList;
        this.contentLoaded = Promise.resolve(true);
      });
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      const title = 'Our Team | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }
}
