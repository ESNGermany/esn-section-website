import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { ContentItemComponent } from '../../components/content-item/content-item.component';

@Component({
  selector: 'esn-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [ContentItemComponent],
})
export class MembersPageComponent implements OnInit {
  public readonly page: string = 'Members_page';
  public mainInfo: MainItem | undefined;

  constructor(
    private title: Title,
    private mainService: MainService,
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
    this.title.setTitle('For Members | ' + this.mainInfo?.section_long_name);
  }
}
