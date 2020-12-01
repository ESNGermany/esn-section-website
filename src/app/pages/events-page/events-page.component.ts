import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Events | Erasmus Student Network');
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
  }
}
