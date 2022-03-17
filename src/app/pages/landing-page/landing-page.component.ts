import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentItem, ContentService } from 'src/app/services/content.service';
import { MainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  images!: GalleryItem[];
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  showThumb: boolean = true;

  contentInfo$: Observable<ContentItem[]> | undefined;
  globals$: Observable<MainItem> | undefined;
  isBrowser: boolean;

  page: string = 'Landing_page';

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setGalleryThumb();
  }

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
    this.contentInfo$ = this.contentService
      .fetchPageContent(this.page)
      .pipe(shareReplay(1));
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Home | ' + mainInfo?.sectionLongName);

    this.setGalleryThumb();

    this.images = [];
    if (mainInfo?.imageGridFrontPage) {
      for (let img of mainInfo.imageGridFrontPage) {
        this.images.unshift(
          new ImageItem({
            src: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.medium.url}`,
            thumb: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.thumbnail.url}`,
          })
        );
      }
    }
  }

  setGalleryThumb(): void {
    if (this.isBrowser) {
      if (window.innerWidth < 1000) {
        this.showThumb = false;
      }
    }
  }

  comic(): void {
    const navigation = this.document.getElementById('navinav');
    const title = this.document.getElementById('titeli');
    if (navigation?.getAttribute('style') == 'font-family: "Comic Sans"') {
      navigation.setAttribute('style', 'font-family: "Oswald"');
      title?.setAttribute('style', 'font-family: "Oswald"');
    } else {
      navigation?.setAttribute('style', 'font-family: "Comic Sans"');
      title?.setAttribute('style', 'font-family: "Comic Sans"');
    }
  }
}
