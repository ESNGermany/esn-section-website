import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

interface MainItem {
  id: string;
  sectionShortName: string;
  sectionLongName: string;
  facebookLink: string;
  facebookName: string;
  instagramLink: string;
  instagramName: string;
  pretixLink: string;
  addressNameFirstLine: string;
  addressNameSecondLine: string;
  addressNameThirdLine: string;
  addressNameFourthLine: string;
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
  template: '',
})
export class GlobalConstants implements OnInit {
  public mainItem: MainItem;

  public static sectionShortName: string = 'old';
  public static sectionLongName: string =
    'Eerasmus Netzwerk Fsdfsdfsreiburg e.V.';
  public static facebookName: string = 'myfacebookname';
  public static instagramLink: string =
    'https://www.instagradfgdfgm.com/esn_freiburg/';
  public static instagramName: string = 'myinstaname';
  public static pretixLink: string =
    'https://tickets.esn-dfgdfggermany.de/esnfreiburg/';
  public static addressName: string =
    'Erasmus Sdfgdftudent Network Freiburg e.V. c/o EUdfg-Büro';
  public static addressStreet: string = 'Sedddfganstraße 6';
  public static addressCity: string = '79098 Fredfgdfggiburg';
  public static addressEmail: string = 'freiburg@esn-dfgdfggermany.de';
  public static welcomeMessage: string = 'Welcome sdfto ESN Freiburg!';
  public static titleColor: string = '#7ac143'; // green
  public static buttonColor: string = '#00aeef"'; // light blue

  static facebookLink: string = 'old';

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    console.log('here1');
    this.getConstants();
    console.log('here2');
    GlobalConstants.facebookLink = this.mainItem.facebookLink;
    console.log('here3');
  }

  getConstants(): void {
    this.mainService
      .fetchMain()
      // .subscribe((mainItem) => (this.mainItem = mainItem));
      .subscribe(
        (mainItem) => (this.mainItem.facebookLink = mainItem.facebookLink)
      );
  }
}
