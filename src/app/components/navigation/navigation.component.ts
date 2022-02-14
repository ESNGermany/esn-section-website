import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  globals$: Observable<MainItem>;
  @Input() activeMenu: string;
  public bgImage$: Observable<unknown>;
  public buttonColor$: Observable<unknown>;

  constructor(
    private el: ElementRef,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.hideMenu();
    }
  }

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    this.bgImage$ = this.globals$.pipe(
      map((res) => ({
        'background-image': `linear-gradient(69deg,rgba(46, 49, 146, 0.8) 19%, ${this.getButtonColor(
          res?.buttonColor
        )}, 0.8) 80%), url("${environment.STRAPI_SECTION_URL_IMAGE}${
          res?.headerImage.url
        }")`,
      }))
    );
    this.buttonColor$ = this.globals$.pipe(
      map((res) => ({
        'background-color': `${this.getButtonColor(res?.buttonColor)})`,
      }))
    );
  }

  showMenu(): void {
    const burger = this.document.getElementById('burger') as HTMLUListElement;
    const menu = this.document.getElementById('menu') as HTMLUListElement;
    burger.classList.add('hidden');
    menu.classList.remove('hidden');
    menu.classList.add('vis');
  }

  hideMenu(): void {
    const burger = this.document.getElementById('burger') as HTMLUListElement;
    const menu = this.document.getElementById('menu') as HTMLUListElement;
    burger.classList.remove('hidden');
    burger.classList.add('vis');
    menu.classList.remove('vis');
    menu.classList.add('hidden');
  }

  showBubble(bubble: 1 | 2): void {
    const b1 = this.document.getElementById('bubble1') as HTMLDivElement;
    const b2 = this.document.getElementById('bubble2') as HTMLDivElement;
    if (bubble === 1) {
      b1.classList.remove('invisible');
      b1.classList.add('visible');
    }
    if (bubble === 2) {
      b2.classList.remove('invisible');
      b2.classList.add('visible');
    }
  }

  hideBubble(bubble: 1 | 2): void {
    const b1 = this.document.getElementById('bubble1') as HTMLDivElement;
    const b2 = this.document.getElementById('bubble2') as HTMLDivElement;
    if (bubble === 1) {
      b1.classList.remove('visible');
      b1.classList.add('invisible');
    }
    if (bubble === 2) {
      b2.classList.remove('visible');
      b2.classList.add('invisible');
    }
  }

  getButtonColor(colorString: string): string {
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
