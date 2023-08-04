import {
  DOCUMENT,
  isPlatformServer,
  NgIf,
  NgFor,
  NgClass,
} from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IContentItem, ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'esn-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MarkdownModule],
})
export class ContentItemComponent implements OnInit {
  @Input() page!: string;
  public contentInfo: IContentItem[] | undefined;
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;

  constructor(
    private contentService: ContentService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    window.addEventListener('scroll', () => {
      const box0 = this.document.querySelector('.box0');
      if (box0 != null) {
        if (window.scrollY < box0!.clientHeight) {
          box0!.classList.add('fade-in-element');
        } else {
          box0!.classList.remove('fade-in-element');
        }
      }
    });
    window.addEventListener('scroll', () => {
      const box1 = this.document.querySelector('.box1');
      if (box1 != null) {
        if (window.scrollY < box1!.clientHeight) {
          box1!.classList.add('fade-in-element');
        } else {
          box1!.classList.remove('fade-in-element');
        }
      }
    });
  }

  ngOnInit(): void {
    this.contentInfo = this.transferState.get<IContentItem[] | undefined>(
      makeStateKey('contentInfo'),
      undefined,
    );

    if (!this.contentInfo) {
      this.fetchContent();
    }
  }

  async fetchContent(): Promise<void> {
    this.contentInfo = await firstValueFrom(
      this.contentService.fetchPageContent(this.page),
    );

    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IContentItem[]>(
        makeStateKey('contentInfo'),
        this.contentInfo,
      );
    }
  }
}
