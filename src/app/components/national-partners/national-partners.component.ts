import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import {
  INationalPartnerItem,
  NationalPartnerService,
} from 'src/app/pages/esncard-page/national-partners.service';
import { MarkdownModule } from 'ngx-markdown';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'esn-national-partners',
  templateUrl: './national-partners.component.html',
  styleUrls: ['./national-partners.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MarkdownModule, AsyncPipe],
})
export class NationalPartnersComponent {
  public directusImageLink = env.DIRECTUS_URL_IMAGE;
  public nationalPartners$?: Observable<INationalPartnerItem[]>;

  constructor(private nationalPartnerService: NationalPartnerService) {
    this.setNationalPartners();
  }

  private setNationalPartners(): void {
    this.nationalPartners$ = this.nationalPartnerService
      .fetchPageNationalPartner()
      .pipe(shareReplay(1));
  }

  public toggleInfo(partner: INationalPartnerItem): void {
    partner.show = !partner.show;

    if (!partner.show) {
      partner.buttonText = `More info`;
    } else {
      partner.buttonText = `Less info`;
    }
  }
}
