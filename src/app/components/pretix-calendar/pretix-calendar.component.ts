import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pretix-calendar',
  templateUrl: './pretix-calendar.component.html',
  styleUrls: ['./pretix-calendar.component.scss'],
})
export class PretixCalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadJsFile('https://pretix.eu/demo/democon/widget/v1.css');
  }
  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
