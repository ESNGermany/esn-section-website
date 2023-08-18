import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'esn-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [NgClass],
})
export class ArticleComponent {
  @Input() grayBg = false;
  @Input() grayBox = false;
  @Input() title = '';
}
