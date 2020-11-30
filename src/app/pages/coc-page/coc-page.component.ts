import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CocService } from 'src/app/services/coc.service';

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

  constructor(private title: Title, private cocService: CocService) {}

  ngOnInit() {
    this.title.setTitle('Code of Conduct | Erasmus Student Network Freiburg');
    this.getCoc();
  }

  getCoc(): void {
    this.cocService
      .fetchCoc()
      .subscribe((cocItemList) => (this.cocItemList = cocItemList));
  }
}
