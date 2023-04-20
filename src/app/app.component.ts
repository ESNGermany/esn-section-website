import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { IMainItem, MainService } from './services/main.service';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  mainInfo: IMainItem | undefined;

  constructor(
    private mainService: MainService,
    private meta: Meta,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
    this.meta.addTags([
      { name: 'description', content: this.mainInfo!.section_long_name },
    ]);
    this.title.setTitle('Home | ' + this.mainInfo!.section_long_name);
  }
}
