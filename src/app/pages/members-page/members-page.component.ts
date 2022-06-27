import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
})
export class MembersPageComponent implements OnInit {
  public readonly page: string = 'Members_page';

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit(): Promise<void> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('For Members | ' + mainInfo?.sectionLongName);
  }
}
