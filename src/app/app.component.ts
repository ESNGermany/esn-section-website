import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from './services/main.service';
import { MainItem } from './services/main-item';
import { NgClass } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgClass, NavigationComponent, RouterOutlet, FooterComponent],
})
export class AppComponent implements OnInit {
  public mainInfo: any;

  constructor(
    private mainService: MainService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.mainService
      .getMainInformation()
      .subscribe((mainInfo: MainItem | undefined) => {
        this.mainInfo = mainInfo!;
      });

    if (this.mainInfo) {
      this.setTitle();
    }
  }

  private setTitle(): void {
    this.title.setTitle('Home | ' + this.mainInfo?.section_long_name);
  }
}
