import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IContentItem, ContentService } from 'src/app/services/content.service';
import { MainService } from 'src/app/services/main.service';
import { LoadJsService } from 'src/app/shared/load-js.service';

@Component({
  selector: 'esn-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './../base.scss'],
})
export class LandingPageComponent implements OnInit {
  contentInfo$: Observable<IContentItem[]> | undefined;
  public gridImageSize: string[] = ['small', 'small', 'small', 'small'];

  mainInfo: any | undefined;

  public images!: GalleryItem[];
  public strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public showThumb: boolean = true;
  public isBrowser: boolean;
  public readonly page: string = 'Landing_page';

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService,
    private loadJsService: LoadJsService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setGalleryThumb();
  }

  async ngOnInit(): Promise<void> {
    this.contentInfo$ = this.contentService
      .fetchPageContent(this.page)
      .pipe(shareReplay(1));

    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );

    this.title.setTitle('Home | ' + this.mainInfo!.section_long_name);

    this.setGalleryThumb();
    this.setGridImageSize();

    this.images = [];
    if (this.mainInfo!.imagegrid_frontpage) {
      this.mainInfo.imagegrid_frontpage.forEach((img: any) => {
        if (img.directus_files_id.width > 750) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}`,
              thumb: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}?width=200`,
            })
            );
          } else if (img.directus_files_id.id.width <= 750) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}`,
              thumb: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}?width=200`,
            })
          );
        }
      });
    }
  }

  private setGridImageSize(): void {
    for (let img in [0, 1, 2, 3]) {
      if (
        this.mainInfo?.imagegrid_frontpage[img].directus_files_id.width > 750
      ) {
        this.gridImageSize[img] = 'medium';
      } else if (
        this.mainInfo?.imagegrid_frontpage[img].directus_files_id.width > 1000
      ) {
        this.gridImageSize[img] = 'large';
      } else {
        this.gridImageSize[img] = 'small';
      }
    }
  }

  private setGalleryThumb(): void {
    if (this.isBrowser) {
      if (window.innerWidth < 1000) {
        this.showThumb = false;
      }
    }
  }

  public comic(): void {
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
