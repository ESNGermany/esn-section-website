import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  HostListener,
  OnInit,
  ElementRef,
  Inject,
} from '@angular/core';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { MainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  globals$: Observable<MainItem>;

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

  @Input() activeMenu: string;

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
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

  async getBgImage(): Promise<unknown> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    const imgUrl =
      environment.STRAPI_SECTION_URL_IMAGE + mainInfo?.headerImage.url;
    const color = mainInfo?.buttonColor;
    return {
      'background-image':
        'linear-gradient(69deg,rgba(46, 49, 146, 0.8) 19%,' +
        color +
        ' 80%), url("' +
        imgUrl +
        '")',
    };
  }

  async buttonColor(): Promise<unknown> {
    const globals = await firstValueFrom(this.globals$);
    switch (globals?.buttonColor) {
      case 'esnGreen':
        return { 'background-color': 'rgb(122, 193, 67)' };
      case 'esnPink':
        return { 'background-color': 'rgb(236, 0, 140)' };
      case 'esnOrange':
        return { 'background-color': 'rgb(244, 123, 32)' };
      case 'esnLightBlue':
        return { 'background-color': 'rgb(0, 174, 239)' };
      case 'esnDarkBlue':
        return { 'background-color': 'rgb(46, 49, 146)' };
      default:
        return { 'background-color': 'rgb(255, 255, 255, 1)' };
    }
  }
}
