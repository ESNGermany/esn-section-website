import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { ContentItemComponent } from '../../components/content-item/content-item.component';

@Component({
  selector: 'esn-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [ContentItemComponent],
})
export class TeamPageComponent implements OnInit {
  public readonly page: string = 'Team_page';
  public mainInfo?: MainItem;

  constructor(
    private title: Title,
    private mainService: MainService,
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
    this.title.setTitle('Our Team | ' + this.mainInfo?.section_long_name);
  }
}
