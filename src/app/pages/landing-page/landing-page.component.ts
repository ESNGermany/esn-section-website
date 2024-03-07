import { DOCUMENT, NgIf, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { GalleryComponent, GalleryItem, ImageItem } from 'ng-gallery';

import { ContentItemComponent } from 'src/app/components/content-item/content-item.component';
import { MainItem } from 'src/app/services/main-item';
import { MainService } from 'src/app/services/main.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'esn-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [NgIf, GalleryComponent, ContentItemComponent],
})
export class LandingPageComponent implements OnInit {
  public directusImageLink: string = env.DIRECTUS_URL_IMAGE;
  public images!: GalleryItem[];
  public isBrowser: boolean;
  public mainInfo?: MainItem;
  public readonly page: string = 'Landing_page';
  public strapiLink: string = env.STRAPI_SECTION_URL_IMAGE;
  public showThumb = true;

  constructor(
    private mainService: MainService,
    private title: Title,
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
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
        this.setImages();
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
      this.setImages();
    }
  }

  private setImages(): void {
    this.images = [];
    if (this.mainInfo?.use_image_slideshow) {
      this.mainInfo.imagegrid_frontpage.forEach((img: any) => {
        this.images.unshift(
          new ImageItem({
            src: `${env.DIRECTUS_URL_IMAGE}${img.directus_files_id}&format=auto`,
            thumb: `${env.DIRECTUS_URL_IMAGE}${img.directus_files_id}?width=200&format=auto`,
          }),
        );
      });
    }
  }

  private setTitle(): void {
    this.title.setTitle('Home | ' + this.mainInfo?.section_long_name);
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
