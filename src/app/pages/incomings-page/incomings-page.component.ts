import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content.service';
import { FaqService } from 'src/app/services/faq.service';

interface FaqItem {
  id: string;
  Question: string;
  Answer: string;
  Category: string;
  Order_within_category: number;
}

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
  Youtube_video_embed_link: string;
}

@Component({
  selector: 'app-incomings-page',
  templateUrl: './incomings-page.component.html',
  styleUrls: ['./incomings-page.component.scss'],
})
export class IncomingsPageComponent implements OnInit {
  public contentItemList: ContentItem[];
  public faqItemList: FaqItem[];

  constructor(
    private title: Title,
    private contentService: ContentService,
    private faqService: FaqService
  ) {}

  ngOnInit() {
    this.title.setTitle('For Incomings | Erasmus Student Network Freiburg');
    this.getContent();
    this.getFaq();
  }

  getContent(): void {
    this.contentService
      .fetchPageContent('Incomings_page')
      .subscribe((contentItemList) => (this.contentItemList = contentItemList));
  }

  getFaq(): void {
    this.faqService
      .fetchFaq()
      .subscribe((faqItemList) => (this.faqItemList = faqItemList));
  }
}
