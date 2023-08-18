import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainItem } from './services/main-item';
import { MainService } from './services/main.service';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgClass, NavigationComponent, RouterOutlet, FooterComponent],
})
export class AppComponent implements OnInit {
  public mainInfo?: MainItem;

  constructor(
    private mainService: MainService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
    }
  }

  private setTitle(): void {
    this.title.setTitle('Home | ' + this.mainInfo?.section_long_name);
  }
}
