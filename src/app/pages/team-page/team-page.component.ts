import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  page: string = 'Team_page';

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit() {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Our Team | ' + mainInfo?.sectionLongName);
  }
}
