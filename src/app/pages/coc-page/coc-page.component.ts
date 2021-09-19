import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CocService } from 'src/app/services/coc.service';
import { MainService } from 'src/app/services/main.service';

interface CocItem {
  id: string;
  MarkdownText: string;
}

@Component({
  selector: 'app-coc-page',
  templateUrl: './coc-page.component.html',
  styleUrls: ['./coc-page.component.scss'],
})
export class CocPageComponent implements OnInit {
  public cocItemList: CocItem;
  contentLoaded: Promise<boolean>;
  siteTitle: string;

  constructor(
    private title: Title,
    private cocService: CocService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.getCoc();
  }

  getCoc(): void {
    this.cocService.fetchCoc().subscribe((cocItemList) => {
      this.cocItemList = cocItemList;
      this.contentLoaded = Promise.resolve(true);
    });
    this.mainService.fetchMain().subscribe((mainItem) => {
      this.siteTitle = mainItem.sectionLongName;
      const title = 'Code of Conduct | ' + this.siteTitle;
      this.title.setTitle(title);
    });
  }
}
