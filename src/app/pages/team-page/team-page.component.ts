import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';

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
    | 'Events_page'
    | 'ESNcard_page';
  Order_on_page: number;
  Image: {
    id: string;
    alternativeText: string;
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
  public contentItemList: ContentItem[];

  constructor(private title: Title, private contentService: ContentService) {}

  ngOnInit() {
    this.title.setTitle('Our Team | Erasmus Student Network Freiburg');
    this.getContent();
  }

  getContent(): void {
    this.contentService
      .fetchPageContent('Team_page')
      .subscribe((contentItemList) => (this.contentItemList = contentItemList));
  }
}
