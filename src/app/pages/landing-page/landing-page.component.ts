import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/app.component';

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
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public contentItemList: ContentItem[];
  public globals: MainItem;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.title.setTitle('Home | Erasmus Student Network Freiburg');
    this.getContent();
  }

  getContent(): void {
    this.contentService
      .fetchPageContent('Landing_page')
      .subscribe((contentItemList) => (this.contentItemList = contentItemList));

    this.mainService.fetchMain().subscribe((global) => (this.globals = global));
  }

  comic(): void {
    const navinav = document.getElementById('navinav');
    const titeli = document.getElementById('titeli');
    navinav.setAttribute('style', 'font-family: "Comic Sans"');
    titeli.setAttribute('style', 'font-family: "Comic Sans"');
  }
}
