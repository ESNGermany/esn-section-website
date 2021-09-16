import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StatutesService } from 'src/app/services/statutes.service';

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
  public statutesItemList: StatutesItem;

  constructor(private title: Title, private statutesService: StatutesService) {}

  ngOnInit() {
    this.title.setTitle('Statutes | Erasmus Student Network Freiburg');
    this.getStatutes();
  }

  getStatutes(): void {
    this.statutesService
      .fetchStatutes()
      .subscribe(
        (statutesItemList) => (this.statutesItemList = statutesItemList)
      );
  }
}
