import { Component, Input } from '@angular/core';

@Component({
  selector: 'esn-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent {
  @Input() title = '';
  @Input() grayBg = false;
  @Input() grayBox = false;
}
