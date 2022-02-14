import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
})
export class MembersPageComponent implements OnInit {
  strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;

  page: string = 'Members_page';

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit() {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('For Members | ' + mainInfo?.sectionLongName);
  }
}
