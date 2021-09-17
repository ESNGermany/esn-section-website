import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ImprintService } from 'src/app/services/imprint.service';

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

  constructor(private title: Title, private imprintService: ImprintService) {}

  ngOnInit() {
    this.title.setTitle('Imprint | Erasmus Student Network Freiburg');
    this.getImprint();
  }

  getImprint(): void {
    this.imprintService.fetchImprint().subscribe((imprintItemList) => {
      this.imprintItemList = imprintItemList;
      this.contentLoaded = Promise.resolve(true);
    });
  }
}
