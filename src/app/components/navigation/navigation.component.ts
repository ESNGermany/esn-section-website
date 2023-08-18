import { AsyncPipe, DOCUMENT, NgClass, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Observable, map, shareReplay } from 'rxjs';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgStyle, NgIf, NgClass, AsyncPipe],
})
export class NavigationComponent implements OnInit {
  @ViewChild('menu') menuElement!: ElementRef<HTMLUListElement>;
  @ViewChild('burger') burgerElement!: ElementRef<HTMLDivElement>;
  @ViewChild('bubble1') bubble1Element!: ElementRef<HTMLDivElement>;
  @ViewChild('bubble2') bubble2Element!: ElementRef<HTMLDivElement>;

  public bgImage$?: Observable<any>;
  public buttonColor$?: Observable<any>;
  public mainInfo?: MainItem;
  public windowScrolled = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mainService: MainService,
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const burger = this.burgerElement.nativeElement;
    const menu = this.menuElement.nativeElement;
    if (
      !burger.contains(event.target as Node) &&
      !menu.contains(event.target as Node)
    ) {
      if (!menu.classList.contains('hidden')) {
        this.toggleMenu();
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 100;
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
        this.setNavBgImage();
        this.setSocialMediaButtonColor();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setNavBgImage(): void {
    this.bgImage$ = this.mainService.getMainInformation().pipe(
      shareReplay(1),
      map((res: any) => {
        if (res?.header_image.id) {
          return {
            'background-image': `linear-gradient(69deg,rgba(46, 49, 146, 0.8) 19%, ${this.getButtonColor(
              res?.button_color,
            )}, 0.8) 80%), url("${environment.DIRECTUS_URL_IMAGE}${res
              ?.header_image?.id}/background_img?format=auto&width=${
              window.innerWidth
            }")`,
          };
        }
      }),
    );
  }

  private setSocialMediaButtonColor(): void {
    this.buttonColor$ = this.mainService.getMainInformation().pipe(
      shareReplay(1),
      map((res: any) => ({
        'background-color': `${this.getButtonColor(res?.button_color)})`,
      })),
    );
  }

  public toggleMenu(): void {
    const menu = this.menuElement.nativeElement;
    const burger = this.burgerElement.nativeElement;
    burger.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  }

  public toggleBubble(bubble: 1 | 2): void {
    const bubble1 = this.bubble1Element.nativeElement;
    const bubble2 = this.bubble2Element.nativeElement;

    if (bubble === 1) {
      bubble1.classList.toggle('visible');
      bubble1.classList.toggle('invisible');
    } else if (bubble === 2) {
      bubble2.classList.toggle('visible');
      bubble2.classList.toggle('invisible');
    }
  }

  private getButtonColor(colorString: string | undefined): string {
    switch (colorString) {
      case 'esnGreen':
        return 'rgb(122, 193, 67';
      case 'esnPink':
        return 'rgb(236, 0, 140';
      case 'esnOrange':
        return 'rgb(244, 123, 32';
      case 'esnLightBlue':
        return 'rgb(0, 174, 239';
      case 'esnDarkBlue':
        return 'rgb(46, 49, 146';
      default:
        return 'rgb(255, 255, 255';
    }
  }
}
