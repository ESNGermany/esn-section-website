import { Component } from '@angular/core';

import { ArticleComponent } from 'src/app/components/article/article.component';

@Component({
  selector: 'esn-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./../base.scss'],
  standalone: true,
  imports: [ArticleComponent],
})
export class ErrorPageComponent {}
