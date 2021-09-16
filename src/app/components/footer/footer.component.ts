import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public sectionLongName: string;
  public addressEmail: string;
  public instagramLink: string;
  public instagramName: string;
  public facebookLink: string;
  public facebookName: string;
  public addressName: string;
  public addressStreet: string;
  public addressCity: string;

  constructor() {}
  ngOnInit(): void {
    // this.sectionLongName = GlobalConstants.sectionLongName;
    // this.addressEmail = GlobalConstants.addressEmail;
    // this.instagramLink = GlobalConstants.instagramLink;
    // this.instagramName = GlobalConstants.instagramName;
    // this.facebookLink = GlobalConstants.facebookLink;
    // this.facebookName = GlobalConstants.facebookName;
    // this.addressName = GlobalConstants.addressName;
    // this.addressStreet = GlobalConstants.addressStreet;
    // this.addressCity = GlobalConstants.addressCity;
    // this.sectionLongName = main
  }
  pink(): void {
    const footer = document.getElementById('foot');
    const footer2 = document.getElementById('foot2');
    const footer3 = document.getElementById('foot3');
    footer.setAttribute('style', 'background-color: #ec008c');
    footer2.setAttribute('style', 'fill: #ec008c');
    footer3.setAttribute('style', 'fill: #ec008c');
  }
}
