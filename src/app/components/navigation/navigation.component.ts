import {
  Component,
  Input,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.hideMenu();
    }
  }

  @Input() activeMenu: string;

  ngOnInit(): void {}

  showMenu(): void {
    const burger = document.getElementById('burger') as HTMLUListElement;
    const menu = document.getElementById('menu') as HTMLUListElement;
    burger.classList.add('hidden');
    menu.classList.remove('hidden');
    menu.classList.add('vis');
  }

  hideMenu(): void {
    const burger = document.getElementById('burger') as HTMLUListElement;
    const menu = document.getElementById('menu') as HTMLUListElement;
    burger.classList.remove('hidden');
    burger.classList.add('vis');
    menu.classList.remove('vis');
    menu.classList.add('hidden');
  }

  showBubble(bubble: 1 | 2): void {
    const b1 = document.getElementById('bubble1') as HTMLDivElement;
    const b2 = document.getElementById('bubble2') as HTMLDivElement;
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
    const b1 = document.getElementById('bubble1') as HTMLDivElement;
    const b2 = document.getElementById('bubble2') as HTMLDivElement;
    if (bubble === 1) {
      b1.classList.remove('visible');
      b1.classList.add('invisible');
    }
    if (bubble === 2) {
      b2.classList.remove('visible');
      b2.classList.add('invisible');
    }
  }
}
