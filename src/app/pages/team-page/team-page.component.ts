import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  public page: string = 'Team_page';

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit(): Promise<void> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Our Team | ' + mainInfo?.sectionLongName);
  }
}
