import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'esn-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./../base.scss'],
})
export class ErrorPageComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Oopsie... Page not found');
  }
}
