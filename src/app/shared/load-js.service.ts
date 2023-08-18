import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LoadJsService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadJsFile(url: string): void {
    const node = this.document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
