import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './../base.scss'],
})
export class LandingPageComponent implements OnInit {
  public gridImageSize: string[] = ['small', 'small', 'small', 'small'];
  public mainInfo: any;

  public images!: GalleryItem[];
  public strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public showThumb = true;
  public isBrowser: boolean;
  public readonly page: string = 'Landing_page';

  constructor(
    private title: Title,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setGalleryThumb();
  }

  ngOnInit(): void {
    this.mainInfo = this.transferState.get(makeStateKey('mainInfo'), undefined);

    if (!this.mainInfo) {
      this.fetchMainInfo();
    } else {
      this.setTitle();
      this.setImages();
    }
    this.setGalleryThumb();
  }

  async fetchMainInfo(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0],
    );

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IMainItem>(
        makeStateKey('mainInfo'),
        this.mainInfo,
      );
    }
    this.setTitle();
  }

  private setImages(): void {
    this.images = [];
    if (this.mainInfo!.use_image_slideshow) {
      this.mainInfo.imagegrid_frontpage.forEach((img: any) => {
        if (img.directus_files_id.width > 750) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}`,
              thumb: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}?width=200`,
            }),
          );
        } else if (img.directus_files_id.id.width <= 750) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}`,
              thumb: `${environment.DIRECTUS_URL_IMAGE}${img.directus_files_id.id}?width=200`,
            }),
          );
        }
      });
    } else {
      this.setGridImageSize();
    }
  }

  private setTitle(): void {
    this.title.setTitle('Home | ' + this.mainInfo.section_long_name);
  }

  private setGridImageSize(): void {
    for (const img in [0, 1, 2, 3]) {
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
