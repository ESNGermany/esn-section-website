import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import {
  INationalPartnerItem,
  NationalPartnersService,
} from 'src/app/services/national-partners.service';

@Component({
  selector: 'app-national-partners',
  templateUrl: './national-partners.component.html',
  styleUrls: ['./national-partners.component.scss'],
})
export class NationalPartnersComponent {
  nationalPartners$: Observable<INationalPartnerItem[]> | undefined;

  constructor(private nationalPartnersService: NationalPartnersService) {
    this.setNationalPartners();
    this.toggleMoreButton();
  }

  private setNationalPartners(): void {
    this.nationalPartners$ = this.nationalPartnersService
      .fetchPageNationalPartner()
      .pipe(shareReplay(1));
  }

  private toggleMoreButton(): void {
    this.nationalPartnersService
      .fetchPageNationalPartner()
      .subscribe((listPartners) => {
        for (let p of listPartners) {
          p.buttonText = 'Learn More ↓';
        }
      });
  }

  public toggleInfo(partner: INationalPartnerItem): void {
    partner.show = !partner.show;

    if (!partner.show) {
      partner.buttonText = `Learn more ↓`;
    } else {
      partner.buttonText = `Hide text ↑`;
    }
  }
}
