import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

export class MainItem {
  id: string = '';
  sectionShortName: string = '';
  sectionLongName: string = '';
  facebookLink: string = '';
  facebookName: string = '';
  instagramLink: string = '';
  instagramName: string = '';
  pretixLink: string = '';
  addressNameFirstLine: string = '';
  addressStreetSecondLine: string = '';
  addressCityThirdLine: string = '';
  addressEmailFourthLine: string = '';
  welcomeMessageFrontPage: string = '';
  buttonColor: string = '';
  officialLogo: {
    url: string;
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  headerImage: {
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  imageGridFrontPage: [
    {
      alternativeText: string;
      formats: {
        medium: {
          url: string;
        };
      };
    }
  ];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ESN';
  public mainItem: MainItem;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.getMain();
  }

  getMain(): void {
    this.mainService
      .fetchMain()
      .subscribe((mainItem) => (this.mainItem = mainItem));
  }
}
