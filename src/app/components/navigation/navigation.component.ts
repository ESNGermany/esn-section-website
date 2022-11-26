import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  windowScrolled: boolean = false;
  public bgImage$: Observable<object> | undefined;
  public buttonColor$: Observable<object> | undefined;

  mainInfo: IMainItem | undefined;

  constructor(
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (
      !this.document.getElementById('burger')?.contains(event.target as Node) &&
      !this.document.getElementById('menu')?.contains(event.target as Node)
    ) {
      const menu = this.document.getElementById('menu') as HTMLUListElement;
      if (!menu.classList.contains('hidden')) {
        this.toggleMenu();
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );

    this.setNavBgImage();
    this.setSocialMediaButtonColor();
  }

  private setNavBgImage(): void {
    this.bgImage$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => ({
        'background-image': `linear-gradient(69deg,rgba(46, 49, 146, 0.8) 19%, ${this.getButtonColor(
          res.data[0].button_color
        )}, 0.8) 80%), url("${environment.DIRECTUS_URL_IMAGE}${
          res.data[0].header_image.filename_disk
        }")`,
      }))
    );
  }

  private setSocialMediaButtonColor(): void {
    this.buttonColor$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => ({
        'background-color': `${this.getButtonColor(res.data[0].button_color)})`,
      }))
    );
  }

  public toggleMenu(): void {
    const burger = this.document.getElementById('burger') as HTMLUListElement;
    const menu = this.document.getElementById('menu') as HTMLUListElement;
    burger.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  }

  public toggleBubble(bubble: 1 | 2): void {
    const b1 = this.document.getElementById('bubble1') as HTMLDivElement;
    const b2 = this.document.getElementById('bubble2') as HTMLDivElement;
    if (bubble === 1) {
      b1.classList.toggle('visible');
      b1.classList.toggle('invisible');
    } else if (bubble === 2) {
      b2.classList.toggle('visible');
      b2.classList.toggle('invisible');
    }
  }

  private getButtonColor(colorString: string): string {
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
