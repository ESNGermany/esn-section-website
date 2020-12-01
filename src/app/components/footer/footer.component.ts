import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  pink(): void {
    const footer = document.getElementById('foot');
    const footer2 = document.getElementById('foot2');
    const footer3 = document.getElementById('foot3');
    footer.setAttribute('style', 'background-color: #ec008c');
    footer2.setAttribute('style', 'fill: #ec008c');
    footer3.setAttribute('style', 'fill: #ec008c');
  }
  unpink(): void {
    const footer = document.getElementById('foot');
    const footer2 = document.getElementById('foot2');
    const footer3 = document.getElementById('foot3');
    footer.setAttribute('style', 'background-color: #3a3a3a');
    footer2.setAttribute('style', 'fill: #3a3a3a');
    footer3.setAttribute('style', 'fill: #3a3a3a');
  }
}
