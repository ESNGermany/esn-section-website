import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ImprintService } from 'src/app/services/imprint.service';
import { MainService } from 'src/app/services/main.service';

interface ImprintItem {
  id: string;
  Title: string;
  Text: string;
}

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  imprintItemList: ImprintItem;
  contentLoaded: Promise<boolean>;
  siteTitle: string;

  constructor(
    private title: Title,
    private imprintService: ImprintService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.getImprint();
  }

  getImprint(): void {
    this.imprintService.fetchImprint().subscribe((imprintItemList) => {
      this.imprintItemList = imprintItemList[0];
      this.contentLoaded = Promise.resolve(true);
    });
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem[0].sectionLongName;
      const title = 'Imprint | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }
}
