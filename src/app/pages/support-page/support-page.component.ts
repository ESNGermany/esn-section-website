import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ContentItemComponent } from 'src/app/components/content-item/content-item.component';
import { MainItem } from 'src/app/services/main-item';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [ContentItemComponent],
})
export class SupportPageComponent implements OnInit {
  public mainInfo?: MainItem;
  public readonly page: string = 'Support_page';

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
    this.title.setTitle('Get Support | ' + this.mainInfo?.section_long_name);
  }
}
