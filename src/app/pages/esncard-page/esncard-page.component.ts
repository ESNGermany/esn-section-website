import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ContentItemComponent } from 'src/app/components/content-item/content-item.component';
import { NationalPartnersComponent } from 'src/app/components/national-partners/national-partners.component';
import { OlaContentItemComponent } from 'src/app/components/ola-content-item/ola-content-item.component';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from 'src/app/services/main-item';
import { environment } from 'src/environments/environment';

import { PartnerService } from './partner.service';
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
  public cityName?: string;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  private mainInfo?: MainItem;
  public nationalPartners?: NationalPartnerItem[];
  public readonly page: string = 'ESNcard_page';
  public sectionPartners?: PartnerItem[];

  constructor(
    private mainService: MainService,
    private partnerService: PartnerService,
    private title: Title,
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
