import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { MainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  images: GalleryItem[];
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  contentInfo$: Observable<ContentItem[]>;
  globals$: Observable<MainItem>;

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    this.contentInfo$ = this.contentService
      .fetchPageContent('Landing_page')
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Home | ' + mainInfo?.sectionLongName);

    this.images = [];
    for (let img of mainInfo?.imageGridFrontPage) {
      this.images.unshift(
        new ImageItem({
          src: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.medium.url}`,
          thumb: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.thumbnail.url}`,
        })
      );
    }
  }

  comic(): void {
    const navinav = this.document.getElementById('navinav');
    const titeli = this.document.getElementById('titeli');
    if (navinav.getAttribute('style') == 'font-family: "Comic Sans"') {
      navinav.setAttribute('style', 'font-family: "Oswald"');
      titeli.setAttribute('style', 'font-family: "Oswald"');
    } else {
      navinav.setAttribute('style', 'font-family: "Comic Sans"');
      titeli.setAttribute('style', 'font-family: "Comic Sans"');
    }
  }
}
