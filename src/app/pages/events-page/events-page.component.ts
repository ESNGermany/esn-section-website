import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  siteTitle: string;
  pretixLink: string;
  facebookLink: string;
  instagramLink: string;

  constructor(private title: Title, private mainService: MainService) {}

  ngOnInit() {
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      this.pretixLink = mainItem.pretixLink;
      this.facebookLink = mainItem.facebookLink;
      this.instagramLink = mainItem.instagramLink;
      const title = 'Events | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }
}
