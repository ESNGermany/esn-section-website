import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import {
  INationalPartnerItem,
  NationalPartnersService,
} from 'src/app/pages/esncard-page/national-partners.service';

@Component({
  selector: 'esn-national-partners',
  templateUrl: './national-partners.component.html',
  styleUrls: ['./national-partners.component.scss'],
})
export class NationalPartnersComponent {
  public nationalPartners$: Observable<INationalPartnerItem[]> | undefined;

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
        for (const p of listPartners) {
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
