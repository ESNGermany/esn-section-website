import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

export class MainItem {
  id: string;
  sectionShortName: string;
  sectionLongName: string;
  facebookLink: string;
  facebookName: string;
  instagramLink: string;
  instagramName: string;
  pretixLink: string;
  addressNameFirstLine: string;
  addressStreetSecondLine: string;
  addressCityThirdLine: string;
  addressEmailFourthLine: string;
  welcomeMessageFrontPage: string;
  titleColor: string;
  buttonColor: string;
  officialLogo: {
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
  title = 'esn-freiburg-website';
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

// export class GlobalConstants {
//   public static sectionShortName: string = 'ESN Fsdfsdfsreiburg e.V.';
//   public static sectionLongName: string =
//     'Eerasmus Netzwerk Fsdfsdfsreiburg e.V.';
//   public static facebookLink: string =
//     'https://facebook.com/esnfrdfgdfgeiburg/';
//   public static facebookName: string = 'myfacebookname';
//   public static instagramLink: string =
//     'https://www.instagradfgdfgm.com/esn_freiburg/';
//   public static instagramName: string = 'myinstaname';
//   public static pretixLink: string =
//     'https://tickets.esn-dfgdfggermany.de/esnfreiburg/';
//   public static addressName: string =
//     'Erasmus Sdfgdftudent Network Freiburg e.V. c/o EUdfg-Büro';
//   public static addressStreet: string = 'Sedddfganstraße 6';
//   public static addressCity: string = '79098 Fredfgdfggiburg';
//   public static addressEmail: string = 'freiburg@esn-dfgdfggermany.de';
//   public static welcomeMessage: string = 'Welcome sdfto ESN Freiburg!';
//   public static titleColor: string = '#7ac143'; // green
//   public static buttonColor: string = '#00aeef"'; // light blue
// }
