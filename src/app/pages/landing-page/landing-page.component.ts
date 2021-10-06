import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

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
  contentItemList: ContentItem[] = [];
  globals: MainItem;
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
      .fetchPageContent('Landing_page')
      .subscribe((contentItemList) => (this.contentItemList = contentItemList));

    this.mainService.fetchMain().subscribe((global) => {
      this.globals = global;
      this.contentLoaded = Promise.resolve(true);
      this.siteTitle = global.sectionLongName;
      const title = 'Home | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }

  comic(): void {
    const navinav = document.getElementById('navinav');
    const titeli = document.getElementById('titeli');
    if (navinav.getAttribute('style') == 'font-family: "Comic Sans"') {
      navinav.setAttribute('style', 'font-family: "Oswald"');
      titeli.setAttribute('style', 'font-family: "Oswald"');
    } else {
      navinav.setAttribute('style', 'font-family: "Comic Sans"');
      titeli.setAttribute('style', 'font-family: "Comic Sans"');
    }
  }
}
