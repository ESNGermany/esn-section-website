import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import {
  NationalPartnerItem,
  NationalPartnersService,
} from 'src/app/services/national-partners.service';

@Component({
  selector: 'app-national-partners',
  templateUrl: './national-partners.component.html',
  styleUrls: ['./national-partners.component.scss'],
})
export class NationalPartnersComponent implements OnInit {
  nationalPartners$: Observable<NationalPartnerItem[]> | undefined;

  constructor(private nationalPartnersService: NationalPartnersService) {}

  async ngOnInit() {
    this.nationalPartners$ = this.nationalPartnersService
      .fetchPageNationalPartner()
      .pipe(shareReplay(1));

    this.nationalPartnersService
      .fetchPageNationalPartner()
      .subscribe((listPartners) => {
        for (let p of listPartners) {
          p.buttonText = 'Learn More ↓';
        }
      });
  }

  toggleInfo(partner: NationalPartnerItem): void {
    partner.show = !partner.show;

    if (!partner.show) {
      partner.buttonText = `Learn more ↓`;
    } else {
      partner.buttonText = `Hide text ↑`;
    }
  }
}
