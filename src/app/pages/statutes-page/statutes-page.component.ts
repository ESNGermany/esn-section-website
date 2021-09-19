import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StatutesService } from 'src/app/services/statutes.service';
import { MainService } from 'src/app/services/main.service';

interface StatutesItem {
  id: string;
  statutesTitle: string;
  Text: string;
}

@Component({
  selector: 'app-statutes-page',
  templateUrl: './statutes-page.component.html',
  styleUrls: ['./statutes-page.component.scss'],
})
export class StatutesPageComponent implements OnInit {
  statutesItemList: StatutesItem;
  contentLoaded: Promise<boolean>;
  siteTitle: string;

  constructor(
    private title: Title,
    private statutesService: StatutesService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.getStatutes();
  }

  getStatutes(): void {
    this.statutesService.fetchStatutes().subscribe((statutesItemList) => {
      this.statutesItemList = statutesItemList;
      this.contentLoaded = Promise.resolve(true);
    });
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      const title = 'Statutes | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }
}
