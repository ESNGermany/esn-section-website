import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { NationalPartnerItem } from 'src/app/pages/esncard-page/national-partner-item';
import { PartnerService } from 'src/app/pages/esncard-page/partner.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'esn-national-partners',
  templateUrl: './national-partners.component.html',
  styleUrls: ['./national-partners.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MarkdownModule, AsyncPipe],
})
export class NationalPartnersComponent implements OnInit {
  public directusImageLink = env.DIRECTUS_URL_IMAGE;
  public nationalPartners?: NationalPartnerItem[];

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.partnerService.getNationalPartners().subscribe({
      next: (nationalPartners: NationalPartnerItem[]) => {
        this.nationalPartners = nationalPartners;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public toggleInfo(partner: NationalPartnerItem): void {
    partner.show = !partner.show;

    if (!partner.show) {
      partner.buttonText = `More info`;
    } else {
      partner.buttonText = `Less info`;
    }
  }
}
