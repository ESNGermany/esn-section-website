import { Component, OnInit } from '@angular/core';
import { MainItem } from 'src/app/app.component';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public globals: MainItem;
  contentLoaded: Promise<boolean>;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.fetchMain().subscribe((global) => {
      this.globals = global[0];
      this.contentLoaded = Promise.resolve(true);
    });
  }

  pink(): void {
    const footer = document.getElementById('foot');
    const footer2 = document.getElementById('foot2');
    const footer3 = document.getElementById('foot3');
    footer.setAttribute('style', 'background-color: #ec008c');
    footer2.setAttribute('style', 'fill: #ec008c');
    footer3.setAttribute('style', 'fill: #ec008c');
  }
}
