import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { PartnerService } from './partner.service';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { OlaContentItemComponent } from 'src/app/components/ola-content-item/ola-content-item.component';
import { NationalPartnersComponent } from 'src/app/components/national-partners/national-partners.component';
import { ContentItemComponent } from 'src/app/components/content-item/content-item.component';
import { PartnerItem } from './partner-item';
import { NationalPartnerItem } from './national-partner-item';

@Component({
  selector: 'esn-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [
    ContentItemComponent,
    NgIf,
    NgFor,
    NgClass,
    NationalPartnersComponent,
    OlaContentItemComponent,
  ],
})
export class EsncardPageComponent implements OnInit {
  public readonly page: string = 'ESNcard_page';
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public sectionPartners?: PartnerItem[];
  public nationalPartners?: NationalPartnerItem[];
  public cityName?: string;
  private mainInfo?: MainItem;

  constructor(
    private title: Title,
    private partnerService: PartnerService,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
    }

    this.partnerService.getSectionPartners().subscribe({
      next: (sectionPartners: PartnerItem[]) => {
        this.sectionPartners = sectionPartners;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.partnerService.getNationalPartners().subscribe({
      next: (nationalPartners: NationalPartnerItem[]) => {
        this.nationalPartners = nationalPartners;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public toggleInfo(partner: PartnerItem): void {
    partner.show = !partner.show;
    if (!partner.show) {
      partner.buttonText = `More info`;
    } else {
      partner.buttonText = `Less info`;
    }
  }

  private setTitle(): void {
    this.title.setTitle(
      'ESNcard & Partners | ' + this.mainInfo?.section_long_name,
    );
  }
}
