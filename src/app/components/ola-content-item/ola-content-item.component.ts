import { Component } from '@angular/core';

import { ArticleComponent } from 'src/app/components/article/article.component';

@Component({
  selector: 'esn-ola-content-item',
  templateUrl: './ola-content-item.component.html',
  styleUrls: ['./ola-content-item.component.scss'],
  standalone: true,
  imports: [ArticleComponent],
})
export class OlaContentItemComponent {}
