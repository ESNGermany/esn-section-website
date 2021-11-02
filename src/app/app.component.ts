import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private meta: Meta,
    private title: Title
  ) {}

  async ngOnInit() {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.meta.addTags([
      { name: 'description', content: mainInfo?.sectionLongName },
    ]);
    this.title.setTitle('Home | ' + mainInfo?.sectionLongName);
  }
}
