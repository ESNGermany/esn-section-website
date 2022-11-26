import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class MembersPageComponent implements OnInit {
  public readonly page: string = 'Members_page';
  mainInfo: IMainItem | undefined;

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    this.title.setTitle('For Members | ' + this.mainInfo!.section_long_name);
  }
}
