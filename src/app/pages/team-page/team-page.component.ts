import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { IMainItem, MainService } from 'src/app/services/main.service';
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
  public mainInfo!: IMainItem;

  constructor(
    private title: Title,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.mainService
      .getMainInformation()
      .subscribe((mainInfo: IMainItem | null) => {
        this.mainInfo = mainInfo!;
      });

    if (this.mainInfo) {
      this.setTitle();
    }
  }

  private setTitle(): void {
    this.title.setTitle('Our Team | ' + this.mainInfo?.section_long_name);
  }
}
